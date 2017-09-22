var executeQuery = require('../database-util/execute-query');

module.exports = function insertGoalForToday(userId, energy, protein, carbs, fat) {
    var data = [userId, energy, protein, carbs, fat];
    var query = `
        INSERT INTO dailygoals (userId, energy, protein, carbs, fat, setAt)
        VALUES (?, ?, ?, ?, ?, NOW())
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
        console.log(err);
        throw err;
    });
}
