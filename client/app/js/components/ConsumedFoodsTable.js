import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTableHeader from './ConsumedFoodsTableHeader';
import ConsumedFoodMealRow from './ConsumedFoodMealRow';
import ConsumedFoodRowWrapper from './ConsumedFoodRowWrapper';
import ConsumedFoodRow from './ConsumedFoodRow';
import ConsumedFoodRowCompactLayout from './ConsumedFoodRowCompactLayout';
import TotalNutritionValuesTable from './TotalNutritionValuesTable';
import ConsumedFoodMealTotalNutritionValues from './ConsumedFoodMealTotalNutritionValues';

export default function ConsumedFoodsTable(props) {
    // create HOC for handling ConsumedFoodRow and ConsumedFoodRowCompactLayout state
    var RowWrapper = ConsumedFoodRowWrapper(
        props.viewportWidth > 768 ? ConsumedFoodRow : ConsumedFoodRowCompactLayout
    );
    var rows = [];

    props.consumedFoods.forEach((meal, i) => {
        var courses = meal.mealCourses;
        var energy = 0, protein = 0, carbs = 0, fat = 0;

        // push row representing the meal
        rows.push(
            <ConsumedFoodMealRow
                key={meal.mealId}
                mealId={meal.mealId}
                mealName={meal.mealName}
                activeMealId={props.isModifiable ? props.activeMeal.mealId : null}
                removeMeal={props.removeMeal}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
                isModifiable={props.isModifiable}
                arrayIndex={i}
            />
        );

        if(courses.length > 0) {
            var courseRows = courses
                // filter out placeholder courses
                .filter((course) => course.id !== 99999)
                // create rows for each course of the meal
                .map((course) => {
                    energy += course.energy;
                    protein += course.protein;
                    carbs += course.carbs;
                    fat += course.fat;

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

        // show nutrition values in total for meal
        // if there is more than 2 courses on that meal
        if(courses.length > 1) {
            rows.push(
                <ConsumedFoodMealTotalNutritionValues
                    total={{energy, protein, carbs, fat}}
                />
            );
        }
    });

    return (
        <table className='consumed-foods-table'>
            <tbody>
                {rows}
                {props.consumedFoods.length > 1 &&
                    <TotalNutritionValuesTable
                        totalConsumption={props.totalConsumption}
                    />
                }
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
