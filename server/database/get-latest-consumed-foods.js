var createConnection = require('../database/create-connection');

module.exports = function getLatestConsumedFoods(userId) {
    var query = `SELECT foodId FROM consumedfoods WHERE userId=${userId} ` +
            `ORDER BY timeOfConsumption DESC LIMIT 20`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err, result) {
            if(err) reject(err);
            resolve(result);
        });
        connection.end();
    })
    .then(function (data) {
        return data.map((item) => item.foodId);
    })
    .catch(function (err) {
        throw err;
    });
}
