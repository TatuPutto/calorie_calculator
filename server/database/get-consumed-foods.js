var createConnection = require('../database/create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;

module.exports = function getConsumedFoods(userId) {
    var query = `SELECT consumptionId, foodId, foodAmount, timeOfConsumption ` +
            `FROM consumedfoods WHERE userId=${userId} AND active=1 AND ` +
            `timeOfConsumption >= CURDATE() AND timeOfConsumption < ` +
            `CURDATE() + INTERVAL 1 DAY ORDER BY timeOfConsumption ASC`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err, results) {
          if(err) reject(err);
          resolve(results);
        });
        connection.end();
    })
    .then(function (data) {
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
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
