var createConnection = require('../database/create-connection');

module.exports = function addFoodToFavorites(userId, foodId) {
    var query = `INSERT INTO favorites (userId, foodId) ` +
            `VALUES (${userId}, ${foodId})`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err) {
            if(err) reject(err);
            resolve();
        });
        connection.end();
    })
    .catch(function (err) {
        throw err;
    });
}
