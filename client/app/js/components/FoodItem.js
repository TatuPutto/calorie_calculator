import React from 'react';
import PropTypes from 'prop-types';

import AddToConsumedFoods from './AddToConsumedFoods';

export default function FoodItem(props) {
    var {
        food,
        selectedFoodId,
        selectFood,
        addToFavorites,
        removeFromFavorites
    } = props;
    var {
        id,
        name,
        energy,
        protein,
        carbs,
        fat,
        isInFavorites
    } = food;
    var favoriteToggleFunction = isInFavorites ? removeFromFavorites : addToFavorites;
    var liClass = 'food-item ' + (selectedFoodId == id ? 'selected' : '');
    var selectedIndicatorClass = 'food-selected-indicator fa fa-caret-right ' +
            (selectedFoodId == id ? 'open' : 'closed')

    return (
        <li id={id} className={liClass} onClick={() => selectFood(id, name)}>
            <span className='food-selected-indicator-container'>
                <i className={selectedIndicatorClass} />
            </span>
            <span className='food-name'>{name}</span>
            <span className='food-favorite-status'>
                <button
                    className='food-add-to-favorites'
                    onClick={() => favoriteToggleFunction(id)}
                >
                    <i className={isInFavorites ? 'fa fa-star' : 'fa fa-star-o'} />
                </button>
            </span>
            <span className='food-energy-amount'>{energy} kcal</span>
            <span className='food-protein-amount'>{protein} g</span>
            <span className='food-carb-amount'>{carbs} g</span>
            <span className='food-fat-amount'>{fat} g</span>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} />
            }
        </li>
    );
}

FoodItem.propTypes = {
    food: PropTypes.object.isRequired,
    selectedFoodId: PropTypes.number,
    selectFood: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
};
