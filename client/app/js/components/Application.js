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
            selectedFoodAmount: null,
            isFetchingMatchingFoods: true,
            isFetchingConsumedFoods: true,
            searchTerm: null
        };
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
        this.selectFood = this.selectFood.bind(this);
        this.setSelectedFoodAmount = this.setSelectedFoodAmount.bind(this);
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
            selectedFoodAmount: null,
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

    setSelectedFoodAmount(event) {
        console.log(event.currentTarget.value);
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

                {/*}<SearchPane
                    searchTerm={this.state.searchTerm}
                    changeSearchTerm={this.changeSearchTerm}
                    doSearch={this.doSearch}
                />*/}
                <FoodList
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
                />
                {/*}<ConsumedFoodsList
                    consumedFoods={this.state.consumedFoods}
                    totalConsumption={this.state.totalConsumption}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />
                <TotalConsumption
                    totalConsumption={this.state.totalConsumption}
                    isFetchingConsumedFoods={this.state.isFetchingConsumedFoods}
                />*/}
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
        <div className='food-selection'>
            <div className='search-type'>
                <button className='active'>Haku</button>
                <button>Suosikit</button>
                <button>Viimeisimmät</button>
            </div>

            <div className='daily-goal'>
                <h4>Päivä tavoite</h4>
                    <button className='configure-daily-goals'>
                        <i className='fa fa-cog' />
                    </button>
                <hr/>
                Energia: 1650 kcal / 2500 kcal<hr/>
                Proteiinia: 128 g / 220 g<hr/>
                Hiilihydraatteja: 200 g / 350 g<br/><hr/>
                Rasvaa: 53 g / 80 g
            </div>

            <div className='matching-foods'>
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



                {props.isFetchingMatchingFoods &&
                    <i style={{}} className='fa fa-refresh fa-spin fa-3x' />
                }
                {props.foods.length === 0 && !props.isFetchingMatchingFoods &&
                    <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
                }
                {props.foods.length > 0 && !props.isFetchingMatchingFoods &&
                    <div>
                        <div className='heading-wrapper'>
                            <span>Ravintoainelista</span>
                            <span>kcal / 100</span>
                            <span style={{background: 'white'}}>P</span>
                            <span style={{background: 'white'}}>H</span>
                            <span style={{background: 'white'}}>R</span>
                        </div>
                        <ul>
                            {props.foods.slice(0, 20).map(function (food) {
                                return (
                                    <SingleFood
                                        food={food}
                                        selectedFoodId={props.selectedFoodId}
                                        selectFood={props.selectFood}
                                        selectedFoodAmount={props.selectedFoodAmount}
                                        setSelectedFoodAmount={props.setSelectedFoodAmount}
                                        addToFoodDiary={props.addToFoodDiary}
                                    />
                                );
                            })}
                        </ul>
                        {props.foods.length > 20 &&
                            <button className='btn btn-default' style={{marginTop: '20px'}}>
                                Näytä lisää tuloksia
                            </button>
                        }
                    </div>
                }
            </div>

        </div>
    );
}

function SingleFood(props) {
    var food = props.food;
    var protein = food.protein;
    var carbs = food.carbs;
    var fat = food.fat;
    var macroDominant;

    if(+protein > +carbs) {
        if(+protein > +fat) {
            macroDominant = 'protein-dominant';
        } else {
            macroDominant = 'fat-dominant';
        }
    } else {
        if(+carbs > +fat) {
            macroDominant = 'carb-dominant';
        } else {
            macroDominant = 'fat-dominant';
        }
    }


    return (
        <li>
            <div
                key={food.id}
                className='single-food'
                onClick={() => props.selectFood(food.id, food.name)}
            >
                <span className={macroDominant}>
                    <i className={props.selectedFoodId == food.id ?
                            'fa fa-chevron-down' : 'fa fa-chevron-right'} />
                        &nbsp;&nbsp;{food.name}
                </span>
                <span>{food.energy} kcal</span>
                <span>{food.protein} g</span>
                <span>{food.carbs} g</span>
                <span>{food.fat} g</span>
            </div>

            {/*}{props.selectedFoodId == food.id &&*/}
                <div className={props.selectedFoodId == food.id ? 'add-to-consumed-foods-list open' : 'add-to-consumed-foods-list closed'}>
                    <div className='add-panel-wrapper'>
                        <table className='portion-sizes'>
                            <th>Annoskoot</th>
                            <tr>
                                <td>5 g</td>
                                <td>Teelusikka</td>
                            </tr>
                            <tr>
                                <td>15 g</td>
                                <td>Ruokalusikka</td>
                            </tr>
                            <tr>
                                <td>100 g</td>
                                <td>Pieni annos</td>
                            </tr>
                        </table>

                        <div className='add-custom-amount'>
                            <input
                                type='text'
                                placeholder='Määrä...'
                                defaultValue={props.selectedFoodAmount}
                                onChange={props.setSelectedFoodAmount}
                            />
                            <button className='btn btn-info'
                                    onClick={() => props.addToFoodDiary(food.id, props.selectedFoodAmount)}>
                                Lisää
                            </button>
                        </div>
                    </div>
                </div>
            {/*}}*/}
        </li>
    );
}


function ConsumedFoodsList(props) {
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
                            <tr>
                                <td>Yhteensä</td>
                                <td>-</td>
                                <td>{total.energy}</td>
                                <td>{total.protein}</td>
                                <td>{total.fat}</td>
                                <td>{total.carbs}</td>
                            </tr>
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
    /*if(!props.isFetchingConsumedFoods) {
        setTimeout(() => {
            generateMacronutrientSplitChart(
                totalConsumption.protein,
                totalConsumption.fat,
                totalConsumption.carbs
            );
        }, 100);

    }*/

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
