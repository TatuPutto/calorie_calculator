function updateValuesOnConsumedFoodRemove(consumptionId, consumedFoods, totalConsumption) {
    var indexToBeRemoved;
    var consumedFoodsAfterRemoval = consumedFoods.filter((consumedFood, i) => {
        if(consumedFood.consumptionId == consumptionId) {
            indexToBeRemoved = i;
        } else {
            return consumedFood;
        }
    });
    var removedFood = consumedFoods[indexToBeRemoved];

    totalConsumption.energy = Math.round(totalConsumption.energy - removedFood.energy);
    totalConsumption.protein = Math.round((totalConsumption.protein - removedFood.protein) * 10) / 10;
    totalConsumption.carbs = Math.round((totalConsumption.carbs - removedFood.carbs) * 10) / 10;
    totalConsumption.fat = Math.round((totalConsumption.fat - removedFood.fat) * 10) / 10;

    return {
        consumedFoods: consumedFoodsAfterRemoval,
        totalConsumption: totalConsumption
    };
}

export default updateValuesOnConsumedFoodRemove;
