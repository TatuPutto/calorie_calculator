import React from 'react';

import SearchTypes from './SearchTypes';
import DailyGoal from './DailyGoal';
import SingleFood from './SingleFood';

export default function FoodSelection(props) {
    var viewportWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    );
    var offset = props.offset;
    var foods = [];

    if(viewportWidth < 768) {
        foods = props.foods.slice(0, (offset + 10));
    } else {
        foods = props.foods;
    }

    console.log(foods);
    return (
        <div className='food-selection row'>


            <div className='food-selection-wrapper col-lg-10 col-md-10 col-sm-12 col-md-offset-1 col-lg-offset-1'>
                {/*}<DailyGoal
                    dailyGoal={props.dailyGoal}
                    totalConsumption={props.totalConsumption}
                    isFetchingDailyGoal={props.isFetchingDailyGoal}
                    isFetchingConsumedFoods={props.isFetchingConsumedFoods}
                />*/}

                <div className='matching-foods'>
                    {props.fetchMethod == 'haku' &&
                        <div className='search'>
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
                    }

                    {props.fetchError &&
                        <p>{props.fetchError}</p>
                    }
                    {props.isFetchingMatchingFoods &&
                        <i className='fa fa-spinner fa-3x fa-spin' />
                    }
                    {props.foods.length === 0 && !props.isFetchingMatchingFoods && !props.fetchError &&
                        <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
                    }
                    {props.foods.length > 0 && !props.isFetchingMatchingFoods && !props.fetchError &&
                        <div>
                            {/*}<div className='heading-wrapper'>
                                <span>Ravintoainelista</span>
                                <span>kcal / 100</span>
                                <span style={{background: 'white'}}>P</span>
                                <span style={{background: 'white'}}>H</span>
                                <span style={{background: 'white'}}>R</span>
                            </div>*/}
                            <ul className='food-list'>
                                {foods.map(function (food) {
                                    return (
                                        <SingleFood
                                            key={food.id}
                                            viewportWidth={viewportWidth}
                                            food={food}
                                            selectedFoodId={props.selectedFoodId}
                                            selectFood={props.selectFood}
                                            selectedFoodAmount={props.selectedFoodAmount}
                                            setSelectedFoodAmount={props.setSelectedFoodAmount}
                                            addToDiary={props.addToDiary}
                                            addToFavorites={props.addToFavorites}
                                            removeFromFavorites={props.removeFromFavorites}
                                        />
                                    );
                                })}
                            </ul>
                            {props.foods.length > 10 && props.foods.length > (offset + 10) && viewportWidth < 768 &&
                                <button
                                    className='btn btn-default'
                                    style={{marginTop: '20px'}}
                                    onClick={props.showMoreResults}
                                >
                                    Näytä lisää tuloksia ({((offset + 10) + ' / ' + props.foods.length)})
                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

FoodSelection.propTypes = {

};
