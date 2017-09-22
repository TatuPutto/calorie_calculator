var executeQuery = require('../database-util/execute-query');

module.exports = function insertFoodToFavorites(userId, foodId) {
    var query = 'INSERT INTO favorites (userId, foodId) VALUES (?, ?)';

    return new Promise(function (resolve, reject) {
        executeQuery(query, [userId, foodId])
            .then(function () {
                return resolve();
            })
            .catch(function (err) {
                return reject(err);
            })
    }).catch(function (err) {
        throw err;
    });
}
