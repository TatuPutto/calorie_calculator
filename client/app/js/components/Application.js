//import React from 'react';



function getCurrentFoodList(cookieToCheck) {
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        var cookieName = cookie.split('=')[0];

        // if matching cookie is found, return the value
        if(cookieName == cookieToCheck) {
            var cookieValue = cookie.split('=')[1];
            return JSON.parse(cookieValue);
        }
    }
    return null;
}


function storeFoodToCookie(foodId, amount) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var foodListCookieName = day + '_' + month + '_consumed_foods';

    var consumedFoods = getCurrentFoodList(foodListCookieName);
    consumedFoods.push({foodId, amount});
    document.cookie = foodListCookieName + '=' + JSON.stringify(consumedFoods);
}


class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {
            foods: [],
            consumedFoods: [],
            totalConsumption: null,
            selectedFoodId: null,
            selectedFood: null,
            isFetchingMatchingFoods: true,
            isFetchingConsumedFoods: true,
            searchTerm: null
        };
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.addToFoodDiary = this.addToFoodDiary.bind(this);
    }

    componentDidMount() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var foodListCookieName = day + '_' + month + '_consumed_foods';

        //this.setState({consumedFoods: getCurrentFoodList(foodListCookieName)});
        this.getMatchingFoods('maito');
        this.getConsumedFoods();
    }

    changeSearchTerm(event) {
        // if input is enter, do search
        if(event.key == 'Enter') {
            this.doSearch();
        // otherwise update search term
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
            isFetchingMatchingFoods: true
        });

        fetch(`http://localhost:3000/matching-foods/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => this.setState({
                foods: data,
                isFetchingMatchingFoods: false
            }))
            .catch((err) => console.error(err));
    }

    getConsumedFoods() {
        this.setState({isFetchingConsumedFoods: true});

        fetch('http://localhost:3000/daily-intake')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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

        //storeFoodToCookie(foodId, '200g');
    }

    addToFoodDiary(foodId, amount) {
        var params = {
            method: 'GET',
            body: JSON.stringify({foodId, amount}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('http://localhost:3000/daily-intake/'/*, params*/)
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch((err) => console.error(err));

    }


    render() {
        return (
            <div className='container-fluid'>
                <div className='food-selection col-lg-8 col-lg-offset-2'>
                    <SearchPane
                        searchTerm={this.state.searchTerm}
                        changeSearchTerm={this.changeSearchTerm}
                        doSearch={this.doSearch}
                    />
                    <FoodList
                        foods={this.state.foods}
                        selectedFoodId={this.state.selectedFoodId}
                        isFetchingMatchingFoods={this.state.isFetchingMatchingFoods}
                        selectFood={this.selectFood}
                        addToFoodDiary={this.addToFoodDiary}
                    />
                    <ConsumedFoodsList
                        consumedFoods={this.state.consumedFoods}
                        totalConsumption={this.state.totalConsumption}
                        isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                    />
                    <TotalConsumption
                        totalConsumption={this.state.totalConsumption}
                        isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                    />
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
                onKeyUp={props.changeSearchTerm}
            />
            <button className='do-search' onClick={props.doSearch}>
                <i className='fa fa-search' />
            </button>
        </div>
    );
}


function FoodList(props) {
    return (
        <div className='food-list'>
            {props.isFetchingMatchingFoods &&
                <i style={{}} className='fa fa-refresh fa-spin fa-3x' />
            }
            {props.foods.length === 0 && !props.isFetchingMatchingFoods &&
                <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
            }
            {props.foods.length > 0 && !props.isFetchingMatchingFoods &&


                <ul>
                    <li style={{border: '1px solid #c3cfff', background: 'wheat'}}>
                        <span>Ruoka</span>
                        <span>Kcal / 100g</span>
                        <span>PP</span>
                        <span>RR</span>
                        <span>HH</span>
                    </li>
                    {props.foods.map(function (food) {
                        return (
                            <li>
                                <div
                                    key={food.id}
                                    className='single-food'
                                    onClick={() => props.selectFood(food.id, food.name)}
                                >

                                    <span>
                                        <i className={props.selectedFoodId == food.id ?
                                                'fa fa-chevron-down' : 'fa fa-chevron-right'} />
                                            {food.name}
                                    </span>
                                    <span>{food.energy}</span>
                                    <span>{food.protein}</span>
                                    <span>{food.fat}</span>
                                    <span>{food.carbs}</span>

                                </div>

                                {props.selectedFoodId == food.id &&
                                    <div className='add-to-consumed-foods-list'>
                                        <input type='text' placeholder='amount' />
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => props.addToFoodDiary(food.id, '200g')}
                                        >
                                            Lisää
                                        </button>
                                    </div>
                                }
                            </li>

                        );
                    })}
                </ul>

            }
        </div>
    );
}

function ConsumedFoodsList(props) {
    console.log(props);
    var total = props.totalConsumption;
    return (
        <div className='consumed-foods'>
            <h3 className='text-center'>Syödyt ruuat</h3>
        <div className='food-list'>
            {props.isFetchingConsumedFoods &&
                <i className='fa fa-refresh fa-spin fa-3x' />
            }
            {props.consumedFoods.length === 0 &&
                <p>Et ole syönyt tänään mitään</p>
            }
            {props.consumedFoods.length > 0 &&
                <div>
                    <table className='food-table-headings'>
                        <tr>
                            <th>Ruoka</th>
                            <th>Määrä</th>
                            <th>Energia</th>
                            <th>P</th>
                            <th>R</th>
                            <th>HH</th>
                        </tr>
                    </table>
                    <div className='food-table-content-wrapper'>
                        <table className='food-table'>
                            {props.consumedFoods.map((food) => {
                                return (
                                    <tr key={food.id}>
                                        <td>{food.name}</td>
                                        <td>{food.amount}</td>
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

        </div>
    );
}

function TotalConsumption(props) {
    var totalConsumption = props.totalConsumption;
    if(!props.isFetchingConsumedFoods) {
        setTimeout(() => {
            generateMacronutrientSplitChart(
                totalConsumption.protein,
                totalConsumption.fat,
                totalConsumption.carbs
            );
        }, 100);

    }

    return (
        <div className='total-consumption'>
            {props.isFetchingConsumedFoods ?
                <i className='fa fa-refresh fa-spin fa-3x' />
            :
            <div>
                <h3 className='text-center'>Yhteensä</h3>
                <ul>
                    <li>Energiaa: {totalConsumption.energy}</li>
                    <li>Proteiinia: {totalConsumption.protein}</li>
                    <li>Rasvaa: {totalConsumption.fat}</li>
                    <li>Hiilihydraatteja: {totalConsumption.carbs}</li>
                </ul>
            <canvas id='macronutrient-split' style={{width: '150px', height: '150px'}} /></div>
            }
        </div>
    );
}



function generateMacronutrientSplitChart(protein, fat, carbs) {
    var ctx = document.getElementById('macronutrient-split');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [protein, fat, carbs],
                backgroundColor: [
                    "#50D050",
                    "#ff4d4d",
                    "#4d4dff"
                ]
            }]
        }
    });

    ctx.style.width = '150px';
    ctx.style.height = '150px';

}

ReactDOM.render(<Application />, document.getElementById('app'));
