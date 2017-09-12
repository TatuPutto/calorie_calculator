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
        var courses = [];

        results.forEach(function (row) {
            if(meals.indexOf(row.mealName) === -1) {
                meals.push(row.mealName);
            }

            //console.log(meals[0][row.mealName]);

            //console.log(index);

            //console.log(meals[]);

            courses.push(calcNutritionValues({
                consumptionId: row.consumptionId,
                id: row.foodId,
                amount: row.foodAmount,
                timeOfConsumption: row.timeOfConsumption
            }));
            courses[courses.length - 1]['mealId'] = row.mealId;
            courses[courses.length - 1]['mealName'] = row.mealName;
            //console.log(meals);
        });

        return [meals, courses];
    })
    .catch(function (err) {
        console.log(err);
    });
}
