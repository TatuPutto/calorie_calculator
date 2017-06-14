import React from 'react';

export default function PortionSizes(props) {
    var portionSizes = props.portionSizes;
    var foodId = props.foodId;

    var portions = Object.keys(portionSizes).map((portion) => {
        var portionAmount = portionSizes[portion];

        return (
            <li key={portion} onClick={() => props.addToDiary(foodId, portionAmount)}>
                <a>{portion} ({portionAmount} g)</a>
            </li>
        );
    });

    return (
        <ul className='portion-sizes'>
            {portions}
        </ul>
    );
}
