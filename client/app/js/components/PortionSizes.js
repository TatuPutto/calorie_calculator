import React from 'react';

export default function PortionSizes({food, portionSizes, addEntry, viewportWidth}) {
    var portions = Object.keys(portionSizes).map((portion) => {
        var portionAmount = portionSizes[portion];

        if(viewportWidth < 768) {
            return (
                <option value={portionAmount}>
                    {portion} ({portionAmount} g)
                </option>
            );
        } else {
            return (
                <li key={portion} onClick={() => addEntry(food, portionAmount)}>
                    <a>{portion} ({portionAmount} g)</a>
                </li>
            );
        }

    });

    return (
        <div className='portion-sizes'>
            {viewportWidth < 768 ? (
                <select onChange={() => addEntry(food)}>
                    <option disabled selected>Annoskoot</option>
                    {portions}
                </select>
            ) : (
            <ul>
                {portions}
            </ul>
        )}
        </div>
    );
}
