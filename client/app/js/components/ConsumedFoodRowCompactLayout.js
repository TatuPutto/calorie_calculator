import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function ConsumedFoodRowCompactLayout(props) {
    var food = props.food;
    var dominantMacro = calcDominantMacro(food.protein, food.carbs, food.fat);

    return (
        <tr>
            <td className='food-name'>{food.name}</td>
            <td className='food-amount' onClick={() => props.addToDiary(food.id, food.amount)}>
                <a>{food.amount} g</a>
            </td>
            <td className='energy-amount'>{food.energy}</td>
            <td className={'protein-amount ' + (dominantMacro == 'protein-dominant' ? dominantMacro : '')}>{food.protein}</td>
            <td className={'carb-amount ' + (dominantMacro == 'carb-dominant' ? dominantMacro : '')}>{food.carbs}</td>
            <td className={'fat-amount ' + (dominantMacro == 'fat-dominant' ? dominantMacro : '')}>{food.fat}</td>
            {props.isModifiable &&
                <td className='remove-button-container'>
                    <button
                        className='remove-food btn btn-default'
                        onClick={() => props.removeFromDiary(food.consumptionId)}
                    >
                        <i className='fa fa-trash' />
                    </button>
                </td>
            }
        </tr>
    );
}

ConsumedFoodRowCompactLayout.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func
};
