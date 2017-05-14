import React from 'react';
import PropTypes from 'prop-types';

import SingleFood from './SingleFood';

export default function FoodList(props) {
    var foods = [];
    if(props.viewportWidth < 768) {
        foods = props.foods.slice(0, (props.offset + 10));
    } else {
        foods = props.foods;
    }

    return (
        <ul className='food-list'>
            {foods.map(function (food) {
                return (
                    <SingleFood
                        key={food.id}
                        viewportWidth={props.viewportWidth}
                        food={food}
                        selectFood={props.selectFood}
                        setSelectedFoodAmount={props.setSelectedFoodAmount}
                        selectedFoodId={props.selectedFoodId}
                        selectedFoodAmount={props.selectedFoodAmount}
                        addToDiary={props.addToDiary}
                        addToFavorites={props.addToFavorites}
                        removeFromFavorites={props.removeFromFavorites}
                    />
                );
            })}
        </ul>
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
    selectedFoodId: PropTypes.number,
    selectedFoodAmount: PropTypes.string
};
