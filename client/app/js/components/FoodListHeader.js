import React from 'react';

export default function FoodListHeader(props) {
    var foodListHeader;
    var cn = 'food-list-header ' +
            (props.fetchMethod == 'search' ? 'extra-height' : '');

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
        if(props.fetchMethod == 'search') {
            foodListHeader = (
                <li className={cn}>
                    {/*}<span>kcal</span>
                    <span>P</span>
                    <span>HH</span>
                    <span>R</span>*/}
                </li>
            );
        } else {
            foodListHeader = null;
        }
    }

    return foodListHeader;
}
