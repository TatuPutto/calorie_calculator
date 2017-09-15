import React from 'react';

import DailyGoalProgressTable from '../components/DailyGoalProgressTable';
import ConsumedFoods from '../components/ConsumedFoods';

export default function EntryDetails(props) {
    var {
        entry,
        detailsVisible,
        viewportWidth,
        toggleDetails
    } = props;

    return (
        <div className='entry-details'>
            <div className='row'>
                <div className='macronutrient-split col-sm-2'>
                    <div className='macronutrient-split-wrapper'>
                        <div className='macronutrient-split-header'>
                            <h3>Makrojakauma</h3>
                        </div>
                        <div id='macronutrient-split-chart-container'></div>
                    </div>
                </div>
                <div className='tables-wrapper col-sm-10'>
                    <DailyGoalProgressTable
                        dailyGoal={props.dailyGoal}
                        totalConsumption={props.totalConsumption}
                        isModifiable={false}
                    />
                    <ConsumedFoods
                        viewportWidth={viewportWidth}
                        isModifiable={false}
                        isFetchingConsumedFoods={false}
                        consumedFoods={props.consumedFoods}
                    />
                </div>
            </div>
        </div>
    );
}
