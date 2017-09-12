var getConnection = require('./create-connection');
var calcNutritionValues = require('../util/query-json').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-json').calcTotalNutritionValues;

module.exports = function getEntry(entryId) {
    /*var query = 'SELECT DISTINCT a.mealType, b.consumptionId, b.foodId, ' +
            'b.foodAmount, b.timeOfConsumption ' +
            'FROM meals a, consumedFoods b ' +
            'WHERE a.entryId=1 AND b.entryId=1';*/
    var query = 'SELECT meals.mealId, meals.mealType, consumedFoods.* ' +
                'FROM meals, consumedFoods ' +
                'WHERE meals.mealId = consumedFoods.mealId ' +
                'ORDER BY meals.mealType DESC';


    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [1], function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    })
    .then(function (results) {
        console.log(results);
        var meals = {};
        results.forEach(function (item) {
            if(!meals.hasOwnProperty(item.mealType)) {
                meals[item.mealType] = [];
            }
            meals[item.mealType].push(calcNutritionValues({
                consumptionId: item.consumptionId,
                id: item.foodId,
                amount: item.foodAmount,
                timeOfConsumption: item.timeOfConsumption
            }));
        });
        console.log(meals);
        return meals
    })
    .catch(function (err) {
        console.log(err);
    });




}
