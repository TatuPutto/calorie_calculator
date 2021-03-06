import React from 'react';

import DailyGoalProgressTable from '../components/DailyGoalProgressTable';
import Entries from '../components/Entries';


export default function EntryDetails(props) {
    var {
        showSingleEntry,
        entries,
        total,
        dailyGoal,
        detailsVisible,
        viewportWidth,
        toggleDetails
    } = props;

    return (
        <div className='entry-details'>
            <div className='row'>
                <div className='daily-progress-table-container col-sm-8'>
                    <DailyGoalProgressTable
                        dailyGoal={dailyGoal}
                        total={total}
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
                    <Entries
                        isFetchingEntries={false}
                        entries={entries}
                        total={total}
                        shownNutritionValue={props.shownNutritionValue}
                        changeShownNutritionValue={props.changeShownNutritionValue}
                        viewportWidth={viewportWidth}
                        isModifiable={false}
                    />
                </div>
            </div>
        </div>
    );
}
