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
                <span className={dominantMacro}>
                    <i className={props.selectedFoodId == food.id ?
                            'fa fa-chevron-down' : 'fa fa-chevron-right'} />
                        &nbsp;&nbsp;{food.name}
                </span>
                <span>{food.energy} kcal</span>
                <span>{food.protein} g</span>
                <span>{food.carbs} g</span>
                <span>{food.fat} g</span>
            </div>
            <AddToConsumedFoods
                foodId={food.id}
                selectedFoodId={props.selectedFoodId}
                selectedFoodAmount={props.selectedFoodAmount}
                setSelectedFoodAmount={props.setSelectedFoodAmount}
                addToFoodDiary={props.addToFoodDiary}
            />
        </li>
    );
}
