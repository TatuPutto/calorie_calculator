import React from 'react';

import DailyGoalProgressTable from '../components/DailyGoalProgressTable';
import ConsumedFoods from '../components/ConsumedFoods';

export default function EntryDetails(props) {
    var {
        showSingleEntry,
        consumedFoods,
        totalConsumption,
        dailyGoal,
        detailsVisible,
        viewportWidth,
        toggleDetails
    } = props;

    return (
        <div className='entry-details'>

            <div className='row'>
                <div className='col-sm-8'>
                    <DailyGoalProgressTable
                        dailyGoal={dailyGoal}
                        totalConsumption={totalConsumption}
                        isModifiable={false}
                    />
                </div>
                <div className='macronutrient-split col-sm-4'>
                    <div className='macronutrient-split-wrapper'>
                        <div id='macronutrient-split-chart-container'></div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='tables-wrapper col-sm-12'>
                    <ConsumedFoods
                        viewportWidth={viewportWidth}
                        isModifiable={false}
                        isFetchingConsumedFoods={false}
                        consumedFoods={consumedFoods}
                        totalConsumption={totalConsumption}
                    />
                </div>
            </div>
        </div>
    );
}
