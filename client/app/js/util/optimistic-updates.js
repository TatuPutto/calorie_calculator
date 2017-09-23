function updateValuesOnAddition(food, newAmount, activeMealId, entries, total) {
    var oldAmount = food.amount || 100;
    var energyInAmount = food.energy;
    var proteinInAmount = food.protein;
    var carbsInAmount = food.carbs;
    var fatInAmount = food.fat;

    if(oldAmount !== newAmount) {
        energyInAmount = energyInAmount / oldAmount * newAmount;
        proteinInAmount = proteinInAmount / oldAmount * newAmount;
        carbsInAmount = carbsInAmount / oldAmount * newAmount;
        fatInAmount = fatInAmount / oldAmount * newAmount;
    }

    var foodToAdd = {};
    foodToAdd['consumptionId'] = new Date().getTime().toString();
    foodToAdd['id'] = food.id;
    foodToAdd['name'] = food.name;
    foodToAdd['amount'] = newAmount;
    foodToAdd['energy'] = Math.round(energyInAmount);
    foodToAdd['protein'] = Math.roundToOneDecimal(proteinInAmount);
    foodToAdd['carbs'] = Math.roundToOneDecimal(carbsInAmount);
    foodToAdd['fat'] = Math.roundToOneDecimal(fatInAmount);

    total.energy = Math.round(total.energy + energyInAmount);
    total.protein = Math.roundToOneDecimal(total.protein + proteinInAmount);
    total.carbs = Math.roundToOneDecimal(total.carbs + carbsInAmount);
    total.fat = Math.roundToOneDecimal(total.fat + fatInAmount);

    for(var i = 0; i < entries.length; i++) {
        if(entries[i].id == activeMealId) {
            entries[i].foods.push(foodToAdd);
            break;
        }
    }

    return {entries, total, consumptionId: foodToAdd.consumptionId};
}

function updateValuesOnRemove(foodToRemove, entries, total) {
    for(var i = 0; i < entries.length; i++) {
        var foods = entries[i].foods;
        for(var j = 0; j < foods.length; j++) {
            if(foods[j].consumptionId === foodToRemove.consumptionId) {
                entries[i].foods.splice(j, 1);
            }
        }
    }

    total.energy = Math.round(total.energy - foodToRemove.energy);
    total.protein = Math.roundToOneDecimal(total.protein - foodToRemove.protein);
    total.carbs = Math.roundToOneDecimal(total.carbs - foodToRemove.carbs);
    total.fat = Math.roundToOneDecimal(total.fat - foodToRemove.fat);

    return {entries, total};
}


export {updateValuesOnAddition, updateValuesOnRemove};
