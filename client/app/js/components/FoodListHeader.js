import React from 'react';

export default function FoodListHeader(props) {
    var foodListHeader;

    if(props.viewportWidth > 767) {
        foodListHeader = (
            <li className='food-list-header'>
                <span>Elintarkive <i className='fa fa-caret-down' /></span>
                <span>kcal / 100 g</span>
                <span>P / 100 g</span>
                <span>HH / 100 g</span>
                <span>R / 100 g</span>
            </li>
        );
    } else {
        foodListHeader = (
            <li className='food-list-header'>
                <span>kcal</span>
                <span>P</span>
                <span>HH</span>
                <span>R</span>
            </li>
        );
    }

    return foodListHeader;
}
