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
        ORDER BY meals.mealId ASC
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

            // add course to meal
            meals[matchAtIndex].mealCourses.push({
                consumptionId: row.consumptionId,
                id: row.foodId,
                name: row.foodName,
                amount: row.foodAmount,
                energy: Math.round((row.energy / 100) * row.foodAmount),
                carbs: Math.round((row.carbs / 100) * row.foodAmount * 10) / 10,
                protein: Math.round((row.protein / 100) * row.foodAmount * 10) / 10,
                fat: Math.round((row.fat / 100) * row.foodAmount * 10) / 10
            });
        });

        return meals;
    })
    .catch(function (err) {
        console.log(err);
    });
}
