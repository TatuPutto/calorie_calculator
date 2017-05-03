var createConnection = require('../database/create-connection');

module.exports = function removeFoodFromFavorites(foodId) {
    var query = `DELETE FROM favorites WHERE userId=123 AND foodId=${foodId}`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err) {
            if(err) reject(err);
        });
        connection.end();
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
