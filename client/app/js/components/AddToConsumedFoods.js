import React from 'react';
import PropTypes from 'prop-types';

import PortionSizes from './PortionSizes';

export default function AddToConsumedFoods(props) {
    var {
        foodId,
        selectedFoodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addToDiary,
        portionSizes
    } = props;

    return (
        <div className='add-to-consumed-foods-list'>
            <div className='add-panel-wrapper'>
                <PortionSizes
                    portionSizes={portionSizes}
                    foodId={foodId}
                    addToDiary={addToDiary}
                />
                <div className='add-custom-amount'>
                    <input
                        type='text'
                        placeholder='Määrä...'
                        value={selectedFoodAmount || ''}
                        onChange={setSelectedFoodAmount}
                    />
                    <button
                        className='btn btn-info'
                        onClick={() => addToDiary(foodId, selectedFoodAmount)}
                    >
                        Lisää
                    </button>
                </div>
            </div>
        </div>
    );
}

AddToConsumedFoods.propTypes = {
    foodId: PropTypes.number.isRequired,
    selectedFoodId: PropTypes.number,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addToDiary: PropTypes.func.isRequired
};
