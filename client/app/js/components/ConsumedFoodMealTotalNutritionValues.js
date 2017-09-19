import React from 'react';
import PropTypes from 'prop-types';

export default function ConsumedFoodMealTotalNutritionValues({total}) {
    return (
        <tr className='consumed-foods-day-total'>
            <td colSpan={2} />
            <td>{Math.round(total.energy)} kcal</td>
            <td>{Math.round(total.protein)} g</td>
            <td>{Math.round(total.carbs)} g</td>
            <td>{Math.round(total.fat)} g</td>
            <td />
        </tr>
    );
}

ConsumedFoodMealTotalNutritionValues.propTypes = {
    total: PropTypes.object.isRequired,
};
