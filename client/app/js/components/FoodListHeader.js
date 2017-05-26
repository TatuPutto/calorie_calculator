import React from 'react';

export default function FoodListHeader(props) {
    return (
        <li className='food-list-header'>
            <span>Elintarkive <i className='fa fa-caret-down' /></span>
            <span>kcal / 100 g</span>
            <span>P / 100 g</span>
            <span>HH / 100 g</span>
            <span>R / 100 g</span>
        </li>
    );
}
