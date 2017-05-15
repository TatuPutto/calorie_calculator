var getConnection = require('./create-connection');

module.exports = function getFavoriteFoodIds(userId) {
    var query = `SELECT foodId FROM favorites WHERE userId=${userId}`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
                console.log(results);
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
