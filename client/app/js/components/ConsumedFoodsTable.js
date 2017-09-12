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
                index={i}
                meal={meal.mealName}
                activeMeal={props.activeMeal}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
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
                        copyEntry={props.copyEntry}
                        removeFromDiary={props.removeFromDiary}
                        updateDiaryEntry={props.updateDiaryEntry}
                    />
                );
            });

            rows.push(courseRows);
        }
    });


    return (
        <table className='consumed-foods-table'>
            {/*}<ConsumedFoodsTableHeader {...props} />*/}
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
    updateDiaryEntry: PropTypes.func
};
