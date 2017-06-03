var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;

module.exports = function getEntryFromDate(userId, date) {
    console.log(date);
    var query = 'SELECT consumptionId, foodId, foodAmount, timeOfConsumption ' +
            'FROM consumedFoods WHERE userId=? AND active=1 AND ' +
            'timeOfConsumption >= STR_TO_DATE(?, "%d-%m-%Y") AND ' +
            'timeOfConsumption < STR_TO_DATE(?, "%d-%m-%Y") + INTERVAL 1 DAY ' +
            'ORDER BY timeOfConsumption ASC';

            /*
            mysql> select * from consumedfoods where userId=123 AND timeOfConsumption >=
                str_to_date("23-05-2017", "%d-%m-%Y") and
                timeofconsumption < str_to_date("23-05-2017", "%d-%m-%Y")  + interval 1 day;

            */


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
