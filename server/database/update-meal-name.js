var executeQuery = require('../database-util/execute-query');

module.exports = function updateMealName(mealId, mealName) {
    var query = 'UPDATE meals SET mealName = ? WHERE mealId = ?';

    return new Promise(function (resolve, reject) {
        executeQuery(query, data)
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
