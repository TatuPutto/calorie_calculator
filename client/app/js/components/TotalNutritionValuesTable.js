import React from 'react';

export default function TotalNutritionValuesTable(props) {
    var total = props.totalConsumption;
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <table className='total-nutrition-values'>
            <tbody>
                <tr>
                    <td />
                    <td />
                    <td />
                    <td>
                        {total.energy} kcal
                    </td>
                    <td>
                        {total.protein} g<br />{proteinPercentage}%
                    </td>
                    <td>
                        {total.carbs} g<br />{carbPercentage}%
                    </td>
                    <td>
                        {total.fat} g<br />{fatPercentage}%
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
