import React from 'react';

import DailyGoal from './DailyGoal';
import SingleFood from './SingleFood';

export default function FoodSelection(props) {
    var offset = props.showResultsOffset;
    var fetchMethod = props.fetchMethod;

    return (
        <div className='food-selection'>
            <div className='search-type'>
                <button className={fetchMethod == 'search' ? 'active' : ''}
                        onClick={() => props.changeFetchMethod('search')}>
                    Haku
                </button>
                <button className={fetchMethod == 'favorites' ? 'active' : ''}
                        onClick={() => props.changeFetchMethod('favorites')}>
                    Suosikit
                </button>
                <button className={fetchMethod == 'latest' ? 'active' : ''}
                        onClick={() => props.changeFetchMethod('latest')}>
                    Viimeisimmät
                </button>
            </div>

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
                        <ul className='food-list'>
                            {props.foods.slice(0, (offset + 20)).map(function (food) {
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
                        {props.foods.length > 20 && props.foods.length > (offset + 20) &&
                            <button
                                className='btn btn-default'
                                style={{marginTop: '20px'}}
                                onClick={props.showMoreResults}
                            >
                                Näytä lisää tuloksia
                            </button>
                        }
                    </div>
                }
            </div>

        </div>
    );
}

FoodSelection.propTypes = {

};
