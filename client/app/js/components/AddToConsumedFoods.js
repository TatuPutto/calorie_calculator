import React from 'react';

import PortionSizes from './PortionSizes';

export default function AddToConsumedFoods(props) {
    var {
        foodId,
        selectedFoodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addToFoodDiary
    } = props
    var cName = 'add-to-consumed-foods-list ';
    cName += (selectedFoodId == foodId) ? 'open' : 'closed';

    return (
        <div className={cName}>
            <div className='add-panel-wrapper'>
                <PortionSizes />
                <div className='add-custom-amount'>
                    <input
                        type='text'
                        placeholder='Määrä...'
                        value={selectedFoodAmount || ''}
                        onChange={setSelectedFoodAmount}
                    />
                    <button
                        className='btn btn-info'
                        onClick={() => addToFoodDiary(foodId, selectedFoodAmount)}
                    >
                        Lisää
                    </button>
                </div>
            </div>
        </div>
    );
}
