import React from 'react';

export default function TotalConsumption(props) {
    var total = props.totalConsumption;

    return (
        <tr style={{border: 'none', borderTop: '3px solid #d6dcf8'}}>
            <td style={{border: 'none'}} />
            <td style={{border: 'none'}} />
            <td style={{border: 'none'}} />
            <td style={{border: 'none', color: '#f6a000'}}>
                {total.energy} kcal
            </td>
            <td style={{border: 'none', color: '#0fb70f'}}>
                {total.protein} g
            </td>
            <td style={{border: 'none', color: '#207eff'}}>
                {total.carbs} g
            </td>
            <td style={{border: 'none', color: '#fa6b6b'}}>
                {total.fat} g
            </td>
        </tr>
    );
}
