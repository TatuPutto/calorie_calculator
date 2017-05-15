import React from 'react';

import AddToConsumedFoods from './AddToConsumedFoods';
import calculateDominantMacronutrient from '../util/calculate-dominant-macronutrient';

export default function SingleFood(props) {
    var food = props.food;
    var dominantMacro = calculateDominantMacronutrient(
        food.protein,
        food.carbs,
        food.fat
    );

    return (
        <li>
            <div
                key={food.id}
                className='single-food'
                onClick={() => props.selectFood(food.id, food.name)}
            >

            {props.viewportWidth < 768 &&
                <div style={{display: 'inline'}}>
                    <span className='energy-amount'>{food.energy} kcal</span>
                    <span className='protein-amount'>{food.protein} g</span>
                    <span className='carb-amount'>{food.carbs} g</span>
                    <span className='fat-amount'>{food.fat} g</span>
                    <br />
                </div>
            }

            <span className='food-selected-indicator-container'>
                <i className={props.selectedFoodId == food.id ?
                        'food-selected-indicator fa fa-chevron-right open' :
                        'food-selected-indicator fa fa-chevron-right closed'} />
            </span>

            <span className={'food-name ' + dominantMacro}>
                {food.name}
            </span>
            <span className='favorites'>
                <button
                    className='add-to-favorites'
                    onClick={food.favorite ? () => props.removeFromFavorites(food.id) : () => props.addToFavorites(food.id)}>
                    <i className={food.favorite ? 'fa fa-star' : 'fa fa-star-o'} />
                </button>
            </span>

            {props.viewportWidth > 768 &&
                <div style={{display: 'inline'}}>
                    <span className='energy-amount'>{food.energy} kcal</span>
                    <span className='protein-amount'>{food.protein} g</span>
                    <span className='carb-amount'>{food.carbs} g</span>
                    <span className='fat-amount'>{food.fat} g</span>
                </div>
            }

            </div>
            {props.selectedFoodId == food.id &&
                <AddToConsumedFoods
                    foodId={food.id}
                    portionSizes={food.portionSizes}
                    selectedFoodId={props.selectedFoodId}
                    selectedFoodAmount={props.selectedFoodAmount}
                    setSelectedFoodAmount={props.setSelectedFoodAmount}
                    addToDiary={props.addToDiary}
                />
            }

        </li>
    );
}
