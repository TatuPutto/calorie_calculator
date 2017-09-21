var getConnection = require('./create-connection');

module.exports = function updateEntry(consumptionId, userId, foodAmount) {
    var data = [foodAmount, userId, consumptionId];
    var query = `
        UPDATE consumedfoods SET foodAmount=?
        WHERE userId=? AND consumptionId=?
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, data, function (err, result) {
              if(err) reject(err);
              resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
