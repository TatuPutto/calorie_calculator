var getConnection = require('./create-connection');

module.exports = function getDailyGoal(userId, date) {
    var query = 'SELECT energy, protein, carbohydrates as carbs, fat ' +
            'FROM dailyGoals WHERE userId=? AND ' +
            'setAt <= STR_TO_DATE(?, "%d-%m-%Y") + INTERVAL 1 DAY ' +
            'ORDER BY setAt DESC';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId, date], function (err, results) {
                connection.release();
                if(err) reject(err);
                if(results.length > 0) {
                    resolve(results[0]);
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
