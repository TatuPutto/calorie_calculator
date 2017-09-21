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
    var invalidInputStyle = {borderColor: 'red', boxShadow: '0px 0px 5px red'};
    var rows = [];

    if(!props.isBeingEdited && !props.actionsVisible) {
        rows.push(
            <td key='consumedFoodName' className='consumed-food-name' colSpan={5}>
                {food.name} ({food.amount} g)
            </td>
        );
        rows.push(
            <td key='consumedFoodNutrtionValue' className={'consumed-food-nutrition-value-amount ' +
                    shownNutritionValue}>
                {food[shownNutritionValue]}
            </td>
        );
    }

    return (
        <tr onClick={!props.actionsVisible ? props.showActions : () => {}}>
            {props.actionsVisible && !props.isBeingEdited && isModifiable &&
                <td colSpan={8} className='consumed-food-actions'>
                    <button className='btn btn-success'
                            onClick={props.toggleEditing}>
                        <i className='fa fa-pencil' />
                    </button>
                    <button className='btn btn-info'
                            onClick={() => addEntry(food, food.amount)}>
                        <i className='fa fa-copy' />
                    </button>
                    <button className='btn btn-danger'
                            onClick={() => removeEntry(food)}>
                        <i className='fa fa-trash' />
                    </button>
                    <button className='btn btn-default'
                            onClick={props.hideActions}>
                        <i className='fa fa-close' style={{color: '#919191'}} />
                    </button>
                </td>
            }
            {props.isBeingEdited && isModifiable &&
                <td colSpan={8} className='consumed-food-edit'>
                    <input
                        type='text'
                        className='edit-input'
                        value={foodAmount}
                        onChange={changeFoodAmount}
                        style={!validInput ? invalidInputStyle : null}
                        autoFocus
                    />
                    <button
                        className='btn btn-primary'
                        onClick={update}
                    >
                        Tallenna
                    </button>
                    <button
                        className='btn btn-default'
                        onClick={toggleEditing}
                    >
                        Peruuta
                    </button>
                </td>
            }

            {rows}
        </tr>
    );
}

ConsumedFoodRowCompactLayout.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func
};
