var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;

module.exports = function getEntryFromDate(userId, date) {
    console.log(date);
    var query = 'SELECT consumptionId, foodId, foodAmount, timeOfConsumption ' +
            'FROM consumedfoods WHERE userId=? AND active=1 AND ' +
            `timeOfConsumption BETWEEN NOW() - INTERVAL 1 DAY AND NOW() ORDER BY timeOfConsumption ASC`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId, date, date], function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    }).then(function (data) {
        console.log(data);
        var consumedFoods = data.map(function (item) {
            return {
                consumptionId: item.consumptionId,
                id: item.foodId,
                amount: item.foodAmount,
                timeOfConsumption: item.timeOfConsumption
            };
        });

        // get nutrition values per item
        var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
        // calc sum of nutrition values across all consumed items
        var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);
        return {nutritionValuesPerItem, nutritionValuesInTotal};
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
