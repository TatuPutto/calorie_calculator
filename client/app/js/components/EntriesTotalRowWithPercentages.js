import React from 'react';
import PropTypes from 'prop-types';

export default function TotalNutritionValuesTable({total, viewportWidth}) {
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <tr className='consumed-foods-day-total'>
            <td colSpan={viewportWidth > 768 ? 2 : 1} />
            <td className='total-energy'>{total.energy} kcal</td>
            <td className='total-protein'>
                {total.protein} g
                <br />
                {proteinPercentage} %
            </td>
            <td className='total-carbs'>
                {total.carbs} g
                <br />
                {carbPercentage} %
            </td>
            <td className='total-fat'>
                {total.fat} g
                <br />
                {fatPercentage} %
            </td>
            <td />
        </tr>
    );
}

TotalNutritionValuesTable.propTypes = {
    total: PropTypes.object.isRequired,
    viewportWidth: PropTypes.number.isRequired,
};
