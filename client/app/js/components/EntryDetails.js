import React from 'react';

import DailyGoalProgressTable from '../components/DailyGoalProgressTable';
import ConsumedFoodsTable from '../components/ConsumedFoodsTable';

export default function({entry, detailsVisible, viewportWidth, toggleDetails}) {
    return (
        <div className='entry-details col-xs-12'>
            <div className='row'>
                <div id='macronutrient-split-chart-container' className='col-sm-4'></div>
                <div className='total-container col-sm-8'>
                    <DailyGoalProgressTable
                        entry={entry}
                        isModifiable={false}
                    />
                    <button className='btn btn-default' onClick={toggleDetails}>
                        {detailsVisible ?
                            <span>Piilota merkinnät</span>
                            :
                            <span>Näytä merkinnät</span>
                        }
                    </button>
                </div>
            </div>
            <div className='row'>
                {detailsVisible &&
                    <ConsumedFoodsTable
                        viewportWidth={viewportWidth}
                        isModifiable={false}
                        isFetchingConsumedFoods={false}
                        consumedFoods={entry.nutritionValuesPerItem}
                    />
                }
            </div>
        </div>
    );
}
