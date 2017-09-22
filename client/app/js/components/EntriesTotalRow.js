import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesTotalRow({total, viewportWidth}) {
    return (
        <tr className='consumed-foods-day-total'>
            <td colSpan={viewportWidth > 768 ? 2 : 1} />
            <td className='total-energy'>{Math.round(total.energy)} kcal</td>
            <td className='total-protein'>{Math.round(total.protein)} g</td>
            <td className='total-carbs'>{Math.round(total.carbs)} g</td>
            <td className='total-fat'>{Math.round(total.fat)} g</td>
            <td />
        </tr>
    );
}

EntriesTotalRow.propTypes = {
    total: PropTypes.object.isRequired,
    viewportWidth: PropTypes.number.isRequired
};
