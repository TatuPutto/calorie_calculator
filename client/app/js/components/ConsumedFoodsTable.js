import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTableHeader from './ConsumedFoodsTableHeader';
import ConsumedFoodRowWrapper from './ConsumedFoodRowWrapper';
import ConsumedFoodRow from './ConsumedFoodRow';
import ConsumedFoodRowCompactLayout from './ConsumedFoodRowCompactLayout';


export default function ConsumedFoodsTable(props) {
    // create HOC for handling ConsumedFoodRow and ConsumedFoodRowCompactLayout state
    var RowWrapper = ConsumedFoodRowWrapper(
        (props.viewportWidth > 768 ? ConsumedFoodRow : ConsumedFoodRowCompactLayout)
    );
    var consumedFoodsRows = props.consumedFoods.map((food) => {
        return (
            <RowWrapper
                key={food.consumptionId}
                food={food}
                isModifiable={props.isModifiable}
                copyEntry={props.copyEntry}
                removeFromDiary={props.removeFromDiary}
                updateDiaryEntry={props.updateDiaryEntry}
            />
        );
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
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    updateDiaryEntry: PropTypes.func
};
