var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-json').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-json').calcTotalNutritionValues;

module.exports = function selectEntriesFromToday(userId) {
    var query = `
        SELECT meals.mealId, meals.mealName, consumedFoods.*
        FROM meals, consumedFoods
        WHERE meals.mealId = consumedFoods.mealId
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
        //console.log(results);
        var meals = [];
        var latestMeal;

        results.forEach(function (row) {
            // find all the different types of meals in results
            if(row.mealName != latestMeal) {
                meals.push({
                    mealId: row.mealId,
                    mealName: row.mealName,
                    mealCourses: []
                });

                latestMeal = row.mealName;
            }

            var matchAtIndex = meals.findIndex(function (meal) {
                return meal.mealId === row.mealId;
            })

            meals[matchAtIndex].mealCourses.push(calcNutritionValues({
                consumptionId: row.consumptionId,
                id: row.foodId,
                amount: row.foodAmount,
                timeOfConsumption: row.timeOfConsumption
            }));
        });

        return meals;
    })
    .catch(function (err) {
        console.log(err);
    });
}
