var getConnection = require('./create-connection');

module.exports = function setEntryAsInactive(consumptionId) {
    var query = 'UPDATE consumedfoods SET active = 0 WHERE consumptionId = ?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [consumptionId], function (err) {
                if(err) return reject(err);
                return resolve();
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}
