import React from 'react';
import PropTypes from 'prop-types';

export default function TotalNutritionValuesTable({totalConsumption: total}) {
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <tr className='consumed-foods-day-total'>
            <td colSpan={2} />
            <td>{total.energy} kcal</td>
            <td>
                {total.protein} g
                <br />
                {proteinPercentage}%
            </td>
            <td>
                {total.carbs} g
                <br />
                {carbPercentage}%
            </td>
            <td>
                {total.fat} g
                <br />
                {fatPercentage}%
            </td>
            <td />
        </tr>
    );
}

TotalNutritionValuesTable.propTypes = {
    totalConsumption: PropTypes.object.isRequired,
};
