import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTableHeader from './ConsumedFoodsTableHeader';
import ConsumedFoodMealRow from './ConsumedFoodMealRow';
import ConsumedFoodRowWrapper from './ConsumedFoodRowWrapper';
import ConsumedFoodRow from './ConsumedFoodRow';
import ConsumedFoodRowCompactLayout from './ConsumedFoodRowCompactLayout';

export default function ConsumedFoodsTable(props) {
    // create HOC for handling ConsumedFoodRow and ConsumedFoodRowCompactLayout state
    var RowWrapper = ConsumedFoodRowWrapper(
        props.viewportWidth > 768 ? ConsumedFoodRow : ConsumedFoodRowCompactLayout
    );
    var rows = [];

    Object.keys(props.consumedFoods).forEach((meal) => {
        var foods = props.consumedFoods[meal];

        // push row representing the meal
        rows.push(
            <ConsumedFoodMealRow
                meal={meal}
                currentMeal={props.currentMeal}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
            />
        );

        // create rows for each course of the meal
        if(foods.length > 0) {
            var foodRows = foods.map((food) => {
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

            rows.push(foodRows);
        }

    });

    rows.push(<tr><td colSpan={7} onClick={props.addMeal}>Lisää ateria</td></tr>);
/*

    console.log(Object.keys(props.consumedFoods));
    Object.keys(props.consumedFoods).map((meal) => console.log(meal));
    console.log(props.consumedFoods[Object.keys(props.consumedFoods)[0]]);
    var rows = Object.keys(props.consumedFoods).forEach().map((food) => {
        console.log(food);
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
*/

    return (
        <table className='consumed-foods-table'>
            {/*}<ConsumedFoodsTableHeader {...props} />*/}
            <tbody>
                {rows}
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
