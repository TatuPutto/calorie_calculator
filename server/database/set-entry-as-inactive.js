var executeQuery = require('../database-util/execute-query');

module.exports = function setEntryAsInactive(consumptionId) {
    var query = 'UPDATE consumedfoods SET active = 0 WHERE consumptionId12331 = ?';

    return new Promise(function (resolve, reject) {
        executeQuery(query, [consumptionId])
            .then(function () {
                return resolve();
            })
            .catch(function () {
                return reject();
            });
    })
    .catch(function (err) {
        throw err;
    });
}
