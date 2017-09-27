import React from 'react';
import PropTypes from 'prop-types';

import FoodSelection from '../components/FoodSelection';
import Entries from '../components/Entries';
import DailyGoal from '../components/DailyGoal';
import Loading from '../components/Loading';

import {checkStatus, readJson, get, post, patch, remove} from '../util/fetch';
import {getCurrentDate} from '../util/date-functions';
import {
    updateValuesOnAddition,
    updateValuesOnRemove,
    updateValuesOnMealRemove
} from '../util/optimistic-updates';

var searchTimeout = null;

export default class CurrentEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            foods: [],
            goal: null,
            total: null,
            activeMeal: null,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingDailyGoal: true,
            isFetchingEntries: true,
            isFetchingMatchingFoods: true,
            searchTerm: this.props.searchTerm,
            fetchMethod: this.props.fetchMethod,
            fetchError: null,
            entriesFetchError: null,
            viewportWidth: this.props.viewportWidth,
            foodSelectionVisible: this.props.viewportWidth > 768 ? true : false,
            shownNutritionValue: 'energy'
        };
    }

    componentWillMount() {
        if(this.props.fetchMethod == 'search') {
            this.getMatchingFoods(this.props.searchTerm);
        } else if(this.props.fetchMethod == 'favorites') {
            this.getFavoriteFoods();
        } else {
            this.getLatestEntries()
        }

        this.getEntries();
    }

    componentDidMount() {
        var resizeTimeout = null;
        window.addEventListener('resize', (e) => {
            if(!resizeTimeout) clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                var viewportWidth = Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth || 0
                );

                // trigger state change only on viewport width change
                if(viewportWidth !== this.state.viewportWidth) {
                    this.setState({
                        viewportWidth,
                        foodSelectionVisible: viewportWidth > 768 ? true : false
                    });
                }
            }, 200);
        });
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.fetchMethod == 'search') {
            this.getMatchingFoods(nextProps.searchTerm);
        } else if(nextProps.fetchMethod == 'favorites') {
            this.getFavoriteFoods();
        } else {
            this.getLatestEntries()
        }
    }

    getDailyGoal = () => {
        get(`/daily-goal/${getCurrentDate()}`)
            .then(checkStatus)
            .then(readJson)
            .then((goal) => this.setState({goal, isFetchingDailyGoal: false}))
            .catch(() => {
                this.setState({
                    isFetchingDailyGoal: false,
                    dailyGoalFetchError: 'Päivätavoitetta ei onnistuttu hakemaan.'
                });
            });
    }

    setDailyGoal = (goal) => {
        this.setState({goal});
    }

    getEntries = () => {
        this.setState({
            selectedFoodId: null,
            selectFood: null,
            selectedFoodAmount: null,
            isFetchingEntries: true
        });

        get('/today')
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                var amountOfEntries = Object.keys(data.entries).length;
                var latestMeal = data.entries[amountOfEntries - 1];

                if(amountOfEntries > 0) {
                    var activeMeal = {id: latestMeal.id, name: latestMeal.name};
                } else {
                    this.addMeal();
                }

                this.setState({
                    entries: data.entries,
                    total: data.total,
                    activeMeal: activeMeal || null,
                    isFetchingEntries: false
                });

                this.getDailyGoal();
            })
            .catch((err) => {
                this.setState({
                    isFetchingEntries: false,
                    entriesFetchError: 'Merkintöjä ei onnistuttu hakemaan.'
                });
            });
    }

    getMatchingFoods = (searchTerm) => {
        searchTerm = searchTerm.trim();
        if(!searchTerm) {
            return this.setState({foods: [], isFetchingMatchingFoods: false});
        }
        this.fetchFoods(`/matching-foods/${searchTerm}`);
    }

    getFavoriteFoods = () => {
        this.fetchFoods('/favorites');
    }

    getLatestEntries = () => {
        this.fetchFoods('/latest');
    }

    fetchFoods = (url) => {
        this.setState({
            foods: [],
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingMatchingFoods: true,
            showResultsOffset: 0
        });

        get(url)
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                this.setState({
                    foods: data,
                    isFetchingMatchingFoods: false,
                    fetchError: null
                });
            })
            .catch((err) => {
                this.setState({
                    fetchError: `Haussa tapahtui virhe (${err})`,
                    isFetchingMatchingFoods: false,
                });
            });
    }

    changeFetchMethod = (fetchMethod) => {
        this.setState({fetchMethod});
        if(fetchMethod == 'search') {
            this.context.router.history.push(`?sort=search&q=${this.state.searchTerm}`);
        } else if(fetchMethod == 'favorites') {
            this.context.router.history.push('?sort=favorites');
        } else {
            this.context.router.history.push('?sort=latest');
        }
    }

    changeSearchTerm = (event) => {
        var searchTerm = event.currentTarget.value;
        this.setState({searchTerm, isFetchingMatchingFoods: true});

        // cancel search if user is typing
        if(searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // do search after 500ms delay
        searchTimeout = setTimeout(() => this.doSearch(searchTerm), 500);
    }

    doSearch = (searchTerm) => {
        if(searchTerm.trim()) {
            this.context.router.history.push(`?sort=search&q=${searchTerm}`);
        } else {
            this.context.router.history.push('?sort=search&q=');
        }
    }

    showMoreResults = () => {
        this.setState({shownResultsOffset: this.state.shownResultsOffset + 10});
    }

    selectFood = (foodId) => {
        if(this.state.selectedFoodId == foodId) {
            this.setState({
                selectedFoodId: null,
                selectedFood: null,
                selectedFoodAmount: null
            });
        } else {
            this.setState({
                selectedFoodId: foodId,
                selectedFood: this.state.foods.filter((food) => food.id == foodId)[0],
                selectedFoodAmount: null
            }, () => {
                var foodList = document.querySelector('.food-list');
                var selectedItem = document.getElementById(foodId);
                var scrollTo = selectedItem.offsetTop - foodList.offsetTop;

                var currentScrollPos = foodList.scrollTop;
                var scrollAnimationInterval = setInterval(function () {
                    if(currentScrollPos < scrollTo) {
                        foodList.scrollTop = currentScrollPos;
                        currentScrollPos += 2;
                    } else {
                        clearInterval(scrollAnimationInterval);
                    }
                }, 1);

            });
        }
    }

    setSelectedFoodAmount = (e) => {
        var value = e.currentTarget.value;

        if(value.length < 5 && !isNaN(value)) {
            this.setState({selectedFoodAmount: value});
        }
    }

    addEntry = (foodToAdd, newAmount = event.target.value) => {
        event.preventDefault();
        // update consumed foods and total values optimistically on addition
        var updatedValues = updateValuesOnAddition(
            foodToAdd,
            newAmount,
            this.state.activeMeal.id,
            JSON.parse(JSON.stringify(this.state.entries)),
            JSON.parse(JSON.stringify(this.state.total))
        );

        this.setState({
            entries: updatedValues.entries,
            total: updatedValues.total,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null
        });

        var entryContent = {
            mealId: this.state.activeMeal.id,
            consumptionId: updatedValues.consumptionId,
            foodId: foodToAdd.id,
            foodAmount: newAmount
        };

        post('/today/add-entry', entryContent);
            //.catch((err) => console.error(err));
    }

    removeEntry = (foodToRemove) => {
        // update consumed foods and total values optimistically on removal
        var updatedValues = updateValuesOnRemove(
            foodToRemove,
            JSON.parse(JSON.stringify(this.state.entries)),
            JSON.parse(JSON.stringify(this.state.total))
        );

        this.setState({
            entries: updatedValues.entries,
            total: updatedValues.total
        });

        patch(`/today/remove-entry?consumptionId=${foodToRemove.consumptionId}`);
            //.catch((err) => console.error(err));
    }

    updateEntry = (consumptionId, newAmount) => {
        patch('/today/update-entry', {consumptionId, foodAmount: newAmount})
            .then(checkStatus)
            .then(() => this.getEntries());
            //.catch((err) => console.error(err));
    }

    addMeal = () => {
        var tempEntries = JSON.parse(JSON.stringify(this.state.entries));
        var nextMealName = `Ateria #${Object.keys(this.state.entries).length + 1}`;

        post('/today/add-meal', {mealName: nextMealName})
            .then(checkStatus)
            .then(readJson)
            .then((createdMeal) => {
                tempEntries.push({id: createdMeal.id, name: createdMeal.name, foods: []});
                this.setState({activeMeal: createdMeal, entries: tempEntries});
            });
            //.catch((err) => console.log(err));
    }

    editMealName = (mealNumber, oldName, newName) => {
        if(newName.trim().length === 0) return;

        var tempEntries = JSON.parse(JSON.stringify(this.state.entries));
        tempEntries[mealNumber].name = newName;

        this.setState({
            activeMeal: oldName == this.state.activeMeal ? newName : this.state.activeMeal,
            entries: tempEntries,
        });

        patch('/today/update-meal', {
            mealId: tempEntries[mealNumber].id,
            mealName: newName
        })
            //.catch((err) => console.log(err));
    }

    removeMeal = (id, name, mealNumber) => {
        if(confirm(`Haluatko varmasti poistaa tämän aterian (${name})?`)) {
            var updatedValues = updateValuesOnMealRemove(
                mealNumber,
                JSON.parse(JSON.stringify(this.state.entries)),
                JSON.parse(JSON.stringify(this.state.total))
            );
            var tempEntries = updatedValues.entries;

            this.setState({entries: tempEntries, total: updatedValues.total}, () => {
                // if removed meal is active, move active status to latest meal if one exists
                if(this.state.activeMeal.id === id && tempEntries.length > 0) {
                    id = tempEntries[tempEntries.length - 1].id;
                    name = tempEntries[tempEntries.length - 1].name;
                    this.changeActiveMeal(id, name);
                // if no meals are left after removal, create new one and move active status to that
                } else if(this.state.activeMeal.id === id && tempEntries.length === 0) {
                    this.addMeal();
                }
            });

            patch(`/today/remove-meal?mealId=${id}`);
        }
    }

    changeActiveMeal = (nextId, nextName) => {
        var entries = this.state.entries;
        var latestMealId = entries[entries.length - 1].id;

        // if already active meal is toggled, change active status to the newest meal
        if(nextId == this.state.activeMeal.id) {
            if(nextId == latestMealId) return;
            nextId = latestMealId;
        }

        this.setState({activeMeal: {id: nextId, name: nextName}});
    }

    addToFavorites = (foodId) => {
        this.toggleFavoriteIcon(foodId, true);

        post(`/favorites/${foodId}`);
            //.catch((err) => console.error(err));
    }

    removeFromFavorites = (foodId) => {
        this.toggleFavoriteIcon(foodId, false);

        remove(`/favorites/${foodId}`);
            //.catch((err) => console.error(err));
    }

    toggleFavoriteIcon = (foodId, isInFavorites) => {
        var tempFoods = JSON.parse(JSON.stringify(this.state.foods));
        for(var i = 0; i < tempFoods.length; i++) {
            if(tempFoods[i].id === foodId) {
                tempFoods[i]['isInFavorites'] = isInFavorites;
            }
        }

        this.setState({foods: tempFoods});
    }

    toggleFoodSelection = () => {
        this.setState({foodSelectionVisible: !this.state.foodSelectionVisible}, () => {
            // hide overflow-y when foodselection is visible
            var body = document.querySelector('body');
            body.style.overflowY = this.state.foodSelectionVisible ? 'hidden' : 'scroll';
        });
    }

    changeShownNutritionValue = (e) => {
        this.setState({shownNutritionValue: e.currentTarget.value});
    }

    render() {
        var {isFetchingEntries, isFetchingDailyGoal} = this.state;

        return (
            <div className='current-entry'>
                <div className='row'>
                    {!isFetchingEntries && !isFetchingDailyGoal ? (
                        <DailyGoal
                            goal={this.state.goal}
                            total={this.state.total}
                            isFetchingDailyGoal={isFetchingDailyGoal}
                            dailyGoalFetchError={this.state.dailyGoalFetchError}
                            setDailyGoal={this.setDailyGoal}
                        />
                    ) : (
                        <div className='col-md-2'>
                            <Loading />
                        </div>
                    )}
                    <FoodSelection
                        foods={this.state.foods}
                        fetchMethod={this.state.fetchMethod}
                        fetchError={this.state.fetchError}
                        toggleFoodSelection={this.toggleFoodSelection}
                        foodSelectionVisible={this.state.foodSelectionVisible}
                        fetchMethod={this.state.fetchMethod}
                        changeFetchMethod={this.changeFetchMethod}
                        viewportWidth={this.state.viewportWidth}
                        searchTerm={this.state.searchTerm}
                        changeSearchTerm={this.changeSearchTerm}
                        doSearch={this.doSearch}
                        selectedFoodId={this.state.selectedFoodId}
                        selectedFoodAmount={this.state.selectedFoodAmount}
                        setSelectedFoodAmount={this.setSelectedFoodAmount}
                        isFetchingMatchingFoods={this.state.isFetchingMatchingFoods}
                        selectFood={this.selectFood}
                        addEntry={this.addEntry}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
                    />
                </div>
                <Entries
                    entries={this.state.entries}
                    entriesFetchError={this.state.entriesFetchError}
                    isFetchingEntries={this.state.isFetchingEntries}
                    total={this.state.total}
                    activeMeal={this.state.activeMeal}
                    addMeal={this.addMeal}
                    removeMeal={this.removeMeal}
                    changeActiveMeal={this.changeActiveMeal}
                    editMealName={this.editMealName}
                    shownNutritionValue={this.state.shownNutritionValue}
                    changeShownNutritionValue={this.changeShownNutritionValue}
                    addEntry={this.addEntry}
                    removeEntry={this.removeEntry}
                    updateEntry={this.updateEntry}
                    isModifiable={true}
                    viewportWidth={this.state.viewportWidth}
                />
                {this.state.viewportWidth <= 768 && !this.state.foodSelectionVisible &&
                    <button className='btn sticky-action-btn' onClick={this.toggleFoodSelection}>
                    +
                    </button>
                }
            </div>
        );
    }
}

CurrentEntry.contextTypes = {router: PropTypes.object.isRequired};
