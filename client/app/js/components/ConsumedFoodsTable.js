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

    props.consumedFoods.forEach((meal, i) => {
        var courses = meal.mealCourses;

        // push row representing the meal
        rows.push(
            <ConsumedFoodMealRow
                key={meal.mealId}
                mealId={meal.mealId}
                mealName={meal.mealName}
                activeMealId={props.activeMeal.mealId}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
                arrayIndex={i}
            />
        );

        // create rows for each course of the meal
        if(courses.length > 0) {
            var courseRows = courses.map((course) => {
                return (
                    <RowWrapper
                        key={course.consumptionId}
                        food={course}
                        isModifiable={props.isModifiable}
                        addEntry={props.addEntry}
                        updateEntry={props.updateEntry}
                        removeEntry={props.removeEntry}
                    />
                );
            });

            rows.push(courseRows);
        }
    });

    return (
        <table className='consumed-foods-table'>
            <tbody>
                {rows}
                <tr>
                    <td colSpan={7} onClick={props.addMeal}>Lisää ateria</td>
                </tr>
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
    removeEntry: PropTypes.func
};
