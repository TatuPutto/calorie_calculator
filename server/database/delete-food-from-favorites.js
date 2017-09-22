var executeQuery = require('../database-util/execute-query');

module.exports = function removeFoodFromFavorites(userId, foodId) {
    var query = `DELETE FROM favorites WHERE userId = ? AND foodId = ?`;

    return new Promise(function (resolve, reject) {
        executeQuery(query, [userId, foodId])
            .then(function () {
                return resolve();
            })
            .catch(function (err) {
                return reject(err);
            })
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
