import React from 'react';

export default function TotalConsumption(props) {
    var totalConsumption = props.totalConsumption;
    
    return (
        <div className='total-consumption'>
            {props.isFetchingConsumedFoods ?
                <i className='fa fa-refresh fa-spin fa-3x' />
            :
            <div>
                <h3 className='text-center'>Yhteensä</h3>
                <ul>
                    <li>Energiaa: {totalConsumption.energy}</li>
                    <li>Proteiinia: {totalConsumption.protein}</li>
                    <li>Rasvaa: {totalConsumption.fat}</li>
                    <li>Hiilihydraatteja: {totalConsumption.carbs}</li>
                </ul>
            <canvas id='macronutrient-split' style={{width: '150px', height: '150px'}} /></div>
            }
        </div>
    );
}
