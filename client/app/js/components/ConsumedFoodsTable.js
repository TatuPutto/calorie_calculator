import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTableHeader from './ConsumedFoodsTableHeader';
import ConsumedFoodRow from './ConsumedFoodRow';
import ConsumedFoodRowCompactLayout from './ConsumedFoodRowCompactLayout';

export default function ConsumedFoodsTable(props) {
    var consumedFoodsRows = props.consumedFoods.map((food) => {
        var row;
        if(props.viewportWidth > 768) {
            row = (
                <ConsumedFoodRow
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    addToDiary={props.addToDiary}
                    removeFromDiary={props.removeFromDiary}
                    updateDiaryEntry={props.updateDiaryEntry}
                />
            );
        } else {
            row = (
                <ConsumedFoodRowCompactLayout
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    addToDiary={props.addToDiary}
                    removeFromDiary={props.removeFromDiary}
                    updateDiaryEntry={props.updateDiaryEntry}
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
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    updateDiaryEntry: PropTypes.func
};
