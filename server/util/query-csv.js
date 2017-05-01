var round = require('./round-to-one-decimal');
var fs = require('fs');

var foodList = fs.readFileSync('foods.json', 'utf8');
foodList = JSON.parse(foodList);

function findMatchingFoodsFromCSV(input) {
    input = input.toLowerCase().trim();
    var matchingFoods = [];

    for(foodId in foodList) {
        var foodName = foodList[foodId].name.toLowerCase();
        var matchAt = foodName.indexOf(input);
        if(matchAt !== -1) {
            matchingFoods.push({
                matchAt: matchAt,
                id: foodId,
                name: foodName,
                energy: foodList[foodId].energy,
                protein: foodList[foodId].protein,
                fat: foodList[foodId].fat,
                carbs: foodList[foodId].carbohydrates
            });
        }
    }
    return sortAlphabeticallyAndByRelevance(matchingFoods);
}


function sortAlphabeticallyAndByRelevance(matchingFoods) {
    // sort alphabetically
    matchingFoods.sort();
    // sort by "relevance"
    matchingFoods.sort(function (foodA, foodB) {
        if(foodA.matchAt < foodB.matchAt) {
            return -1;
        } else if(foodA.matchAt > foodB.matchAt) {
            return 1;
        } else {
            return 0;
        }
    });
    return matchingFoods;
}


function calculateNutritionValues(consumedFoods) {
    var nutritionValues = [];

    for(var i = 0; i < consumedFoods.length; i++) {
        var food = consumedFoods[i];
        var foodName = foodList[food.id].name;
        var foodToCalc = foodList[food.id];
        var erergyIn100Grams = foodToCalc.energy;
        var proteinIn100Grams = foodToCalc.protein;
        var fatIn100Grams = foodToCalc.fat;
        var carbsIn100Grams = foodToCalc.carbohydrates;

        // calculate nutrition values in amount
        var energyInAmount = Math.round((erergyIn100Grams / 100) * food.amount);
        var proteinInAmount = round((proteinIn100Grams / 100) * food.amount);
        var fatnInAmount = round((fatIn100Grams / 100) * food.amount);
        var carbohydratesInAmount = round((carbsIn100Grams / 100) * food.amount);

        nutritionValues.push({
            amount: food.amount,
            id: food.id,
            name: foodName,
            energy: energyInAmount,
            protein: proteinInAmount,
            fat: fatnInAmount,
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
        protein: round(proteinInTotal),
        fat: round(fatInTotal),
        carbs: round(carbsInTotal)
    };
}

module.exports.getMatchingFoods = findMatchingFoodsFromCSV;
module.exports.calculateNutritionValues = calculateNutritionValues;
module.exports.calcTotalNutritionValues = calcTotalNutritionValues;
