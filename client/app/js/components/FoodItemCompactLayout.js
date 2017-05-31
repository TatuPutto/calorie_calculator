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
        energy,
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
                <span className='food-name-wrapper' style={{height: '40px'}}>
                <span className={'food-name'}>{name}</span>
                </span>
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
                <span className='energy-amount'>{energy}</span>
                <span className={'protein-amount ' + (dominantMacro == 'protein-dominant' ? dominantMacro : '')}>{protein}</span>
                <span className={'carb-amount ' + (dominantMacro == 'carb-dominant' ? dominantMacro : '')}>{carbs}</span>
                <span className={'fat-amount ' + (dominantMacro == 'fat-dominant' ? dominantMacro : '')}>{fat}</span>
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} />
            }
        </li>
    );
}
