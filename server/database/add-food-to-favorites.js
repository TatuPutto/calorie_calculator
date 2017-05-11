var getConnection = require('../database/create-connection');

module.exports = function addFoodToFavorites(userId, foodId) {
    var query = `INSERT INTO favorites (userId, foodId) ` +
            `VALUES (${userId}, ${foodId})`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err) {
                if(err) reject(err);
                resolve();
            });
            connection.release();
        });
    }).catch(function (err) {
        throw err;
    });
}
