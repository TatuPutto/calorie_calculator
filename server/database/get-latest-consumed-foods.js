var getConnection = require('./create-connection');

module.exports = function getLatestConsumedFoods(userId) {
    var query = 'SELECT foodId FROM consumedfoods WHERE userId=? ' +
            'ORDER BY timeOfConsumption DESC LIMIT 20';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
              if(err) reject(err);
              resolve(results);
            });
            connection.release();
        });
    }).then(function (data) {
        return data.map((item) => item.foodId);
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
