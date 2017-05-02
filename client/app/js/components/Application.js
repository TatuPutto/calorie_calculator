import React from 'react';

import FoodSelection from './FoodSelection';
import ConsumedFoods from './ConsumedFoods';
import TotalConsumption from './TotalConsumption';

export default class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {
            foods: [],
            showResultsOffset: 0,
            consumedFoods: [],
            totalConsumption: null,
            selectedFoodId: null,
            selectedFood: null,
            selectedFoodAmount: null,
            isFetchingMatchingFoods: true,
            isFetchingConsumedFoods: true,
            searchTerm: null
        };
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.showMoreResults = this.showMoreResults.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.setSelectedFoodAmount = this.setSelectedFoodAmount.bind(this);
        this.addToFoodDiary = this.addToFoodDiary.bind(this);
    }

    componentDidMount() {
        this.getMatchingFoods('maitorahka');
        this.getConsumedFoods();
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
            }))
            .catch((err) => console.error(err));
    }

    showMoreResults() {
        this.setState({showResultsOffset: (+this.state.showResultsOffset + 20)});
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
            })})
            .catch((err) => console.error(err));
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

    addToFoodDiary(foodId, foodAmount) {
        var params = {
            method: 'POST',
            body: JSON.stringify({foodId, foodAmount}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:3000/daily-intake', params)
            .then(() => this.getConsumedFoods())
            .catch((err) => console.error(err));
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
                    addToFoodDiary={this.addToFoodDiary}
                    showMoreResults={this.showMoreResults}
                    showResultsOffset={this.state.showResultsOffset}
                    totalConsumption={this.state.totalConsumption}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
                <ConsumedFoods
                    consumedFoods={this.state.consumedFoods}
                    totalConsumption={this.state.totalConsumption}
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
