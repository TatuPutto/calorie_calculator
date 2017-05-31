var getConnection = require('./create-connection');

function addFoodToConsumedFoods(consumptionId, userId, foodId, foodAmount) {
    var query = 'INSERT INTO consumedfoods ' +
            '(consumptionId, userId, foodId, foodAmount, timeOfConsumption) ' +
            'VALUES (?, ?, ?, ?, NOW())';
    var data = [consumptionId, userId, foodId, foodAmount];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, data, function (err, results) {
              if(err) reject(err);
              resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}

module.exports = addFoodToConsumedFoods;
