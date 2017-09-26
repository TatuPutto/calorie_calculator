import React from 'react';
import PropTypes from 'prop-types';

import EntriesMealRow from './EntriesMealRow';
import EntriesFoodRowWrapper from './EntriesFoodRowWrapper';
import EntriesFoodRow from './EntriesFoodRow';
import EntriesFoodRowCompact from './EntriesFoodRowCompact';
import EntriesTotalRow from './EntriesTotalRow';
import EntriesTotalRowCompact from './EntriesTotalRowCompact';
import EntriesTotalRowWithPercentages from './EntriesTotalRowWithPercentages';


export default function EntriesTable(props) {
    // create HOC for handling ConsumedFoodRow and ConsumedFoodRowCompactLayout state
    var RowWrapper = EntriesFoodRowWrapper(
        props.viewportWidth > 768 ? EntriesFoodRow : EntriesFoodRowCompact
    );
    var rows = [];

    props.entries.forEach((meal, i) => {
        var energy = 0, protein = 0, carbs = 0, fat = 0;

        // push row representing the meal
        rows.push(
            <EntriesMealRow
                key={meal.id}
                id={meal.id}
                name={meal.name}
                activeMealId={props.isModifiable ? props.activeMeal.id : null}
                removeMeal={props.removeMeal}
                changeActiveMeal={props.changeActiveMeal}
                editMealName={props.editMealName}
                mealNumber={i}
                isModifiable={props.isModifiable}
                viewportWidth={props.viewportWidth}
            />
        );

        if(meal.foods.length > 0) {
            var foodRows = meal.foods
                // filter out placeholder courses
                .filter((food) => food.id !== 99999)
                // create rows for each course of the meal
                .map((food) => {
                    // add nutrition values towards the total of currently iterated meal
                    energy += food.energy;
                    protein += food.protein;
                    carbs += food.carbs;
                    fat += food.fat;

                    return (
                        <RowWrapper
                            key={food.consumptionId}
                            food={food}
                            shownNutritionValue={props.shownNutritionValue}
                            addEntry={props.addEntry}
                            updateEntry={props.updateEntry}
                            removeEntry={props.removeEntry}
                            isModifiable={props.isModifiable}
                        />
                    );
                });

            rows.push(foodRows);
        }

        // show nutrition values in total for meal
        // if there is more than 2 courses on that meal
        if(meal.foods.length > 1) {
            if(props.viewportWidth <= 768) {
                rows.push(
                    <EntriesTotalRowCompact
                        key={i.toString()}
                        total={{energy, protein, carbs, fat}}
                        shownNutritionValue={props.shownNutritionValue}
                    />
                );
            } else {
                rows.push(
                    <EntriesTotalRow
                        key={i.toString()}
                        total={{energy, protein, carbs, fat}}
                    />
                );
            }

        }
    });


    return (
        <table className='entries__table'>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

EntriesTable.propTypes = {
    entries: PropTypes.array.isRequired,
    total: PropTypes.object.isRequired,
    shownNutritionValue: PropTypes.string,
    activeMeal: PropTypes.object,
    addEntry: PropTypes.func,
    removeEntry: PropTypes.func,
    updateEntry: PropTypes.func,
    changeActiveMeal: PropTypes.func,
    editMealName: PropTypes.func,
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired
};
