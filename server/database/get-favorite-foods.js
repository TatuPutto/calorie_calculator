var getConnection = require('./create-connection');

module.exports = function getFavoriteFoods(userId) {
    var query = `SELECT foods.* FROM foods ` +
            `INNER JOIN favorites ON foods.foodId = favorites.foodId ` +
            `WHERE favorites.userId=${userId}`;

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
