import React from 'react';

import DailyGoal from './DailyGoal';
import SingleFood from './SingleFood';

export default function FoodSelection(props) {
    var offset = props.showResultsOffset;

    return (
        <div className='food-selection'>
            <div className='search-type'>
                <button className='active'>Haku</button>
                <button>Suosikit</button>
                <button>Viimeisimmät</button>
            </div>

            <DailyGoal
                dailyGoal={props.dailyGoal}
                totalConsumption={props.totalConsumption}
                isFetchingDailyGoal={props.isFetchingDailyGoal}
                isFetchingConsumedFoods={props.isFetchingConsumedFoods}
            />

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
