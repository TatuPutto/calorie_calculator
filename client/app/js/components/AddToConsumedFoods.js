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
        includeNutritionValues
    } = props;

    return (
        <div className='add-to-consumed-foods'>
            {includeNutritionValues &&
                <span>
                    <span className='energy-amount'>{food.energy} kcal</span>
                    <span className='protein-amount'>{food.protein} g</span>
                    <span className='carb-amount'>{food.carbs} g</span>
                    <span className='fat-amount'>{food.fat} g</span>
                    <br />
                </span>
            }
            <PortionSizes
                portionSizes={food.portionSizes}
                foodId={food.id}
                addToDiary={addToDiary}
            />
            <AddCustomAmountOfFood
                foodId={food.id}
                selectedFoodAmount={selectedFoodAmount}
                setSelectedFoodAmount={setSelectedFoodAmount}
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
    addToDiary: PropTypes.func.isRequired,
    includeNutritionValues: PropTypes.bool.isRequired
};
