import React from 'react';

import SearchTypes from './SearchTypes';
import DailyGoal from './DailyGoal';
import SingleFood from './SingleFood';

export default function FoodSelection(props) {
    var offset = props.showResultsOffset;
    console.log(props.fetchError);
    return (
        <div className='food-selection'>
            <SearchTypes
                fetchMethod={props.fetchMethod}
                changeFetchMethod={props.changeFetchMethod}
            />

            <div className='food-selection-wrapper'>
                <DailyGoal
                    dailyGoal={props.dailyGoal}
                    totalConsumption={props.totalConsumption}
                    isFetchingDailyGoal={props.isFetchingDailyGoal}
                    isFetchingConsumedFoods={props.isFetchingConsumedFoods}
                />

                <div className='matching-foods'>
                    {props.fetchMethod == 'search' &&
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
                                {props.foods.map(function (food) {
                                    return (
                                        <SingleFood
                                            key={food.id}
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
                            {/*}{props.foods.length > 20 && props.foods.length > (offset + 20) &&
                                <button
                                    className='btn btn-default'
                                    style={{marginTop: '20px'}}
                                    onClick={props.showMoreResults}
                                >
                                    Näytä lisää tuloksia ({((offset + 20) + ' / ' + props.foods.length)})
                                </button>
                            }*/}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

FoodSelection.propTypes = {

};
