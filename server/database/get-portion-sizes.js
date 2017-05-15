var getConnection = require('./create-connection');

module.exports = function getPortionSizes(foodId) {
    var query = `SELECT * FROM portionSizes WHERE foodId=${foodId}`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
