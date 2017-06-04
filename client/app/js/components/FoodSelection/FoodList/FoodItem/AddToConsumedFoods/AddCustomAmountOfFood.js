import React from 'react';

export default function AddCustomAmountOfFood(props) {
    var {
        foodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addToDiary
    } = props;

    return (
        <div className='add-custom-amount'>
            <input
                type='text'
                placeholder='Määrä...'
                value={selectedFoodAmount || ''}
                onChange={setSelectedFoodAmount}
            />
            <button className='btn btn-info'
                    onClick={() => addToDiary(foodId, selectedFoodAmount)}>
                Lisää
            </button>
        </div>
    );
}
