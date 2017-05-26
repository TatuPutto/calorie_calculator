import React from 'react';

export default function TotalConsumption(props) {
    var total = props.totalConsumption;
    var macroTotal = total.protein + total.carbs + total.fat;
    var proteinPercentage = Math.round(total.protein / macroTotal * 100);
    var carbPercentage = Math.round(total.carbs / macroTotal * 100);
    var fatPercentage = Math.round(total.fat / macroTotal * 100);

    return (
        <tr style={{border: 'none', borderTop: '3px solid #d6dcf8'}}>
            <td style={{border: 'none'}} />
            <td style={{border: 'none'}} />
            <td style={{border: 'none'}} />
            <td style={{border: 'none'}} />
            <td style={{border: 'none', color: '#0fb70f'}}>
                {proteinPercentage} %
            </td>
            <td style={{border: 'none', color: '#207eff'}}>
                {carbPercentage} %
            </td>
            <td style={{border: 'none', color: '#fa6b6b'}}>
                {fatPercentage} %
            </td>
        </tr>
    );
}
