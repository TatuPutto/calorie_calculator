var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;

module.exports = function getPast7Days(userId) {
    var query = 'SELECT consumptionId, foodId, foodAmount, ' +
            'DATE_FORMAT(timeOfConsumption, "%d.%m.%Y") AS timeOfConsumption ' +
            'FROM consumedfoods WHERE userId=? AND active=1 ' +
            'ORDER BY timeOfConsumption DESC';
            /*'timeOfConsumption BETWEEN NOW() - INTERVAL 7 DAY AND NOW()'
            'ORDER BY timeOfConsumption DESC';*/

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    }).then(function (consumedFoods) {
        var entries = [];
        var consumedFoods = consumedFoods.forEach(function (food) {
            if(entries.indexOf(food.timeOfConsumption) === -1) {
                entries.push(food.timeOfConsumption);
            }

            /*return {
                consumptionId: food.consumptionId,
                id: food.foodId,
                amount: food.foodAmount,
                timeOfConsumption: food.timeOfConsumption
            };*/
        });

        //var entries = {};
        /*dates.forEach(function (date) {
            consumedFoods = consumedFoods.filter(function (food) {
                return food.timeOfConsumption == date;
            })

            // get nutrition values per item
            var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
            // calc sum of nutrition values across all consumed items
            var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);

            entries[date] = nutritionValuesInTotal;
        })*/

        return entries;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
