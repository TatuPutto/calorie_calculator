import React from 'react';

import FoodSelection from './FoodSelection';
import ConsumedFoods from './ConsumedFoods';
import TotalConsumption from './TotalConsumption';

export default class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dailyGoal: null,
            foods: [],
            showResultsOffset: 0,
            consumedFoods: [],
            totalConsumption: null,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingDailyGoal: true,
            isFetchingConsumedFoods: true,
            isFetchingMatchingFoods: true,
            searchTerm: null
        };

        this.getDailyGoal = this.getDailyGoal.bind(this);
        this.getConsumedFoods = this.getConsumedFoods.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.showMoreResults = this.showMoreResults.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.setSelectedFoodAmount = this.setSelectedFoodAmount.bind(this);
        this.addToDiary = this.addToDiary.bind(this);
        this.removeFromDiary = this.removeFromDiary.bind(this);
    }

    componentDidMount() {
        this.getDailyGoal();
        this.getConsumedFoods();
        this.getMatchingFoods('maitorahka');
    }

    getDailyGoal() {
        fetch('http://localhost:3000/daily-goal')
            .then((res) => res.json())
            .then((data) => {console.log(data);
                this.setState({
                    dailyGoal: data,
                    isFetchingDailyGoal: false

                })
            }).catch((err) => console.error(err));
    }

    getConsumedFoods() {
        this.setState({
            selectedFoodId: null,
            selectFood: null,
            selectedFoodAmount: null,
            isFetchingConsumedFoods: true
        });

        fetch('http://localhost:3000/daily-intake')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    consumedFoods: data.nutritionValuesPerItem,
                    totalConsumption: data.nutritionValuesInTotal,
                    isFetchingConsumedFoods: false
                })
            }).catch((err) => console.error(err));
    }

    getMatchingFoods(searchTerm) {
        searchTerm = searchTerm.trim();
        if(!searchTerm) return;
        this.setState({
            foods: [],
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingMatchingFoods: true,
            showResultsOffset: 0
        });

        fetch(`http://localhost:3000/matching-foods/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => this.setState({
                foods: data,
                isFetchingMatchingFoods: false
            })).catch((err) => console.error(err));
    }

    changeSearchTerm(event) {
        if(event.key == 'Enter') {
            this.doSearch();
        } else {
            this.setState({searchTerm: event.currentTarget.value});
        }
    }

    doSearch() {
        this.getMatchingFoods(this.state.searchTerm);
    }

    showMoreResults() {
        this.setState({showResultsOffset: (+this.state.showResultsOffset + 20)});
    }

    selectFood(foodId) {
        if(this.state.selectedFoodId == foodId) {
            this.setState({selectedFoodId: null, selectedFood: null});
        } else {
            this.setState({
                selectedFoodId: foodId,
                selectedFood: this.state.foods.filter((food) => food.id == foodId)[0]
            });
        }
    }

    setSelectedFoodAmount(event) {
        this.setState({selectedFoodAmount: event.currentTarget.value});
    }

    addToDiary(foodId, foodAmount) {
        var params = {
            method: 'POST',
            body: JSON.stringify({foodId, foodAmount}),
            headers: {'Content-Type': 'application/json'}
        };

        fetch('http://localhost:3000/daily-intake', params)
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
    }

    removeFromDiary(consumptionId) {
        if(window.confirm('Haluatko varmasti poistää tämän rivin?')) {
            var url = `http://localhost:3000/daily-intake?` +
                    `consumptionId=${consumptionId}`;

            fetch(url, {method: 'DELETE'})
                .then(() => this.getConsumedFoods())
                .catch((err) => console.error(err));
        }
    }

    render() {
        return (
            <div className='container-fluid'>
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
                    showMoreResults={this.showMoreResults}
                    showResultsOffset={this.state.showResultsOffset}
                    totalConsumption={this.state.totalConsumption}
                    dailyGoal={this.state.dailyGoal}
                    isFetchingDailyGoal={this.state.isFetchingDailyGoal}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
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
