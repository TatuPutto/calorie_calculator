var executeQuery = require('../database-util/execute-query');

module.exports = function setMealAsInactive(mealId) {
    var query = `
        UPDATE meals, consumedfoods
        SET meals.active = 0, consumedfoods.active = 0
        WHERE meals.mealId = ? AND consumedfoods.mealId = ?
    `;

    return new Promise(function (resolve, reject) {
        executeQuery(query, data)
            .then(function () {
                return resolve();
            })
            .catch(function (err) {
                return reject(err);
            })
    })
    .catch(function (err) {
        throw err;
    });
}
