import React from 'react';
import PropTypes from 'prop-types';

import AddToConsumedFoods from './AddToConsumedFoods';
import calculateDominantMacronutrient from '../util/calculate-dominant-macronutrient';

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
    var dominantMacro = calculateDominantMacronutrient(protein, carbs, fat);

    return (
        <li>
            <div
                key={id}
                onClick={() => selectFood(id, name)}
                style={{background: selectedFoodId == id ? '#e8f2ff' : '#fff'}}
            >
                <span className='food-selected-indicator-container'>
                    <i className={selectedFoodId == id ?
                            'food-selected-indicator fa fa-chevron-right open'
                            :
                            'food-selected-indicator fa fa-chevron-right closed'
                        }
                    />
                </span>
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
                <div style={{display: 'inline'}}>
                    <span className='energy-amount'>{energy} kcal</span>
                    <span className='protein-amount'>{protein} g</span>
                    <span className='carb-amount'>{carbs} g</span>
                    <span className='fat-amount'>{fat} g</span>
                </div>
            </div>
            {selectedFoodId == id &&
                <AddToConsumedFoods {...props} includeNutritionValues={false} />
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