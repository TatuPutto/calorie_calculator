//import React from 'react';

class Application extends React.Component {
    constructor(props) {
        super();
        this.state = {foods: [], isFetching: false, searchTerm: null};
        this.doSearch = this.doSearch.bind(this);
        this.getMatchingFoods = this.getMatchingFoods.bind(this);
    }

    componentDidMount() {
        this.getMatchingFoods('maito');
    }

    doSearch(event) {
        var value = event.currentTarget.value;
        this.getMatchingFoods(value);
    }

    getMatchingFoods(searchTerm) {
        this.setState({isFetching: true});
        //setTimeout(() => {
        fetch(`http://localhost:3000/matching-foods/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => this.setState({foods: data, isFetching: false}))
            .catch((err) => console.error(err));
        //}, 2000);
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
                        isFetching={this.state.isFetching}
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
                onChange={props.doSearch}
            />
        </div>
    );
}


function FoodList(props) {
    function setHeadingWidths() {

    }


    return (
        <div className='food-list'>
            {props.isFetching &&
                <i className='fa fa-refresh fa-spin fa-3x'></i>
            }
            {props.foods.length === 0 && !props.isFetching &&
                <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
            }
            {props.foods.length > 0 && !props.isFetching &&
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
                                        <tr>
                                            <td>{food.name}</td>
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



ReactDOM.render(<Application />, document.getElementById('app'));
