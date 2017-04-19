//import React from 'react';

class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {
            foods: [],
            selectedFoodId: null,
            selectedFood: null,
            isFetching: false,
            searchTerm: null
        };
        this.doSearch = this.doSearch.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.selectFood = this.selectFood.bind(this);
    }

    componentDidMount() {
        this.getMatchingFoods('maito');
    }

    doSearch(event) {
        var value = event.currentTarget.value;
        this.getMatchingFoods(value);
    }

    getMatchingFoods(searchTerm) {
        searchTerm = searchTerm.trim();
        if(!searchTerm) return;
        this.setState({selectedFoodId: null, selectedFood: null, isFetching: true});

        fetch(`http://localhost:3000/matching-foods/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => this.setState({foods: data, isFetching: false}))
            .catch((err) => console.error(err));
    }

    selectFood(foodId) {
        this.setState({
            selectedFoodId: foodId,
            selectedFood: this.state.foods.filter((food) => food.id == foodId)[0]
        });
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='food-selection col-lg-8 col-lg-offset-2'>
                    <SearchPane
                        searchTerm={this.state.searchTerm}
                        doSearch={this.doSearch}
                    />
                    <FoodList
                        foods={this.state.foods}
                        selectedFoodId={this.state.selectedFoodId}
                        isFetching={this.state.isFetching}
                        selectFood={this.selectFood}
                    />
                    <SelectionPane selectedFood={this.state.selectedFood} />
                </div>
            </div>
        );
    }
}


function SearchPane(props) {
    return (
        <div className='search-pane'>
            <input
                type='text'
                className='search-input'
                placeholder='Hae ruokaa tai raaka-ainetta'
                defaultValue={props.searchTerm}
                onChange={props.doSearch}
            />
        </div>
    );
}


function FoodList(props) {
    return (
        <div className='food-list'>
            {props.foods.length === 0 && !props.isFetching &&
                <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
            }
            {props.foods.length > 0 &&
                <div>
                    <table className='food-table-headings'>
                        <tr>
                            <th>Food</th>
                            <th>Energia</th>
                            <th>Proteiini</th>
                            <th>Rasva</th>
                            <th>Hiilihydraatti</th>
                        </tr>
                    </table>
                    <div className='food-table-content-wrapper'>
                        <table className='food-table'>
                            {props.foods.map(function (food) {
                                return (
                                    <tr key={food.id}
                                            onClick={() => props.selectFood(food.id, food.name)}>
                                        <td>
                                            <input
                                                type='radio'
                                                checked={props.selectedFoodId == food.id ? true : false}
                                            />
                                            {food.name}
                                        </td>
                                        <td>{food.energy}</td>
                                        <td>{food.protein}</td>
                                        <td>{food.fat}</td>
                                        <td>{food.carbs}</td>
                                    </tr>
                                );
                            })}
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}


function SelectionPane(props) {
    console.log(props);
    return (
        <div className='selection-pane'>
            {props.selectedFood &&
                <h4>{props.selectedFood.name}</h4>
            }
        </div>
    );
}


ReactDOM.render(<Application />, document.getElementById('app'));
