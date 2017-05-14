var getConnection = require('./create-connection');

module.exports = function addFoodToConsumedFoods(userId, foodId, foodAmount) {
    var query = `INSERT INTO consumedfoods ` +
            `(userId, foodId, foodAmount, timeOfConsumption) ` +
            `VALUES (${userId}, ${foodId}, ${foodAmount}, NOW())`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
              if(err) reject(err);
              resolve();
            });
            connection.release();
        });
    }).catch(function (err) {
        throw err;
    });
}
