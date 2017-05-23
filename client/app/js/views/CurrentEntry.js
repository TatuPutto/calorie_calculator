import React from 'react';
import PropTypes from 'prop-types';

import FoodSelection from '../components/FoodSelection';
import ConsumedFoods from '../components/ConsumedFoods';
import TotalConsumption from '../components/TotalConsumption';
import SearchTypes from '../components/SearchTypes';
import DailyGoal from '../components/DailyGoal';

import updateValuesOnAddition from '../util/update-values-on-addition';
import updateValuesOnRemove from '../util/update-values-on-remove';
import pad from '../util/pad';

var fetchParams = {
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export default class CurrentEntry extends React.Component {
    constructor(props) {
        super();
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
            searchTerm: null,
            fetchMethod: 'haku',
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
        this.removeFromDiary = this.removeFromDiary.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.toggleFavoriteIcon = this.toggleFavoriteIcon.bind(this);
    }

    componentWillMount() {
        this.setState({fetchMethod: this.props.fetchMethod});
        if(this.props.fetchMethod == 'haku') {
            this.getMatchingFoods(this.props.search);
        } else if(this.props.fetchMethod == 'suosikit') {
            this.getFavoriteFoods();
        } else {
            this.getLatestConsumedFoods()
        }
        this.getConsumedFoods();
        this.getDailyGoal();
    }

    // get matching foods when new query params are pushed
    componentWillReceiveProps(nextProps) {
        if(nextProps.fetchMethod == 'haku') {
            this.getMatchingFoods(nextProps.search);
        }
    }

    getDailyGoal() {
        var d = new Date();
        var day = pad(d.getDate());
        var month = pad(d.getMonth() + 1);
        var year = pad(d.getFullYear());
        var date = `${day}.${month}.${year}`;

        fetch(`/daily-goal/${date}`, fetchParams)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    dailyGoal: data,
                    isFetchingDailyGoal: false
                });
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

        fetch('/daily-intake', fetchParams)
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
        if(!searchTerm) return;
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

        fetch(url, fetchParams)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    foods: data,
                    isFetchingMatchingFoods: false,
                    fetchError: null
                });
            }).catch((err) => {
                console.error(err);
                this.setState({
                    fetchError: `Haussa tapahtui virhe`,
                    isFetchingMatchingFoods: false,
                });
            });
    }

    changeFetchMethod(fetchMethod) {
        this.setState({fetchMethod});
        if(fetchMethod == 'haku') {
            this.getMatchingFoods('maitorahka');
        } else if(fetchMethod == 'suosikit') {
            this.getFavoriteFoods();
        } else {
            this.getLatestConsumedFoods();
        }
    }

    changeSearchTerm(event) {
        if(event.key == 'Enter') {
            this.doSearch();
        } else {
            this.setState({searchTerm: event.currentTarget.value});
        }
    }

    doSearch() {
        this.context.router.history.push(`?ravintoaine=${this.state.searchTerm}`);
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

        this.setState({
            consumedFoods: updatedValues.consumedFoods,
            totalConsumption: updatedValues.totalConsumption
        });

        var content = {
            consumptionId: updatedValues.consumedFoods[updatedValues.consumedFoods.length - 1].consumptionId,
            foodId,
            foodAmount
        };
        var params = {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(content),
            headers: {
                ...fetchParams.headers,
                'Content-Length': content.length
            }
        }

        fetch('/daily-intake', params).catch((err) => console.error(err));
    }

    removeFromDiary(consumptionId) {
        // update consumed foods and total values optimistically on removal
        var updatedValues = updateValuesOnRemove(
            consumptionId,
            JSON.parse(JSON.stringify(this.state.consumedFoods)),
            JSON.parse(JSON.stringify(this.state.totalConsumption))
        );

        this.setState({
            consumedFoods: updatedValues.consumedFoods,
            totalConsumption: updatedValues.totalConsumption
        });

        var url = `/daily-intake?consumptionId=${consumptionId}`;
        var params = {
            ...fetchParams,
            method: 'DELETE'
        };

        fetch(url, params).catch((err) => console.error(err));
    }

    addToFavorites(foodId) {
        this.toggleFavoriteIcon(foodId, true);
        var url = `/favorites/${foodId}`;
        var params = {
            ...fetchParams,
            method: 'PUT'
        };

        fetch(url, params).catch((err) => console.error(err));
    }

    removeFromFavorites(foodId) {
        this.toggleFavoriteIcon(foodId, false);
        var url = `/favorites/${foodId}`;
        var params = {
            ...fetchParams,
            method: 'DELETE'
        };

        fetch(url, params).catch((err) => console.error(err));
    }

    toggleFavoriteIcon(foodId, favorite) {
        var foods = JSON.parse(JSON.stringify(this.state.foods));
        var index = foods.findIndex((food) => food.id == foodId);
        foods[index]['favorite'] = favorite;
        this.setState({foods});
    }

    render() {
        return (
            <div className='daily-intake'>
                <SearchTypes
                    fetchMethod={this.state.fetchMethod}
                    changeFetchMethod={this.changeFetchMethod}
                />
                <FoodSelection
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
                <ConsumedFoods
                    viewportWidth={this.props.viewportWidth}
                    isModifiable={true}
                    consumedFoods={this.state.consumedFoods}
                    totalConsumption={this.state.totalConsumption}
                    removeFromDiary={this.removeFromDiary}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
                {!this.state.isFetchingConsumedFoods && !this.state.isFetchingDailyGoal &&
                    <DailyGoal
                        dailyGoal={this.state.dailyGoal}
                        totalConsumption={this.state.totalConsumption}
                        isFetchingDailyGoal={this.state.isFetchingDailyGoal}
                        isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                    />
                }
            </div>
        );
    }
}

CurrentEntry.contextTypes = {router: PropTypes.object.isRequired};
