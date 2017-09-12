var fs = require('fs');
var findIndexOfObjectId = require('./find-index-of-object-id');
var foodList = JSON.parse(fs.readFileSync('foods-with-portion-sizes.json', 'utf8'));

function findMatchingFoodsByName(input) {
    var matchingFoods = [];
    input = input.toLowerCase().trim();

    for(foodId in foodList) {
        var food = foodList[foodId];
        var name = food.name.toLowerCase();
        var matchAt = name.indexOf(input);

        if(matchAt !== -1) {
            matchingFoods.push({
                matchAt: matchAt,
                favorite: false,
                id: foodId,
                name: name,
                energy: food.energy,
                protein: food.protein,
                fat: food.fat,
                carbs: food.carbohydrates,
                portionSizes: food.portionSizes
            });
        }
    }

    return sortAlphabeticallyAndByRelevance(matchingFoods).slice(0, 100);
}

function sortAlphabeticallyAndByRelevance(matchingFoods) {
    // sort by "relevance"
    matchingFoods.sort(function (foodA, foodB) {
        if(foodA.matchAt > foodB.matchAt) {
            return 1;
        } else if(foodA.matchAt < foodB.matchAt) {
            return -1;
        } else {
            // sort alphabetically
            if(foodA > foodB) {
                return 1;
            } else {
                return -1;
            }
            return 0;
        }
    });
    return matchingFoods;
}

function findMatchingFoodsByIds(ids) {
    var matchingFoods = [];

    for(var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var food = foodList[id];

        if(findIndexOfObjectId(id, matchingFoods) === -1) {
            matchingFoods.push({
                favorite: false,
                id: id,
                name: food.name,
                energy: food.energy,
                protein: food.protein,
                fat: food.fat,
                carbs: food.carbohydrates,
                portionSizes: food.portionSizes
            });
        }
    }

    return matchingFoods.sort();
}


function calculateNutritionValues1(consumedFoodItem) {
    var foodToCalc = foodList[consumedFoodItem.id];
    var erergyIn100Grams = foodToCalc.energy;
    var proteinIn100Grams = foodToCalc.protein;
    var fatIn100Grams = foodToCalc.fat;
    var carbsIn100Grams = foodToCalc.carbohydrates;
    consumedFoodItem['name'] = foodToCalc.name;
    consumedFoodItem['energy'] = Math.round((erergyIn100Grams / 100) * consumedFoodItem.amount),
    consumedFoodItem['protein'] = Math.round((proteinIn100Grams / 100) * consumedFoodItem.amount);
    consumedFoodItem['carbs'] = Math.round((carbsIn100Grams / 100) * consumedFoodItem.amount);
    consumedFoodItem['fat'] = Math.round((fatIn100Grams / 100) * consumedFoodItem.amount);
    
    return consumedFoodItem;
    // var energyInAmount = Math.round((erergyIn100Grams / 100) * consumedFoodItem.amount);
    // var proteinInAmount = Math.round((proteinIn100Grams / 100) * consumedFoodItem.amount);
    // var carbohydratesInAmount = Math.round((carbsIn100Grams / 100) * consumedFoodItem.amount);
    // var fatInAmount = Math.round((fatIn100Grams / 100) * consumedFoodItem.amount);


}

function calculateNutritionValues(consumedFoods) {
    var nutritionValues = [];

    for(var i = 0; i < consumedFoods.length; i++) {
        var food = consumedFoods[i];
        var foodName = foodList[food.id].name;
        var timeOfConsumption = food.timeOfConsumption;
        var foodToCalc = foodList[food.id];
        var erergyIn100Grams = foodToCalc.energy;
        var proteinIn100Grams = foodToCalc.protein;
        var fatIn100Grams = foodToCalc.fat;
        var carbsIn100Grams = foodToCalc.carbohydrates;

        // calculate nutrition values in amount
        var energyInAmount = Math.round((erergyIn100Grams / 100) * food.amount);
        var proteinInAmount = Math.round((proteinIn100Grams / 100) * food.amount);
        var carbohydratesInAmount = Math.round((carbsIn100Grams / 100) * food.amount);
        var fatInAmount = Math.round((fatIn100Grams / 100) * food.amount);

        nutritionValues.push({
            consumptionId: food.consumptionId,
            amount: food.amount,
            timeOfConsumption: food.timeOfConsumption.toString(),
            id: food.id,
            name: foodName,
            energy: energyInAmount,
            protein: proteinInAmount,
            fat: fatInAmount,
            carbs: carbohydratesInAmount
        });
    }

    return nutritionValues;
}

function calcTotalNutritionValues(nutritionValuesPerItem) {
    var energyInTotal = 0;
    var proteinInTotal = 0;
    var fatInTotal = 0;
    var carbsInTotal = 0;

    for(var i = 0; i < nutritionValuesPerItem.length; i++) {
        var item = nutritionValuesPerItem[i];
        energyInTotal += +item.energy;
        proteinInTotal += +item.protein;
        fatInTotal += +item.fat;
        carbsInTotal += +item.carbs;
    }

    return {
        energy: Math.round(energyInTotal),
        protein: Math.round(proteinInTotal * 10) / 10,
        fat: Math.round(fatInTotal * 10) / 10,
        carbs: Math.round(carbsInTotal * 10) / 10
    };
}

module.exports.findMatchingFoodsByName = findMatchingFoodsByName;
module.exports.findMatchingFoodsByIds = findMatchingFoodsByIds;
module.exports.calculateNutritionValues = calculateNutritionValues1;
module.exports.calcTotalNutritionValues = calcTotalNutritionValues;
