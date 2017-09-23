import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesFoodRowCompact(props) {
    var {
        food,
        foodAmount,
        shownNutritionValue,
        isBeingEdited,
        actionsVisible,
        showActions,
        hideActions,
        validInput,
        toggleEditing,
        changeFoodAmount,
        updateAmount,
        addEntry,
        removeEntry,
        isModifiable
    } = props;
    var invalidInputStyle = {borderColor: 'red', boxShadow: '0px 0px 5px red'};
    var rows = [];

    if(!isBeingEdited && !actionsVisible) {
        rows.push(
            <td key='entriesFoodName' className='entries__food-name' colSpan={5}>
                {food.name} ({food.amount}g)
            </td>
        );
        rows.push(
            <td
                key='entriesFoodComponentValue'
                className={'entries__food-component-amount ' + shownNutritionValue}
            >
                {food[shownNutritionValue]}
            </td>
        );
    }

    return (
        <tr className='entries__food' onClick={!actionsVisible && isModifiable ? showActions : () => {}}>
            {actionsVisible && !isBeingEdited && isModifiable &&
                <td className='entries__food-actions' colSpan={6}>
                    <button className='btn btn-danger' onClick={() => removeEntry(food)}>
                        <i className='fa fa-trash' />
                    </button>
                    <button className='btn btn-info' onClick={() => addEntry(food, food.amount)}>
                        <i className='fa fa-copy' />
                    </button>
                    <button className='btn btn-success' onClick={toggleEditing}>
                        <i className='fa fa-pencil' />
                    </button>
                    <span>
                        <button className='btn btn-default' onClick={hideActions}>
                            <i className='fa fa-close' style={{color: '#919191'}} />
                        </button>
                    </span>
                </td>
            }
            {isBeingEdited && isModifiable &&
                <td className={'entries__edit-amount ' +
                        (!validInput ? 'invalid-value': '')} colSpan={6}
                >
                    <input
                        type='text'
                        className='edit-input'
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        style={!validInput ? invalidInputStyle : null}
                        autoFocus
                    />
                    <button className='btn btn-primary' onClick={updateAmount}>
                        Tallenna
                    </button>
                    <button className='btn btn-default' onClick={toggleEditing}>
                        Peruuta
                    </button>
                </td>
            }

            {rows}
        </tr>
    );
}

EntriesFoodRowCompact.propTypes = {
    food: PropTypes.object.isRequired,
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
    isModifiable: PropTypes.bool.isRequired
};
