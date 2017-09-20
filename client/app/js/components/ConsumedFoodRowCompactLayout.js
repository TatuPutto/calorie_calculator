import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function ConsumedFoodRowCompactLayout(props) {
    var {
        food,
        foodAmount,
        shownNutritionValue,
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
    var invalidInputStyle = {borderColor: 'red', boxShadow: '0px 0px 5px red'};

    return (
        <tr>
            <td className='consumed-food-name' colSpan={5}>
                {food.name} ({food.amount} g)
            </td>
            {!isModifiable &&
                <td className='consumed-food-amount'>{food.amount} g</td>
            }
            {isModifiable && isBeingEdited &&
                <td className='consumed-food-amount'>
                    <input
                        type='text'
                        className='edit-input'
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        style={!validInput ? invalidInputStyle : null}
                    />
                    <button
                        className='consumed-food-edit-amount btn btn-default'
                        onClick={update}
                    >
                        <i className='fa fa-check' />
                    </button>
                    <button
                        className='consumed-food-cancel-edit btn btn-default'
                        onClick={toggleEditing}
                    >
                        <i className='fa fa-close' />
                    </button>
                </td>
            }
            {/*}{isModifiable && !isBeingEdited &&
                <td className='consumed-food-amount'>
                    <a onClick={() => addEntry(food.id, food.amount)}>
                        {food.amount} g
                    </a>
                    <br />
                    <a onClick={toggleEditing}>
                        Muokkaa
                    </a>
                </td>
            }*/}
            <td className={'consumed-food-nutrition-value-amount ' + shownNutritionValue}>
                {food[shownNutritionValue]}
            </td>

            {/*}<td className={proteinClass}>{food.protein} g</td>
            <td className={carbClass}>{food.carbs} g</td>
            <td className={fatClass}>{food.fat} g</td>
            {/*}{isModifiable &&
                <td className='consumed-food-remove'>
                    <button
                        className='btn btn-default'
                        onClick={() => removeFromDiary(food.consumptionId)}
                    >
                        <i className='fa fa-trash' />
                    </button>
                </td>
            }*/}
        </tr>
    );
}

ConsumedFoodRowCompactLayout.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func
};
