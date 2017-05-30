import React from 'react';

export default function ConsumedFoodsTableHeader(props) {
    var theadRow = null;
    if(props.isModifiable) {
        theadRow = (
            <tr>
                <th colSpan={7}>Merkinnät</th>
            </tr>
        );
    } else {
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
    }

    return <thead>{theadRow}</thead>;
}
