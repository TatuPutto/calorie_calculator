function updateValuesOnConsumedFoodAddition(foodId, foodAmount, foods, consumedFoods, totalConsumption) {
    var addedFood = foods.filter((food) => food.id == foodId)[0];
    var energyInAmount = addedFood.energy / 100 * foodAmount;
    var proteinInAmount = addedFood.protein / 100 * foodAmount;
    var carbsInAmount = addedFood.carbs / 100 * foodAmount;
    var fatInAmount = addedFood.fat / 100 * foodAmount;

    addedFood.energy = Math.round(energyInAmount);
    addedFood.protein = Math.round(proteinInAmount * 10) / 10;
    addedFood.carbs = Math.round(carbsInAmount * 10) / 10;
    addedFood.fat = Math.round(fatInAmount * 10) / 10;

    addedFood['consumptionId'] = new Date().getTime().toString();
    addedFood['amount'] = foodAmount;
    consumedFoods.push(addedFood);

    totalConsumption.energy = Math.round(totalConsumption.energy + energyInAmount);
    totalConsumption.protein = Math.round((totalConsumption.protein + proteinInAmount) * 10) / 10;
    totalConsumption.carbs = Math.round((totalConsumption.carbs + carbsInAmount) * 10) / 10;
    totalConsumption.fat = Math.round((totalConsumption.fat + fatInAmount) * 10) / 10;

    return {consumedFoods, totalConsumption};
}

export default updateValuesOnConsumedFoodAddition;
