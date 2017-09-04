import React from 'react';
import PropTypes from 'prop-types';

import PortionSizes from './PortionSizes';
import AddCustomAmountOfFood from './AddCustomAmountOfFood';

export default function AddToConsumedFoods(props) {
    var {
        food,
        selectedFoodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addToDiary,
        portionSizes,
    } = props;

    return (
        <div className='add-to-consumed-foods'>
            <AddCustomAmountOfFood
                foodId={food.id}
                selectedFoodAmount={selectedFoodAmount}
                setSelectedFoodAmount={setSelectedFoodAmount}
                addToDiary={addToDiary}
            />
            <PortionSizes
                portionSizes={food.portionSizes}
                foodId={food.id}
                addToDiary={addToDiary}
            />
        </div>
    );
}

AddToConsumedFoods.propTypes = {
    food: PropTypes.object.isRequired,
    selectedFoodId: PropTypes.string,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addToDiary: PropTypes.func.isRequired
};
