function updateValuesOnConsumedFoodRemove(consumptionId, consumedFoods, totalConsumption) {
    var index = consumedFoods.findIndex((consumedFood) => consumedFood.consumptionId == consumptionId);
    var removedFood = consumedFoods.splice(index, 1)[0];

    totalConsumption.energy = Math.round(totalConsumption.energy - removedFood.energy);
    totalConsumption.protein = Math.round((totalConsumption.protein - removedFood.protein) * 10) / 10;
    totalConsumption.carbs = Math.round((totalConsumption.carbs - removedFood.carbs) * 10) / 10;
    totalConsumption.fat = Math.round((totalConsumption.fat - removedFood.fat) * 10) / 10;

    return {consumedFoods, totalConsumption};
}

export default updateValuesOnConsumedFoodRemove;
