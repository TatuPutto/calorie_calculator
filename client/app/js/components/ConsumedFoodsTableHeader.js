import React from 'react';
import PropTypes from 'prop-types';

export default function ConsumedFoodsTableHeader({isModifiable, viewportWidth}) {
    var theadRow = null;

    if(viewportWidth > 767) {
        theadRow = (
            <tr>
                <th colSpan={isModifiable ? 2 : null}>Elintarvike</th>
                <th>Määrä</th>
                <th>kcal</th>
                <th>P</th>
                <th>HH</th>
                <th>R</th>
            </tr>
        );
    } else {
        //theadRow = <tr><th colSpan={7}>Merkinnät</th></tr>;
        theadRow = (
            <tr>
                <td style={{margin: 0, width: '20%', lineHeight: '24px'}}>Määrä</td>
                <td style={{margin: 0, width: '20%', lineHeight: '24px'}}>kcal</td>
                <td style={{margin: 0, width: '20%', lineHeight: '24px'}}>P</td>
                <td style={{margin: 0, width: '20%', lineHeight: '24px'}}>HH</td>
                <td style={{margin: 0, width: '20%', lineHeight: '24px'}}>R</td>

            </tr>
        );
    }

    return <thead>{theadRow}</thead>;
}

ConsumedFoodsTableHeader.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
};
