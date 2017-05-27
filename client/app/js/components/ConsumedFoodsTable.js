import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTableHeader from './ConsumedFoodsTableHeader';
import SingleConsumedFood from './SingleConsumedFood';
import SingleConsumedFoodCompactLayout from './SingleConsumedFoodCompactLayout';

export default function ConsumedFoodsTable(props) {
    var consumedFoodsRows = props.consumedFoods.map((food) => {
        var row;
        if(props.viewportWidth > 768) {
            row = (
                <SingleConsumedFood
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        } else {
            row = (
                <SingleConsumedFoodCompactLayout
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        }

        return row;
    });

    return (
        <table className='consumed-foods-table'>
            <ConsumedFoodsTableHeader
                viewportWidth={props.viewportWidth}
                isModifiable={props.isModifiable}
            />
            <tbody>
                {consumedFoodsRows}
            </tbody>
        </table>
    );
}

ConsumedFoodsTable.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired,
    removeFromDiary: PropTypes.func
};
