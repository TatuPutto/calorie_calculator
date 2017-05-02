import React from 'react';
import PropTypes from 'prop-types';

import PortionSizes from './PortionSizes';

export default function AddToConsumedFoods(props) {
    var {
        foodId,
        selectedFoodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addToDiary
    } = props;
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
    foodId: PropTypes.string.isRequired,
    selectedFoodId: PropTypes.string,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addToDiary: PropTypes.func.isRequired
};
