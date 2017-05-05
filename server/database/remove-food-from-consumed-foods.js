var createConnection = require('../database/create-connection');

module.exports = function addFoodToConsumedFoods(userId, consumptionId) {
    var query = `UPDATE consumedfoods SET active=0 ` +
            `WHERE consumptionId=${consumptionId}`;
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
