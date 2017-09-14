import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function ConsumedFoodRow(props) {
    var {
        food,
        foodAmount,
        isBeingEdited,
        validInput,
        isModifiable,
        toggleEditing,
        changeFoodAmount,
        update,
        addEntry,
        removeFromDiary,
        removeEntry
    } = props;

    var dominantMacro = calcDominantMacro(food.protein, food.carbs, food.fat);
    var proteinClass = 'consumed-food-protein-amount ' +
            (dominantMacro == 'protein' ? 'dominant' : '');
    var carbClass = 'consumed-food-carb-amount ' +
            (dominantMacro == 'carb' ? 'dominant' : '');
    var fatClass = 'consumed-food-fat-amount ' +
            (dominantMacro == 'fat' ? 'dominant' : '');
    var inputClass = 'consumed-food-edit-amount ' +
            (!validInput ? 'invalid-value': '')

    return (
        <tr className='consumed-food'>
            <td className='consumed-food-name'>{food.name}</td>
            {!isModifiable &&
                <td className='consumed-food-amount'>{food.amount} g</td>
            }
            {isModifiable && isBeingEdited &&
                <td className='consumed-food-amount'>
                    <input
                        type='text'
                        className={inputClass}
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        onBlur={update}
                        autoFocus
                    />
                </td>
            }
            {isModifiable && !isBeingEdited &&
                <td className='consumed-food-amount'>
                    <a onClick={() => addEntry(food.id, food.amount)}>{food.amount} g</a>
                    <a onClick={toggleEditing} style={{marginLeft: '10px'}}>
                        <i className='fa fa-pencil' data-tooltip-text='Muokkaa merkintää' />
                    </a>
                </td>
            }
            <td className='consumed-food-energy-amount'>{food.energy} kcal</td>
            <td className={proteinClass}>{food.protein} g</td>
            <td className={carbClass}>{food.carbs} g</td>
            <td className={fatClass}>{food.fat} g</td>
            {isModifiable &&
                <td
                    className='consumed-food-remove'
                    onClick={() => removeEntry(food.consumptionId, food.id)}
                >
                    <i className='fa fa-remove' />
                </td>
            }
        </tr>
    );
}

ConsumedFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    removeEntry: PropTypes.func
};
