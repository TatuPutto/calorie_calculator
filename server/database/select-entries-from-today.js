var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-json').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-json').calcTotalNutritionValues;

module.exports = function selectEntriesFromToday(userId) {
    var query = `
        SELECT meals.mealId, meals.mealName,
        consumedFoods.consumptionId, consumedFoods.foodAmount,
        foods.foodId, foods.foodName, foods.energy,
        foods.protein, foods.carbs, foods.fat
        FROM meals, consumedFoods, foods
        WHERE meals.mealId = consumedFoods.mealId
        AND consumedFoods.foodId = foods.foodId
        AND meals.userId = ? AND active = 1
        AND meals.timeOfConsumption >= CURDATE()
        AND meals.timeOfConsumption < CURDATE() + INTERVAL 1 DAY
        ORDER BY meals.mealId, consumedFoods.timeOfConsumption
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    })
    .then(function (results) {
        var energyInTotal = 0;
        var proteinInTotal = 0;
        var carbsInTotal = 0;
        var fatInTotal = 0;
        var meals = [];
        var latestMeal;


        results.forEach(function (row) {
            // find all the different types of meals in results
            if(row.mealName != latestMeal) {
                latestMeal = row.mealName;
                meals.push({
                    mealId: row.mealId,
                    mealName: row.mealName,
                    mealCourses: []
                });
            }

            // skip placeholders
            if(row.foodId === 99999) return;

            var matchAtIndex = meals.findIndex(function (meal) {
                return meal.mealId === row.mealId;
            });

            var energyInAmount = Math.round((row.energy / 100) * row.foodAmount);
            var proteinInAmount = Math.round((row.protein / 100) * row.foodAmount * 10) / 10;
            var carbsInAmount = Math.round((row.carbs / 100) * row.foodAmount * 10) / 10;
            var fatInAmount = Math.round((row.fat / 100) * row.foodAmount * 10) / 10;

            // add course to meal
            meals[matchAtIndex].mealCourses.push({
                consumptionId: row.consumptionId,
                id: row.foodId,
                name: row.foodName,
                amount: row.foodAmount,
                energy: energyInAmount,
                protein: proteinInAmount,
                carbs: carbsInAmount,
                fat: fatInAmount
            });

            // add row values towards the total
            energyInTotal += energyInAmount;
            proteinInTotal += proteinInAmount;
            carbsInTotal += carbsInAmount;
            fatInTotal += fatInAmount;
        });

        var nutritionValuesInTotal = {
            energy: energyInTotal,
            protein: proteinInTotal,
            carbs: carbsInTotal,
            fat: fatInTotal
        };

        return {meals, nutritionValuesInTotal};
    })
    .catch(function (err) {
        console.log(err);
    });
}
