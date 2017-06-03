var getConnection = require('./create-connection');

function updateConsumedFoodAmount(consumptionId, userId, foodAmount) {
    var query = 'UPDATE consumedFoods SET foodAmount=? ' +
            'WHERE userId=? AND consumptionId=?';
    var data = [foodAmount, userId, consumptionId];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, data, function (err, result) {
              if(err) reject(err);
              resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}

module.exports = updateConsumedFoodAmount;
