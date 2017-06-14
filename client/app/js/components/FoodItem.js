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
        favorite : isInfavorites,
    } = food;
    var dominantMacro = calcDominantMacro(protein, carbs, fat);

    return (
        <li>
            <div
                key={id}
                onClick={() => selectFood(id, name)}
                style={{background: selectedFoodId == id ? '#e8f2ff' : '#fff'}}
            >
                <span className='food-selected-indicator-container'>
                    <i className={selectedFoodId == id ?
                            'food-selected-indicator fa fa-caret-right open'
                            :
                            'food-selected-indicator fa fa-caret-right closed'
                        }
                    />
                </span>
                <span className='food-name'>{name}</span>
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
                <span className='energy-amount'>{energy} kcal</span>
                <span className={'protein-amount ' + (dominantMacro == 'protein' ? dominantMacro : '')}>
                    {protein} g
                </span>
                <span className={'carb-amount ' + (dominantMacro == 'carb' ? dominantMacro : '')}>
                    {carbs} g
                </span>
                <span className={'fat-amount ' + (dominantMacro == 'fat' ? dominantMacro : '')}>
                    {fat} g
                </span>
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
