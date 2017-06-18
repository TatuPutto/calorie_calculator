import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function ConsumedFoodRowCompactLayout(props) {
    var {
        food,
        foodAmount,
        isBeingEdited,
        validInput,
        isModifiable,
        toggleEditing,
        changeFoodAmount,
        update,
        copyEntry,
        removeFromDiary,
        updateDiaryEntry
    } = props;
    var dominantMacro = calcDominantMacro(food.protein, food.carbs, food.fat);

    return (
        <tr>
            <td className='food-name'>{food.name}</td>

            {!isModifiable &&
                <td className='food-amount'>{food.amount} g</td>
            }

            {isModifiable && isBeingEdited &&
                <td className='food-amount'>
                    <input
                        type='text'
                        className='edit-input'
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        style={!validInput ?
                            {borderColor: 'red', boxShadow: '0px 0px 5px red'} : {}
                        }
                    />
                    <button className='do-edit btn btn-default'
                            onClick={update}>
                        <i className='fa fa-check' />
                    </button>
                    <button className='cancel-edit btn btn-default'
                            onClick={toggleEditing}>
                        <i className='fa fa-close' />
                    </button>
                </td>
            }

            {isModifiable && !isBeingEdited &&
                <td className='food-amount'>
                    <a onClick={() => copyEntry(food)}>
                        {food.amount} g
                    </a>
                    <br />
                    <a onClick={toggleEditing}>
                        Muokkaa
                    </a>
                </td>
            }

            <td className='energy-amount'>{food.energy}</td>
            <td className={'protein-amount ' + (dominantMacro == 'protein' ? dominantMacro : '')}>{food.protein}</td>
            <td className={'carb-amount ' + (dominantMacro == 'carb' ? dominantMacro : '')}>{food.carbs}</td>
            <td className={'fat-amount ' + (dominantMacro == 'fat' ? dominantMacro : '')}>{food.fat}</td>
            {isModifiable &&
                <td className='remove-button-container'>
                    <button
                        className='remove-food btn btn-default'
                        onClick={() => removeFromDiary(food.consumptionId)}
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
