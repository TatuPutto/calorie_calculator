var executeQuery = require('../database-util/execute-query');

module.exports = function updateEntry(consumptionId, userId, foodAmount) {
    var data = [foodAmount, userId, consumptionId];
    var query = `
        UPDATE consumedfoods SET foodAmount=?
        WHERE userId=? AND consumptionId=?
    `;

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
