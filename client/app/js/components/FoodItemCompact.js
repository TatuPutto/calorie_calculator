import React from 'react';

import AddToConsumedFoods from './AddToConsumedFoods';
import calcDominantMacro from '../util/calculate-dominant-macronutrient';

export default function FoodItemCompact(props) {
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
        isInFavorites
    } = food;
    var favoriteToggleFunction = isInFavorites ? removeFromFavorites : addToFavorites;
    var liClass = 'food-item ' + (selectedFoodId == id ? 'selected' : '');
    var selectedIndicatorClass = 'food-selected-indicator fa fa-caret-right ' +
            (selectedFoodId == id ? 'open' : 'closed')

    return (
        <li id={id} className={liClass}>
            <div onClick={() => selectFood(id, name)}>
                <span className='food-name'>{name}</span>
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} />
            }
        </li>
    );
}
