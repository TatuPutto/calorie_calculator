var getConnection = require('./create-connection');

module.exports = function removeFoodFromFavorites(userId, foodId) {
    var query = `DELETE FROM favorites WHERE userId = ? AND foodId = ?`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [userId, foodId], function (err, results) {
                if(err) return reject(err);
                return resolve();
            });
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
