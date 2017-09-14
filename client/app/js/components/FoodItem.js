import React from 'react';
import PropTypes from 'prop-types';

import AddToConsumedFoods from './AddToConsumedFoods';
import calcDominantMacro from '../util/calculate-dominant-macronutrient';

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

    var favoriteToggleFunction = isInFavorites ?
            removeFromFavorites : addToFavorites;
    var selectedIndicatorClass = 'food-selected-indicator fa fa-caret-right ' +
            (selectedFoodId == id ? 'open' : 'closed')
    var dominantMacro = calcDominantMacro(protein, carbs, fat);
    var proteinClass = 'food-protein-amount ' +
            (dominantMacro == 'protein' ? 'dominant' : '');
    var carbClass = 'food-carb-amount ' +
            (dominantMacro == 'carb' ? 'dominant' : '');
    var fatClass = 'food-fat-amount ' +
            (dominantMacro == 'fat' ? 'dominant' : '');

    return (
        <li className='food-item'>
            <div
                key={id}
                onClick={() => selectFood(id, name)}
                style={{background: selectedFoodId == id ? '#e8f2ff' : ''}}
            >
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
                <span className={proteinClass}>{protein} g</span>
                <span className={carbClass}>{carbs} g</span>
                <span className={fatClass}>{fat} g</span>
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} />
            }
        </li>
    );
}

FoodItem.propTypes = {
    food: PropTypes.object.isRequired,
    selectedFoodId: PropTypes.string,
    selectFood: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
};
