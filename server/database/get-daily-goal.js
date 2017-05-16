var getConnection = require('./create-connection');

module.exports = function getDailyGoal(userId) {
    var query = 'SELECT energy, protein, carbohydrates, fat ' +
            'FROM dailygoals WHERE userId=?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
                connection.release();
                if(err) reject(err);
                if(results.length > 0) {
                    resolve(results[(results.length - 1)]);
                } else {
                    resolve(null);
                }
            });
        })
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
