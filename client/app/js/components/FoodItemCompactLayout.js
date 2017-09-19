import React from 'react';

import AddToConsumedFoods from './AddToConsumedFoods';
import calcDominantMacro from '../util/calculate-dominant-macronutrient';

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
        energy,
        protein,
        carbs,
        fat,
        isInFavorites,
    } = food;

    var favoriteToggleFunction = isInFavorites ?
            removeFromFavorites : addToFavorites;
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
                style={{background: selectedFoodId == id ? '#e8f2ff' : '#fff'}}
            >
                {/*<span className='food-name-wrapper' style={{height: '40px'}}>*/}
                <span className='food-name'>{name}</span>
                {/*</span>*/}
                {/*<span className='food-favorite-status'>
                    <button
                        className='food-add-to-favorites'
                        onClick={() => favoriteToggleFunction(id)}
                    >
                        <i className={isInFavorites ? 'fa fa-star' : 'fa fa-star-o'} />
                    </button>
                </span>*/}
                <span className='food-energy-amount'>{energy}</span>
                {/*}<span className={proteinClass}>{protein} g</span>
                <span className={carbClass}>{carbs} g</span>
                <span className={fatClass}>{fat} g</span>*/}
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} />
            }
        </li>
    );
}
