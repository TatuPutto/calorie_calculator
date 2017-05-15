import React from 'react';

import AddToConsumedFoods from './AddToConsumedFoods';
import calculateDominantMacronutrient from '../util/calculate-dominant-macronutrient';

export default function SingleFood(props) {
    var {
        foodId: id,
        foodName: name,
        energyPer100Grams,
        proteinPer100Grams,
        carbPer100Grams,
        fatPer100Grams,
        favorite
    } = props.food;

    var dominantMacro = calculateDominantMacronutrient(
        proteinPer100Grams,
        carbPer100Grams,
        fatPer100Grams
    );

    return (
        <li>
            <div
                key={id}
                className='single-food'
                onClick={() => props.selectFood(id, name)}
                style={props.selectedFoodId == id ? {background: '#f9f7ff'} : null}
            >
                {props.viewportWidth < 768 &&
                    <div style={{display: 'inline'}}>
                        <span className='energy-amount'>{energyPer100Grams} kcal</span>
                        <span className='protein-amount'>{proteinPer100Grams} g</span>
                        <span className='carb-amount'>{carbPer100Grams} g</span>
                        <span className='fat-amount'>{fatPer100Grams} g</span>
                        <br />
                    </div>
                }

                {props.viewportWidth > 768 &&
                    <span className='food-selected-indicator-container'>
                        <i className={props.selectedFoodId == id ?
                                'food-selected-indicator fa fa-chevron-right open' :
                                'food-selected-indicator fa fa-chevron-right closed'} />
                    </span>
                }

                <span className={'food-name ' + dominantMacro}>
                    {name}
                </span>
                <span className='favorites'>
                    <button
                        className='add-to-favorites'
                        onClick={favorite ?
                                () => props.removeFromFavorites(id) :
                                () => props.addToFavorites(id)}
                        >
                        <i className={favorite ? 'fa fa-star' : 'fa fa-star-o'} />
                    </button>
                </span>

                {props.viewportWidth > 768 &&
                    <div style={{display: 'inline'}}>
                        <span className='energy-amount'>{energyPer100Grams} kcal</span>
                        <span className='protein-amount'>{proteinPer100Grams} g</span>
                        <span className='carb-amount'>{carbPer100Grams} g</span>
                        <span className='fat-amount'>{fatPer100Grams} g</span>
                    </div>
                }
            </div>
            {props.selectedFoodId == id &&
                <AddToConsumedFoods
                    foodId={id}
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
