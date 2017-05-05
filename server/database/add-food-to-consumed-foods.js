var createConnection = require('../database/create-connection');

module.exports = function addFoodToConsumedFoods(userId, foodId, foodAmount) {
    var query = `INSERT INTO consumedfoods (userId, foodId, foodAmount) ` +
            `VALUES (${userId}, ${foodId}, ${foodAmount})`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err) {
          if(err) reject(err);
          resolve();
        });
        connection.end();
    }).catch(function (err) {
        throw err;
    });
}
