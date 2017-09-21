import React from 'react';
import PropTypes from 'prop-types';

export default function TotalNutritionValuesTable(props) {
    var {totalConsumption: total, viewportWidth} = props;
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <tr className='consumed-foods-day-total'>
            <td colSpan={viewportWidth > 768 ? 2 : 1} />
            <td className='total-energy'>{total.energy} kcal</td>
            <td className='total-protein'>
                {Math.round(total.protein)} g
                <br />
                {proteinPercentage} %
            </td>
            <td className='total-carbs'>
                {Math.round(total.carbs)} g
                <br />
                {carbPercentage} %
            </td>
            <td className='total-fat'>
                {Math.round(total.fat)} g
                <br />
                {fatPercentage} %
            </td>
            <td />
        </tr>
    );
}

TotalNutritionValuesTable.propTypes = {
    totalConsumption: PropTypes.object.isRequired,
};
