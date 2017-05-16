var getConnection = require('./create-connection');

module.exports = function getFavoriteFoods(userId) {
    var query = 'SELECT foodId FROM favorites WHERE userId=?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
              if(err) reject(err);
              resolve(results);
            });
            connection.release();
        });
    })
    .then(function (data) {
        return data.map((item) => item.foodId);
    })
    .catch(function (err) {
        throw err;
    });
}
