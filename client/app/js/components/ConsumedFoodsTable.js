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

    /*Object.keys(props.consumedFoods).forEach((meal) => {
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

    });*/
    console.log(props.consumedCourses);
    var continueFromIndex = 0;
    props.consumedMeals.forEach((meal) => {
        // push row representing the meal
        rows.push(
            <ConsumedFoodMealRow
                key={meal}
                meal={meal}
                activeMeal={props.activeMeal}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
            />
        );


        // props.consumedCourses

        for(var i = continueFromIndex; i < props.consumedCourses.length; i++) {
            var course = props.consumedCourses[i];

            // create row for course if the name of the meal matches
            if(course.mealName == meal) {
                // create rows for each course of the meal
                //if(props.consumedCourses.length > 0) {
                    //var foodRows = props.consumedCourses.map((course) => {
                        //return (
                            rows.push(
                                <RowWrapper
                                    key={course.consumptionId}
                                    food={course}
                                    isModifiable={props.isModifiable}
                                    copyEntry={props.copyEntry}
                                    removeFromDiary={props.removeFromDiary}
                                    updateDiaryEntry={props.updateDiaryEntry}
                                />
                            );
                        //);
                    //});

                    //rows.push(foodRows);
                //}

            } else {
                continueFromIndex = i;
                break;
            }
        }


        //var foods = props.consumedFoods[meal];


    });


    rows.push(<tr><td colSpan={7} onClick={props.addMeal}>Lisää ateria</td></tr>);
    console.log(rows);
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
