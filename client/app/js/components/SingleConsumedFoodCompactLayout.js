import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function SingleConsumedFoodCompactLayout(props) {
    var food = props.food;
    var dominantMacro = calcDominantMacro(food.protein, food.carbs, food.fat);

    return (
        <tr>
            <td className='food-amount'>{food.amount} g</td>
            <td className='energy-amount'>{food.energy} kcal</td>
            <td className='protein-amount'>{food.protein} g</td>
            <td className='carb-amount'>{food.carbs} g</td>
            <td className='fat-amount'>{food.fat} g</td>
            <td className={'food-name ' + dominantMacro}>{food.name}</td>
            <td className='remove-button-container'>
                <button
                    className='remove-food btn btn-default'
                    onClick={() => props.removeFromDiary(food.consumptionId)}
                >
                    <i className='fa fa-remove' />
                </button>
            </td>
        </tr>
    );
}

SingleConsumedFoodCompactLayout.propTypes = {
    food: PropTypes.object.isRequired,
    removeFromDiary: PropTypes.func.isRequired
};