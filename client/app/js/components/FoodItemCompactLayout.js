import React from 'react';

import AddToConsumedFoods from './AddToConsumedFoods';
import calculateDominantMacronutrient from '../util/calculate-dominant-macronutrient';

export default function FoodItemCompactLayout(props) {
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
        protein,
        carbs,
        fat,
        favorite : isInfavorites,
    } = food;
    var dominantMacro = calculateDominantMacronutrient(protein, carbs, fat);

    return (
        <li>
            <div
                key={id}
                onClick={() => selectFood(id, name)}
                style={{background: selectedFoodId == id ? '#e8f2ff' : '#fff'}}
            >
                <span className={'food-name ' + dominantMacro}>{name}</span>
                <span className='favorites'>
                    <button
                        className='add-to-favorites'
                        onClick={isInfavorites ?
                            () => removeFromFavorites(id) :
                            () => addToFavorites(id)}
                    >
                        <i className={isInfavorites ? 'fa fa-star' : 'fa fa-star-o'} />
                    </button>
                </span>
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} includeNutritionValues={true} />
            }
        </li>
    );
}
