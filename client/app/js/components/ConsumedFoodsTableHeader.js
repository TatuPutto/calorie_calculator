import React from 'react';

export default function ConsumedFoodsTableHeader(props) {
    var theadRow = null;
    if(props.viewportWidth < 768) {
        theadRow = (
            <tr>
                <th style={{textAlign: 'center', fontSize: '14px'}}>
                    Merkinnät
                </th>
            </tr>
        );
    } else if(props.viewportWidth > 768 && props.isModifiable) {
        theadRow = (
            <tr>
                <th></th>
                <th style={{paddingLeft: '3%'}}>Elintarvike</th>
                <th>Määrä</th>
                <th>kcal</th>
                <th>P</th>
                <th>HH</th>
                <th>R</th>
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
