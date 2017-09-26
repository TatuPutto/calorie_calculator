import React from 'react';
import PropTypes from 'prop-types';


export default function EntriesTotalRowCompact({total, shownNutritionValue}) {
    var roundTo = (shownNutritionValue == 'energy') ? 0 : 1;

    return (
        <tr className='entries__total'>
            <td />
            <td className={shownNutritionValue}>
                {total[shownNutritionValue].toFixed(roundTo)}
            </td>
        </tr>
    );
}

EntriesTotalRowCompact.propTypes = {
    total: PropTypes.object.isRequired,
    shownNutritionValue: PropTypes.string.isRequired
};
