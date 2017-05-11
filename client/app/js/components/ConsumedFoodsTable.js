import React from 'react';
import PropTypes from 'prop-types';

import SingleConsumedFood from './SingleConsumedFood';
import SingleConsumedFoodCompactLayout from './SingleConsumedFoodCompactLayout';

export default function ConsumedFoodsTable(props) {
    var tableRows = props.consumedFoods.map((food) => {
        var row;
        if(props.viewportWidth > 768) {
            row = (
                <SingleConsumedFood
                    key={food.consumptionId}
                    food={food}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        } else {
            row = (
                <SingleConsumedFoodCompactLayout
                    key={food.consumptionId}
                    food={food}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        }

        return row;
    });

    return (
        <table className='consumed-foods-table'>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
}

ConsumedFoodsTable.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
