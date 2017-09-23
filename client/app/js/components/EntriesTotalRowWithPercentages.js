import React from 'react';
import PropTypes from 'prop-types';

export default function TotalNutritionValuesTable({total, viewportWidth}) {
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <tr className='entries__total-with-percentages'>
            <td colSpan={viewportWidth > 768 ? 2 : null} />
            <td className='energy'>{total.energy} kcal</td>
            <td className='protein'>
                {total.protein} g
                <br />
                {proteinPercentage} %
            </td>
            <td className='carbs'>
                {total.carbs} g
                <br />
                {carbPercentage} %
            </td>
            <td className='fat'>
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
