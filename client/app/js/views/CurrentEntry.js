import React from 'react';
import PropTypes from 'prop-types';

import FoodSelection from '../components/FoodSelection';
import ConsumedFoods from '../components/ConsumedFoods';
import DailyGoal from '../components/DailyGoal';
import Loading from '../components/Loading';

import {get, post, patch, remove} from '../util/fetch';
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
        this.addToDiary = this.addToDiary.bind(this);
        this.copyEntry = this.copyEntry.bind(this);
        this.removeFromDiary = this.removeFromDiary.bind(this);
        this.updateDiaryEntry = this.updateDiaryEntry.bind(this);
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
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    dailyGoal: data,
                    isFetchingDailyGoal: false
                });
                this.getConsumedFoods();
            }).catch((err) => {
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
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    consumedFoods: data.nutritionValuesPerItem,
                    totalConsumption: data.nutritionValuesInTotal,
                    isFetchingConsumedFoods: false
                });
            }).catch((err) => {
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
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    foods: data,
                    isFetchingMatchingFoods: false,
                    fetchError: null
                });
            }).catch((err) => {
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
        this.setState({selectedFoodAmount: event.currentTarget.value});
    }

    addToDiary(foodId, foodAmount) {
        // update consumed foods and total values optimistically on addition
        var updatedValues = updateValuesOnAddition(
            foodId,
            foodAmount,
            JSON.parse(JSON.stringify(this.state.foods)),
            JSON.parse(JSON.stringify(this.state.consumedFoods)),
            JSON.parse(JSON.stringify(this.state.totalConsumption))
        );
        var consumedFoods = updatedValues.consumedFoods;
        var totalConsumption = updatedValues.totalConsumption;
        var content = {
            consumptionId: consumedFoods[consumedFoods.length - 1].consumptionId,
            foodId,
            foodAmount
        };

        post('/active-entry', content)
            .catch((err) => console.error(err));

        this.setState({
            consumedFoods,
            totalConsumption,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null
        });
    }

    copyEntry(entry) {
        var date = new Date();
        var tempEntry = JSON.parse(JSON.stringify(entry));
        var tempConsumedFoods = JSON.parse(JSON.stringify(this.state.consumedFoods));

        tempEntry.consumptionId = date.getTime().toString();
        tempEntry.timeOfConsumption = date;
        tempConsumedFoods.push(tempEntry);
        this.setState({consumedFoods: tempConsumedFoods});

        post('/active-entry', {
            consumptionId: tempEntry.consumptionId,
            foodId: tempEntry.id,
            foodAmount: tempEntry.amount
        }).catch((err) => console.error(err));
    }

    removeFromDiary(consumptionId) {
        // update consumed foods and total values optimistically on removal
        var updatedValues = updateValuesOnRemove(
            consumptionId,
            JSON.parse(JSON.stringify(this.state.consumedFoods)),
            JSON.parse(JSON.stringify(this.state.totalConsumption))
        );

        remove(`/active-entry?consumptionId=${consumptionId}`)
            .catch((err) => console.error(err));

        this.setState({
            consumedFoods: updatedValues.consumedFoods,
            totalConsumption: updatedValues.totalConsumption
        });
    }

    updateDiaryEntry(consumptionId, foodAmount) {
        patch('/active-entry', {consumptionId, foodAmount})
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
                        viewportWidth={this.props.viewportWidth}
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
                        addToDiary={this.addToDiary}
                        addToFavorites={this.addToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
                        fetchMethod={this.state.fetchMethod}
                        fetchError={this.state.fetchError}
                    />
                </div>
                <ConsumedFoods
                    viewportWidth={this.props.viewportWidth}
                    isModifiable={true}
                    consumedFoods={this.state.consumedFoods}
                    totalConsumption={this.state.totalConsumption}
                    copyEntry={this.copyEntry}
                    removeFromDiary={this.removeFromDiary}
                    updateDiaryEntry={this.updateDiaryEntry}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
            </div>
        );
    }
}

CurrentEntry.contextTypes = {router: PropTypes.object.isRequired};
