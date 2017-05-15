var getConnection = require('./create-connection');

module.exports = function getLatestConsumedFoods(userId) {
    var query = `SELECT f.* FROM foods f ` +
            `INNER JOIN consumedFoods c ON f.foodId = c.foodId ` +
            `WHERE c.userId=${userId} ORDER BY timeOfConsumption DESC LIMIT 20`;

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
        console.log(err);
        throw err;
    });
}
