function updateValuesOnConsumedFoodAddition(foodId, foodAmount, activeMealId, activeMealName, foods, consumedCourses, totalConsumption) {
    var addedFood = foods.filter((food) => food.id == foodId)[0];
    var energyInAmount = addedFood.energy / 100 * foodAmount;
    var proteinInAmount = addedFood.protein / 100 * foodAmount;
    var carbsInAmount = addedFood.carbs / 100 * foodAmount;
    var fatInAmount = addedFood.fat / 100 * foodAmount;

    addedFood.energy = Math.round(energyInAmount);
    addedFood.protein = Math.roundToOneDecimal(proteinInAmount);
    addedFood.carbs = Math.roundToOneDecimal(carbsInAmount);
    addedFood.fat = Math.roundToOneDecimal(fatInAmount);

    addedFood['consumptionId'] = new Date().getTime().toString();
    addedFood['amount'] = foodAmount;
    addedFood['mealId'] = activeMealId;
    addedFood['mealName'] = activeMealName;
    addedFood['latelyConsumed'] = true;
    consumedCourses.push(addedFood);

    consumedCourses.sort((a, b) => {
        if(a.mealId > b.mealId) {
            return 1;
        } else if(a.mealId < b.mealId) {
            return -1;
        } else {
            return 0;
        }
    });

    /*totalConsumption.energy = Math.round(totalConsumption.energy + energyInAmount);
    totalConsumption.protein = Math.round((totalConsumption.protein + proteinInAmount) * 10) / 10;
    totalConsumption.carbs = Math.round((totalConsumption.carbs + carbsInAmount) * 10) / 10;
    totalConsumption.fat = Math.round((totalConsumption.fat + fatInAmount) * 10) / 10;*/

    return {consumedCourses, totalConsumption};
}

export default updateValuesOnConsumedFoodAddition;
