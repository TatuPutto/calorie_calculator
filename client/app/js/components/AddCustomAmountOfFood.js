import React from 'react';
import PropTypes from 'prop-types';

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
            <button
                className='btn btn-info'
                style={{background: 'linear-gradient(#5bc0de, #4cabc7)'}}
                onClick={() => addToDiary(foodId, selectedFoodAmount)}
            >
                Lisää
            </button>
        </div>
    );
}

AddCustomAmountOfFood.propTypes = {
    foodId: PropTypes.string.isRequired,
    selectedFoodAmount: PropTypes.number,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addToDiary: PropTypes.func.isRequired
};
