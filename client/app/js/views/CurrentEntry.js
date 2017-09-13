import React from 'react';
import PropTypes from 'prop-types';

import FoodSelection from '../components/FoodSelection';
import ConsumedFoods from '../components/ConsumedFoods';
import DailyGoal from '../components/DailyGoal';
import Loading from '../components/Loading';

import {checkStatus, readJson, get, post, patch, remove} from '../util/fetch';
import updateValuesOnAddition from '../util/update-values-on-addition';
import updateValuesOnRemove from '../util/update-values-on-remove';
import getCurrentDate from '../util/get-current-date';

var searchTimeout = null;

export default class CurrentEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyGoal: null,
            consumedFoods: [],
            activeMeal: 'Ateria #1',
            foods: [],
            shownResultsOffset: 0,
            totalConsumption: null,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingDailyGoal: true,
            isFetchingConsumedFoods: true,
            isFetchingMatchingFoods: true,
            searchTerm: this.props.searchTerm,
            fetchMethod: this.props.fetchMethod,
            fetchError: null,
            viewportWidth: this.props.viewportWidth
        };

        this.getDailyGoal = this.getDailyGoal.bind(this);
        this.getConsumedFoods = this.getConsumedFoods.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.getFavoriteFoods = this.getFavoriteFoods.bind(this);
        this.getLatestConsumedFoods = this.getLatestConsumedFoods.bind(this);
        this.fetchFoods = this.fetchFoods.bind(this);
        this.changeFetchMethod = this.changeFetchMethod.bind(this);
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.showMoreResults = this.showMoreResults.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.setSelectedFoodAmount = this.setSelectedFoodAmount.bind(this);
        this.addEntry = this.addEntry.bind(this);
        this.copyEntry = this.copyEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.updateEntry = this.updateEntry.bind(this);
        this.addMeal = this.addMeal.bind(this);
        this.editMealName = this.editMealName.bind(this);
        this.changeActiveMeal = this.changeActiveMeal.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.toggleFavoriteIcon = this.toggleFavoriteIcon.bind(this);
    }

    componentWillMount() {
        if(this.props.fetchMethod == 'search') {
            this.getMatchingFoods(this.props.searchTerm);
        } else if(this.props.fetchMethod == 'favorites') {
            this.getFavoriteFoods();
        } else {
            this.getLatestConsumedFoods()
        }
        this.getDailyGoal();
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
                this.setState({viewportWidth});
            }, 200);
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.fetchMethod == 'search') {
            this.getMatchingFoods(nextProps.searchTerm);
        } else if(nextProps.fetchMethod == 'favorites') {
            this.getFavoriteFoods();
        } else {
            this.getLatestConsumedFoods()
        }
    }

    getDailyGoal() {
        get(`/daily-goal/${getCurrentDate()}`)
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                this.setState({dailyGoal: data, isFetchingDailyGoal: false});
                this.getConsumedFoods();
            })
            .catch((err) => {
                console.error(err);
                this.setState({isFetchingDailyGoal: false});
            });
    }

    getConsumedFoods() {
        this.setState({
            selectedFoodId: null,
            selectFood: null,
            selectedFoodAmount: null,
            isFetchingConsumedFoods: true
        });

        get('/active-entry')
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                var meals = Object.keys(data.meals);
                var latestMeal = data.meals[meals.length - 1];
                var activeMeal = null;

                if(meals.length > 0) {
                    activeMeal = {
                        mealId: latestMeal.mealId,
                        mealName: latestMeal.mealName
                    };
                } else {
                    this.addMeal();
                }

                this.setState({
                    consumedFoods: data.meals,
                    totalConsumption: data.nutritionValuesInTotal,
                    activeMeal: activeMeal,
                    isFetchingConsumedFoods: false
                });
            })
            .catch((err) => {
                this.setState({isFetchingConsumedFoods: false});
                console.error(err);
            });
    }

    getMatchingFoods(searchTerm) {
        searchTerm = searchTerm.trim();
        if(!searchTerm) {
            return this.setState({foods: [], isFetchingMatchingFoods: false});
        }
        this.fetchFoods(`/matching-foods/${searchTerm}`);
    }

    getFavoriteFoods() {
        this.fetchFoods('/favorites');
    }

    getLatestConsumedFoods() {
        this.fetchFoods('/latest');
    }

    fetchFoods(url) {
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

    changeFetchMethod(fetchMethod) {
        this.setState({fetchMethod});
        if(fetchMethod == 'search') {
            this.context.router.history.push(`?sort=search&q=${this.state.searchTerm}`);
        } else if(fetchMethod == 'favorites') {
            this.context.router.history.push('?sort=favorites');
        } else {
            this.context.router.history.push('?sort=latest');
        }
    }

    changeSearchTerm(event) {
        var searchTerm = event.currentTarget.value;
        this.setState({searchTerm, isFetchingMatchingFoods: true});

        // cancel search if user is typing
        if(searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // do search after 500ms delay
        searchTimeout = setTimeout(() => this.doSearch(searchTerm), 500);
    }

    doSearch(searchTerm) {
        /*event.preventDefault();
        if(this.state.searchTerm.trim()) {
            this.context.router.history.push(`?q=${this.state.searchTerm}`);
        }*/
        if(searchTerm.trim()) {
            this.context.router.history.push(`?sort=search&q=${searchTerm}`);
        } else {
            this.context.router.history.push('?sort=search&q=');
        }
    }

    showMoreResults() {
        this.setState({shownResultsOffset: this.state.shownResultsOffset + 10});
    }

    selectFood(foodId) {
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
            });
        }
    }

    setSelectedFoodAmount(event) {
        var value = event.currentTarget.value;

        if(value.length < 5 && !isNaN(value)) {
            this.setState({selectedFoodAmount: event.currentTarget.value});
        }
    }

    addEntry(foodId, foodAmount) {
        // update consumed foods and total values optimistically on addition
        /*var updatedValues = updateValuesOnAddition(
            foodId,
            foodAmount,
            this.state.activeMeal,
            JSON.parse(JSON.stringify(this.state.foods)),
            JSON.parse(JSON.stringify(this.state.consumedFoods)),
            JSON.parse(JSON.stringify(this.state.totalConsumption))
        );
        var consumedFoods = updatedValues.consumedFoods;
        var totalConsumption = updatedValues.totalConsumption;*/


            /*for(var i = 0; i < this.state.consumedFoods; i++) {
                if(this.state.consumedFoods[i].mealName == this.state.activeMeal) {
                    activeMealId = this.state.consumedFoods[i].mealId;
                }
            }*/

            var entryDetails = {
                foodId,
                foodAmount,
                mealId: this.state.activeMeal.mealId
            };

            post('/active-entry/add-entry', entryDetails)
                .catch((err) => console.error(err));


        /*this.setState({
            consumedFoods,
            totalConsumption,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null
        });*/
    }

    copyEntry(foodId, foodAmount) {
        var entryContent = {
            mealId: this.state.activeMeal.mealId,
            foodId,
            foodAmount
        };

        post('/active-entry/add-entry', entryContent)
            .then(checkStatus)
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
    }

    removeEntry(consumptionId) {
        // update consumed foods and total values optimistically on removal
        /*var updatedValues = updateValuesOnRemove(
            consumptionId,
            JSON.parse(JSON.stringify(this.state.consumedFoods)),
            JSON.parse(JSON.stringify(this.state.totalConsumption))
        );*/

        remove(`/active-entry?consumptionId=${consumptionId}`)
            .catch((err) => console.error(err));

        /*this.setState({
            consumedFoods: updatedValues.consumedFoods,
            totalConsumption: updatedValues.totalConsumption
        });*/
    }

    updateEntry(consumptionId, foodAmount) {
        patch('/active-entry/update-entry', {consumptionId, foodAmount})
            .then(checkStatus)
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
    }

    addToFavorites(foodId) {
        this.toggleFavoriteIcon(foodId, true);

        post(`/favorites/${foodId}`)
            .catch((err) => console.error(err));
    }

    removeFromFavorites(foodId) {
        this.toggleFavoriteIcon(foodId, false);

        remove(`/favorites/${foodId}`)
            .catch((err) => console.error(err));
    }

    toggleFavoriteIcon(foodId, favorite) {
        var foods = JSON.parse(JSON.stringify(this.state.foods));
        var food = foods.forEach((food, i) => {
            if(food.id == foodId) {
                foods[i]['favorite'] = favorite;
            }
        });
        this.setState({foods});
    }

    addMeal() {
        var tempConsumedFoods = JSON.parse(JSON.stringify(this.state.consumedFoods));
        var nextMealName = `Ateria #${Object.keys(this.state.consumedFoods).length + 1}`;

        post('/active-entry/add-meal', {mealName: nextMealName})
            .then(checkStatus)
            .then(readJson)
            .then((createdMeal) => {
                tempConsumedFoods.push({
                    mealId: createdMeal.mealId,
                    mealName: createdMeal.mealName,
                    mealCourses: []
                });

                this.setState({
                    activeMeal: createdMeal,
                    consumedFoods: tempConsumedFoods
                });
            })
            .catch((err) => console.log(err));
    }

    editMealName(arrayIndex, oldName, newName) {
        if(newName.trim().length === 0) return;

        var tempConsumedFoods = JSON.parse(JSON.stringify(this.state.consumedFoods));
        tempConsumedFoods[arrayIndex].mealName = newName;

        this.setState({
            activeMeal: oldName == this.state.activeMeal ? newName : this.state.activeMeal,
            consumedFoods: tempConsumedFoods,
        });

        patch('/active-entry/update-meal', {
            mealId: tempConsumedFoods[arrayIndex].mealId,
            mealName: newName
        })
            .catch((err) => console.log(err));
    }

    changeActiveMeal(nextActiveMealId, nextActiveMealName) {
        var consumedFoods = this.state.consumedFoods;
        var latestMealId = consumedFoods[consumedFoods.length - 1].mealId;

        // if already active meal is toggled, change active status to the newest meal
        if(nextActiveMealId == this.state.activeMeal.mealId) {
            if(nextActiveMealId == latestMealId) return;
            nextActiveMealId = latestMealId;
        }

        this.setState({
            activeMeal: {
                mealId: nextActiveMealId,
                mealName: nextActiveMealName
            }
        });
    }


    render() {
        var {isFetchingConsumedFoods, isFetchingDailyGoal} = this.state;

        return (
            <div className='current-entry'>
                <div className='row'>
                    {!isFetchingConsumedFoods && !isFetchingDailyGoal ? (
                        <DailyGoal
                            dailyGoal={this.state.dailyGoal}
                            totalConsumption={this.state.totalConsumption}
                            isFetchingDailyGoal={isFetchingDailyGoal}
                            isFetchingConsumedFoods={isFetchingConsumedFoods}
                        />
                    ) : (
                        <div className='col-md-2'>
                            <Loading />
                        </div>
                    )}
                    <FoodSelection
                        fetchMethod={this.state.fetchMethod}
                        changeFetchMethod={this.changeFetchMethod}
                        viewportWidth={this.state.viewportWidth}
                        searchTerm={this.state.searchTerm}
                        changeSearchTerm={this.changeSearchTerm}
                        doSearch={this.doSearch}
                        foods={this.state.foods}
                        offset={this.state.shownResultsOffset}
                        showMoreResults={this.showMoreResults}
                        selectedFoodId={this.state.selectedFoodId}
                        selectedFoodAmount={this.state.selectedFoodAmount}
                        setSelectedFoodAmount={this.setSelectedFoodAmount}
                        isFetchingMatchingFoods={this.state.isFetchingMatchingFoods}
                        selectFood={this.selectFood}
                        addEntry={this.addEntry}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
                        fetchMethod={this.state.fetchMethod}
                        fetchError={this.state.fetchError}
                    />
                </div>
                <ConsumedFoods
                    viewportWidth={this.state.viewportWidth}
                    isModifiable={true}
                    consumedFoods={this.state.consumedFoods}
                    activeMeal={this.state.activeMeal}
                    addMeal={this.addMeal}
                    changeActiveMeal={this.changeActiveMeal}
                    editMealName={this.editMealName}
                    totalConsumption={this.state.totalConsumption}
                    copyEntry={this.copyEntry}
                    removeEntry={this.removeEntry}
                    updateEntry={this.updateEntry}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
            </div>
        );
    }
}

CurrentEntry.contextTypes = {router: PropTypes.object.isRequired};
