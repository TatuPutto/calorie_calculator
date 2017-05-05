import React from 'react';
import PropTypes from 'prop-types';

import FoodSelection from './FoodSelection';
import ConsumedFoods from './ConsumedFoods';
import TotalConsumption from './TotalConsumption';

export default class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dailyGoal: null,
            consumedFoods: [],
            foods: [],
            totalConsumption: null,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingDailyGoal: true,
            isFetchingConsumedFoods: true,
            isFetchingMatchingFoods: true,
            searchTerm: null,
            fetchMethod: 'haku',
            fetchError: null
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
        this.selectFood = this.selectFood.bind(this);
        this.setSelectedFoodAmount = this.setSelectedFoodAmount.bind(this);
        this.addToDiary = this.addToDiary.bind(this);
        this.removeFromDiary = this.removeFromDiary.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.toggleFavoriteIcon = this.toggleFavoriteIcon.bind(this);
    }

    componentDidMount() {
        this.setState({fetchMethod: this.props.fetchMethod});
        this.getDailyGoal();
        this.getConsumedFoods();

        if(this.props.fetchMethod == 'haku') {
            this.getMatchingFoods(this.props.search);
        } else if(this.props.fetchMethod == 'suosikit') {
            this.getFavoriteFoods();
        } else {
            this.getLatestConsumedFoods()
        }
    }

    // get matching foods when new query params are pushed
    componentWillReceiveProps(nextProps) {
        this.getMatchingFoods(nextProps.search);
    }

    getDailyGoal() {
        fetch('http://localhost:3000/daily-goal')
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

        fetch('http://localhost:3000/daily-intake', {method: 'GET', credentials: 'same-origin'})
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
        this.fetchFoods(`http://localhost:3000/matching-foods/${searchTerm}`);
    }

    getFavoriteFoods() {
        this.fetchFoods('http://localhost:3000/favorites');
    }

    getLatestConsumedFoods() {
        this.fetchFoods('http://localhost:3000/latest');
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

        fetch(url, {credentials: 'same-origin'})
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
                    fetchError: 'Kirjaudu sisään käyttääksesi suosikkeja.',
                    isFetchingMatchingFoods: false,
                });
            });
    }

    changeFetchMethod(fetchMethod) {
        this.context.router.history.push('/' + fetchMethod);
    }

    changeSearchTerm(event) {
        if(event.key == 'Enter') {
            this.doSearch();
        } else {
            this.setState({searchTerm: event.currentTarget.value});
        }
    }

    doSearch() {
        this.context.router.history.push(
                `?ravintoaine=${this.state.searchTerm}`);
    }

    showMoreResults() {
        this.setState({showResultsOffset: (+this.state.showResultsOffset + 20)});
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
        var content = {foodId, foodAmount};
        var params = {
            method: 'POST',
            body: JSON.stringify(content),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': content.length
            }
        };

        fetch('http://localhost:3000/daily-intake', params)
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
    }

    removeFromDiary(consumptionId) {
        var url = `http://localhost:3000/daily-intake?` +
                `consumptionId=${consumptionId}`;

        fetch(url, {method: 'DELETE', credentials: 'same-origin'})
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
    }

    addToFavorites(foodId) {
        var url = `http://localhost:3000/favorites/${foodId}`;
        var params = {
            method: 'PUT',
            body: '',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': 0
            }
        };

        fetch(url, params)
            .then((res) => {
                if(res.status === 200) {
                    this.toggleFavoriteIcon(foodId, true);
                } else {
                    alert('Kirjaudu sisään käyttääksesi suosikkeja');
                    throw new Error('Kirjaudu sisään käyttääksesi suosikkeja.');
                }
            }).catch((err) => console.error(err));
    }

    removeFromFavorites(foodId) {
        var url = `http://localhost:3000/favorites/${foodId}`;
        fetch(url, {method: 'DELETE', credentials: 'same-origin'})
        .then((res) => {
            if(res.status === 200) {
                this.toggleFavoriteIcon(foodId, false);
            } else {
                alert('Kirjaudu sisään käyttääksesi suosikkeja');
                throw new Error('Kirjaudu sisään käyttääksesi suosikkeja.');
            }
        }).catch((err) => console.error(err));
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
                <FoodSelection
                    searchTerm={this.state.searchTerm}
                    changeSearchTerm={this.changeSearchTerm}
                    doSearch={this.doSearch}
                    foods={this.state.foods}
                    selectedFoodId={this.state.selectedFoodId}
                    selectedFoodAmount={this.state.selectedFoodAmount}
                    setSelectedFoodAmount={this.setSelectedFoodAmount}
                    isFetchingMatchingFoods={this.state.isFetchingMatchingFoods}
                    selectFood={this.selectFood}
                    addToDiary={this.addToDiary}
                    addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites}
                    totalConsumption={this.state.totalConsumption}
                    dailyGoal={this.state.dailyGoal}
                    isFetchingDailyGoal={this.state.isFetchingDailyGoal}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                    changeFetchMethod={this.changeFetchMethod}
                    fetchMethod={this.state.fetchMethod}
                    fetchError={this.state.fetchError}
                />
                <ConsumedFoods
                    consumedFoods={this.state.consumedFoods}
                    totalConsumption={this.state.totalConsumption}
                    removeFromDiary={this.removeFromDiary}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
                {/*}<TotalConsumption
                    totalConsumption={this.state.totalConsumption}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />*/}
            </div>

        );
    }
}

Application.contextTypes = {
    router: PropTypes.object.isRequired
};
