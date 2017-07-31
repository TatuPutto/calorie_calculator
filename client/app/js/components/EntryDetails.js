import React from 'react';

import DailyGoalProgressTable from '../components/DailyGoalProgressTable';
import ConsumedFoods from '../components/ConsumedFoods';

export default function({entry, detailsVisible, viewportWidth, toggleDetails}) {
    return (
        <div className='entry-details'>
            <div className='row'>
                <div className='col-sm-3' style={{height: '320px', background: '#fff', boxShadow: '0px 1px 4px #c1c1c1', padding: '15px', borderRadius: '3px', order: '2'}}>
                    <div className='' style={{borderBottom: '2px solid #e4e4e4', paddingBottom: '15px', marginBottom: '10px'}}><h3>Makrojakauma</h3></div>
                    <div id='macronutrient-split-chart-container'></div>
                </div>
                {/*}<div className='total-container col-sm-9'>*/}
                <div className='col-sm-9'>
                    <DailyGoalProgressTable entry={entry} isModifiable={false} />
                    <ConsumedFoods
                        viewportWidth={viewportWidth}
                        isModifiable={false}
                        isFetchingConsumedFoods={false}
                        consumedFoods={entry.nutritionValuesPerItem}
                    />
                </div>
            </div>
            <div className='row'>

            </div>
        </div>
    );
}
