import React from 'react';

export default function PortionSizes(props) {
    var portionSizes = props.portionSizes;
    var foodId = props.foodId;

    var portions = Object.keys(portionSizes).map((portion) => {
        var portionAmount = portionSizes[portion];

        return (
            <li
                key={portion}
                onClick={() => props.addToDiary(foodId, portionAmount)}
            >
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
