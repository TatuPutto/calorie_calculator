import React from 'react';
import PropTypes from 'prop-types';

export default function ConsumedFoodsTableHeader({isModifiable, viewportWidth}) {
    var theadRow = null;
    if(!isModifiable && viewportWidth > 767) {
        theadRow = (
            <tr>
                <th>Elintarvike</th>
                <th>Määrä</th>
                <th>kcal</th>
                <th>P</th>
                <th>HH</th>
                <th>R</th>
            </tr>
        );
    } else {
        theadRow = <tr><th colSpan={7}>Merkinnät</th></tr>;
    }

    return <thead>{theadRow}</thead>;
}

ConsumedFoodsTableHeader.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
};
