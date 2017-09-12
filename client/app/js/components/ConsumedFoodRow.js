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
        copyEntry,
        removeFromDiary,
        updateDiaryEntry
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
        <tr key={food.consumptionId}>
            {isModifiable &&
                <td
                    className='consumed-food-remove'
                    onClick={() => removeFromDiary(food.consumptionId)}
                >
                    <i className='fa fa-remove' />
                </td>
            }
            <td className='consumed-food-name'>{food.name}</td>
            {!isModifiable &&
                <td className='consumed-food-amount'>{food.amount} g</td>
            }
            {isModifiable && isBeingEdited &&
                <td className='consumed-food-amount'>
                    <input type='text'
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
            {isModifiable && !isBeingEdited &&
                <td className='consumed-food-amount'>
                    <a onClick={() => copyEntry(food)}>{food.amount} g</a>
                    <a onClick={toggleEditing} style={{marginLeft: '10px'}}>
                        <i className='fa fa-pencil'
                                data-tooltip-text='Muokkaa merkintää' />
                    </a>
                    {/*}<br />
                    <a onClick={toggleEditing}>Muokkaa</a>*/}
                </td>
            }
            <td className='consumed-food-energy-amount'>{food.energy} kcal</td>
            <td className={proteinClass}>{food.protein} g</td>
            <td className={carbClass}>{food.carbs} g</td>
            <td className={fatClass}>{food.fat} g</td>
            {/*}<td>
                <div className='consumed-food-row-actions'>
                    <i
                        className='fa fa-chevron-up'
                        data-tooltip-text='Siirrä merkintä edelliseen ateriaan'
                        onClick={() => moveToPreviousMeal(food.consumptionId)}
                    />
                    <i className='fa fa-chevron-down'
                            data-tooltip-text='Siirrä merkintä seuraavaan ateriaan' />
                </div>
            </td>*/}
        </tr>
    );
}

ConsumedFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    updateDiaryEntry: PropTypes.func
};
