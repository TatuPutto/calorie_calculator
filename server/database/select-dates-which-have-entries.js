var executeQuery = require('../database-util/execute-query');

module.exports = function selectDatesWhichHaveEntries(userId) {
    var query = `
        SELECT DISTINCT(DATE_FORMAT(timeOfConsumption, "%d-%m-%Y"))
        AS timeOfConsumption
        FROM consumedfoods WHERE userId = ? AND active = 1
        ORDER BY timeOfConsumption DESC
    `;

    return new Promise(function (resolve, reject) {
        executeQuery(query, [userId])
            .then(function (results) {
                return resolve(results);
            })
            .catch(function (err) {
                return reject(err);
            })
    })
    .then(function (dates) {
        return dates.map(function (date) {
            return date.timeOfConsumption;
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
