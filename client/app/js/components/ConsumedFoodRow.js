import React from 'react';
import PropTypes from 'prop-types';

export default function ConsumedFoodRow(props) {
    var {
        food,
        foodAmount,
        isBeingEdited,
        validInput,
        isModifiable,
        toggleEditing,
        changeFoodAmount,
        updateAmount,
        addEntry,
        removeEntry
    } = props;
    var inputClass = 'consumed-food-edit-amount ' + (!validInput ? 'invalid-value': '')

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
                    <a title='Kopioi merkintä' className='copy-entry' onClick={() => addEntry(food, food.amount)}>{food.amount} g</a>
                    <a className='consumed-food-toggle-edit'>
                        <i className='fa fa-pencil' data-tooltip-text='Muokkaa merkintää' />
                    </a>
                </td>
            }
            <td className='consumed-food-energy-amount'>{food.energy} kcal</td>
            <td className='consumed-food-protein-amount'>{food.protein} g</td>
            <td className='consumed-food-carb-amount'>{food.carbs} g</td>
            <td className='consumed-food-fat-amount'>{food.fat} g</td>
        </tr>
    );
}

ConsumedFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    validInput: PropTypes.bool.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    actionsVisible: PropTypes.bool,
    toggleEditing: PropTypes.func,
    addEntry: PropTypes.func,
    removeEntry: PropTypes.func,
    changeFoodAmount: PropTypes.func,
    updateAmount: PropTypes.func,
    showActions: PropTypes.func,
    hideActions: PropTypes.func,

};
