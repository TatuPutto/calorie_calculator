var getConnection = require('./create-connection');

module.exports = function insertFoodToFavorites(userId, foodId) {
    var query = 'INSERT INTO favorites (userId, foodId) VALUES (?, ?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [userId, foodId], function (err) {
                if(err) return reject(err);
                return resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
