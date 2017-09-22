var executeQuery = require('../database-util/execute-query');

function insertEntryForToday(consumptionId, foodId, foodAmount, mealId, userId) {
    var data = [consumptionId, foodId, foodAmount, mealId, userId];
    var query = `
        INSERT INTO consumedfoods
        (consumptionId, foodId, foodAmount, timeOfConsumption, mealId, userId)
        VALUES (?, ?, ?, NOW(), ?, ?)
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

module.exports = insertEntryForToday;
