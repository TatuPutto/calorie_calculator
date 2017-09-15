var getConnection = require('./create-connection');

module.exports = function setEntryAsInactive(consumptionId) {
    var query = 'UPDATE consumedFoods SET active = 0 WHERE consumptionId = ?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [consumptionId], function (err) {
                connection.release();
                if(err) reject(err);
                resolve();
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}
