var createConnection = require('../database/create-connection');

module.exports = function addFoodToFavorites(foodId) {
    var query = `INSERT INTO favorites (userId, foodId) VALUES (123, ${foodId})`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err) {
            if(err) reject(err);
        });
        connection.end();
    })
    .catch(function (err) {
        throw err;
    });
}
