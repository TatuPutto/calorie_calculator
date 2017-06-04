import React from 'react';

export default function FoodListHeader(props) {
    var foodListHeader;
    var cn = 'food-list-header ' +
            (props.fetchMethod == 'haku' ? 'extra-height' : '');

    if(props.viewportWidth > 767) {
        foodListHeader = (
            <li className={cn}>
                <span>Elintarkive</span>
                <span>kcal</span>
                <span>P</span>
                <span>HH</span>
                <span>R</span>
            </li>
        );
    } else {
        foodListHeader = (
            <li className={cn}>
                <span>kcal</span>
                <span>P</span>
                <span>HH</span>
                <span>R</span>
            </li>
        );
    }

    return foodListHeader;
}
