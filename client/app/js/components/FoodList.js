import React from 'react';
import PropTypes from 'prop-types';

import FoodListHeader from './FoodListHeader';
import FoodItem from './FoodItem';
import FoodItemCompactLayout from './FoodItemCompactLayout';

export default function FoodList(props) {
    var foods = [];
    var foodItems = [];

    if(props.viewportWidth > 768) {
        props.foods.forEach((food) => {
            foodItems.push(<FoodItem key={food.id} food={food} {...props} />);
        });
    } else {
        foods = props.foods.slice(0, (props.offset + 10));
        foods.forEach((food) => {
            foodItems.push(
                <FoodItemCompactLayout key={food.id} food={food} {...props} />
            );
        });
    }

    return (
        <div>
        {/*}{props.viewportWidth > 767 &&*/}
            <FoodListHeader viewportWidth={props.viewportWidth} />

        <ul className='food-list'>
            {foodItems}
        </ul>
        </div>
    );
}

FoodList.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    foods: PropTypes.array.isRequired,
    addToDiary: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    selectFood: PropTypes.func.isRequired,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    selectedFoodId: PropTypes.string,
    selectedFoodAmount: PropTypes.string
};
