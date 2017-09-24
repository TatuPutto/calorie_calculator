import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesFoodRow(props) {
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


    return (
        <tr className='entries__food'>
            <td className='entries__food-name'>
                {isModifiable &&
                    <button className='btn btn--transparent btn--inline-actions'>
                        <i className='fa fa-remove'
                            onClick={() => removeEntry(food)}
                            title='Poista merkintä'
                        />
                    </button>
                }
                {food.name}
            </td>
            {!isModifiable &&
                <td className='entries__food-amount'>{food.amount} g</td>
            }
            {isModifiable && !isBeingEdited &&
                <td
                    className='entries__food-amount'
                    onClick={toggleEditing}
                    title='Muuta määrää klikkaamalla'
                >
                    <a
                        className='entries__copy-food'
                        title='Kopioi merkintä'
                        onClick={() => addEntry(food, food.amount)}
                    >
                        {food.amount} g
                    </a>
                    <a
                        className='entries__toggle-editing-mode'
                        title='Muokkaa merkintää'
                    >
                        <i className='fa fa-pencil' />
                    </a>
                </td>
            }
            {isModifiable && isBeingEdited &&
                <td className='entries__food-amount'>
                    <input
                        type='text'
                        className={'entries__edit-amount ' + (!validInput ? 'invalid-value': '')}
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        onBlur={updateAmount}
                        autoFocus
                    />
                </td>
            }
            <td className='entries__food-energy'>{food.energy} kcal</td>
            <td className='entries__food-protein'>{food.protein} g</td>
            <td className='entries__food-carbs'>{food.carbs} g</td>
            <td className='entries__food-fat'>{food.fat} g</td>
        </tr>
    );
}

EntriesFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    validInput: PropTypes.bool.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    actionsVisible: PropTypes.bool,
    toggleEditing: PropTypes.func,
    addentries: PropTypes.func,
    removeentries: PropTypes.func,
    changeFoodAmount: PropTypes.func,
    updateAmount: PropTypes.func,
    showActions: PropTypes.func,
    hideActions: PropTypes.func,
    isModifiable: PropTypes.bool.isRequired
};
