import React from 'react';
import PropTypes from 'prop-types';

export default function ConsumedFoodsHeader(props) {
    return (
        <div className='consumed-foods-header'>
            {props.isModifiable &&
                <button className='btn btn-ghost' onClick={props.addMeal}>
                    <i className='fa fa-plus-square-o' /> Lisää ateria
                </button>
            }
            <h3>Merkinnät</h3>
            {props.viewportWidth < 768 &&
                <select onChange={props.changeShownNutritionValue}>
                    <option defaultValue>kcal</option>
                    <option>Proteiini</option>
                    <option>Hiilihydraatti</option>
                    <option>Rasva</option>
                </select>
            }
        </div>
    );
}

ConsumedFoodsHeader.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    addMeal: PropTypes.func.isRequired,
    shownNutritionValue: PropTypes.string,
    changeShownNutritionValue: PropTypes.func
};
