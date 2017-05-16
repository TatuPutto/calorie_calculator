var getConnection = require('./create-connection');

module.exports = function addFoodToFavorites(userId, foodId) {
    var query = 'INSERT INTO favorites (userId, foodId) VALUES (?, ?)';
    var data = [userId, foodId];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, data, function (err) {
                if(err) reject(err);
                resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
