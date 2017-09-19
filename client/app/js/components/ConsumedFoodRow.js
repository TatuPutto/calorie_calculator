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
            <td className='consumed-food-name'>
                {isModifiable &&
                    <i className='fa fa-remove'
                        onClick={() => removeEntry(food)}
                        title='Poista merkintä'
                        style={{marginRight: '5px'}}
                    />
                }
                {food.name}
            </td>
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
                <td className='consumed-food-amount' onClick={toggleEditing} title='Muuta määrää klikkaamalla'>
                    {/*{food.amount} g*/}
                    {/*}<a onClick={() => addEntry(food, food.amount)}>{food.amount} g</a>
                    <br />
                    <a onClick={toggleEditing}>
                        Muokkaa
                    </a>*/}
                    <a title='Kopioi merkintä' className='copy-entry' onClick={() => addEntry(food, food.amount)}>{food.amount} g</a>
                    <a className='consumed-food-toggle-edit'>
                        <i className='fa fa-pencil' data-tooltip-text='Muokkaa merkintää' />
                    </a>
                </td>
            }
            <td className='consumed-food-energy-amount'>{food.energy} kcal</td>
            <td className={proteinClass}>{food.protein} g</td>
            <td className={carbClass}>{food.carbs} g</td>
            <td className={fatClass}>{food.fat} g</td>
            {/*}<td className='consumed-food-actions'>
                <div className='consumed-food-actions-container'>
                    <button
                        className='btn btn-success'
                        onClick={() => addEntry(food, food.amount)}
                    >
                        Kopioi
                    </button>
                    <button
                        className='btn btn-success'
                        onClick={toggleEditing}
                    >
                        Muokkaa
                    </button>
                    <button
                        className='btn btn-success'
                        onClick={() => removeEntry(food)}
                    >
                        Poista
                    </button>
                </div>
            </td>*/}
            {/*}{isModifiable &&
                <td
                    className='consumed-food-remove'
                    onClick={() => removeEntry(food)}
                >
                    <i className='fa fa-remove' />
                </td>
            }*/}
        </tr>
    );
}

ConsumedFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    removeEntry: PropTypes.func
};
