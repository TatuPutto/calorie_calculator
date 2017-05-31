var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;

module.exports = function getEntryDates(userId) {
    var query = 'SELECT consumptionId, foodId, foodAmount, ' +
            'DATE_FORMAT(timeOfConsumption, "%d-%m-%Y") AS timeOfConsumption ' +
            'FROM consumedfoods WHERE userId=? AND active=1 ' +
            'ORDER BY timeOfConsumption DESC';

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
        });

        return entries;
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
