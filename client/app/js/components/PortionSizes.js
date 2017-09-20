import React from 'react';

export default function PortionSizes({food, portionSizes, addEntry}) {
    var portions = Object.keys(portionSizes).map((portion) => {
        var portionAmount = portionSizes[portion];

        return (
            <li key={portion} onClick={() => addEntry(food, portionAmount)}>
                <a>{portion} ({portionAmount} g)</a>
            </li>
        );
    });

    return (
        <div className='portion-sizes'>
            <ul>
                {portions}
            </ul>
        </div>
    );
}
