import React from 'react';
import PropTypes from 'prop-types';


export default function TotalNutritionValuesTable({total, viewportWidth}) {
    var protein = Math.round(total.protein);
    var carbs = Math.round(total.carbs);
    var fat = Math.round(total.fat);
    var macroTotal = protein + carbs + fat;
    var proteinPercentage = protein / macroTotal * 100;
    var carbPercentage = carbs / macroTotal * 100;
    var fatPercentage = fat / macroTotal * 100;

    // render total row for all the entries combined if there are atleast
    // two meals containing foods
    /*if(props.entries.length > 1) {
        var mealsWithFoods = 0;

        props.entries.forEach((meal) => {
            if(meal.foods.length > 0) mealsWithFoods++;
        });

        /*if(mealsWithFoods >= 2) {
            rows.push(
                <tr key='totalSeparator'>
                    <td className='entries__total-separator' colSpan={7}>
                        Yhteensä
                    </td>
                </tr>
            );
            rows.push(
                <EntriesTotalRowWithPercentages
                    key='totalConsumption'
                    total={props.total}
                    viewportWidth={props.viewportWidth}
                />
            );
        }*/
    //}


    return (
        <table>
            <tr>
                <td className='entries__total-separator' colSpan={7}>
                    Yhteensä
                </td>
            </tr>
            <tr className='entries__total-with-percentages'>
                <td colSpan={viewportWidth > 768 ? 2 : null} />
                <td className='energy'>{total.energy} kcal</td>
                <td className='protein'>
                    {Math.round(total.protein)} g
                    <br />
                    {proteinPercentage.toFixed(1)} %
                </td>
                <td className='carbs'>
                    {Math.round(total.carbs)} g
                    <br />
                    {carbPercentage.toFixed(1)} %
                </td>
                <td className='fat'>
                    {Math.round(total.fat)} g
                    <br />
                    {fatPercentage.toFixed(1)} %
                </td>
                <td />
            </tr>
        </table>
    );
}

TotalNutritionValuesTable.propTypes = {
    total: PropTypes.object.isRequired,
    viewportWidth: PropTypes.number.isRequired,
};
