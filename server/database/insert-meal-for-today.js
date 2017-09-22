var executeQuery = require('../database-util/execute-query');

module.exports = function insertMealForToday(mealName, userId) {
    var insert = `
        INSERT INTO meals (mealName, timeOfConsumption, userId)
        VALUES (?, NOW(), ?)
    `;
    var select = `
        SELECT mealId, mealName, timeOfConsumption from meals WHERE userId = ?
        ORDER BY timeOfConsumption DESC LIMIT 1;
    `;

    return new Promise(function (resolve, reject) {
        // insert new meal
        executeQuery(insert, [mealName, userId])
            .then(function () {
                // select created meal
                executeQuery(select, [userId])
                    .then(function (results) {
                        return resolve(results[0]);
                    })
                    .catch(function (err) {
                        return reject(err);
                    })
            })
            .catch(function (err) {
                return reject(err);
            });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
