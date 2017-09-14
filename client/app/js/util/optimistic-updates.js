var foods = require('../../../../foods.json');

function updateValuesOnAddition(foodId, foodAmount, activeMealId, consumedFoods, total) {
    var foodToAdd = foods[foodId];
    var energyInAmount = foodToAdd.energy / 100 * foodAmount;
    var proteinInAmount = foodToAdd.protein / 100 * foodAmount;
    var carbsInAmount = foodToAdd.carbs / 100 * foodAmount;
    var fatInAmount = foodToAdd.fat / 100 * foodAmount;

    foodToAdd.energy = Math.round(energyInAmount);
    foodToAdd.protein = Math.roundToOneDecimal(proteinInAmount);
    foodToAdd.carbs = Math.roundToOneDecimal(carbsInAmount);
    foodToAdd.fat = Math.roundToOneDecimal(fatInAmount);
    foodToAdd['consumptionId'] = new Date().getTime().toString();
    foodToAdd['id'] = foodId;
    foodToAdd['amount'] = foodAmount;

    total.energy = Math.round(total.energy + energyInAmount);
    total.protein = Math.roundToOneDecimal(total.protein + proteinInAmount);
    total.carbs = Math.roundToOneDecimal(total.carbs + carbsInAmount);
    total.fat = Math.roundToOneDecimal(total.fat + fatInAmount);

    for(var i = 0; i < consumedFoods.length; i++) {
        if(consumedFoods[i].mealId == activeMealId) {
            consumedFoods[i].mealCourses.push(foodToAdd);
            break;
        }
    }

    return {
        consumedFoods,
        totalConsumption: total,
        consumptionId: foodToAdd['consumptionId']
    };
}

function updateValuesOnRemove(consumptionId, foodId, activeMealId, consumedFoods, total) {
    var foodToRemove = foods[foodId];

    for(var i = 0; i < consumedFoods.length; i++) {
        if(consumedFoods[i].mealId == activeMealId) {
            consumedFoods[i].mealCourses = consumedFoods[i].mealCourses.filter((course) => {
                return course.consumptionId !== consumptionId;
            });
            break;
        }
    }

    total.energy = Math.round(total.energy - foodToRemove.energy);
    total.protein = Math.roundToOneDecimal(total.protein - foodToRemove.protein);
    total.carbs = Math.roundToOneDecimal(total.carbs - foodToRemove.carbs);
    total.fat = Math.roundToOneDecimal(total.fat - foodToRemove.fat);

    return {consumedFoods, totalConsumption: total};
}


export {updateValuesOnAddition, updateValuesOnRemove};
