var getConnection = require('./create-connection');

module.exports = function insertFoodToFavorites(userId, foodId) {
    var query = 'INSERT INTO favorites (userId, foodId) VALUES (?, ?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, [userId, foodId], function (err) {
                if(err) reject(err);
                resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
