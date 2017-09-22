var getConnection = require('./create-connection');

module.exports = function selectGoalFromDate(userId, date) {
    var query = `
        SELECT energy, protein, carbs, fat
        FROM dailygoals WHERE userId = ?
        AND setAt <= STR_TO_DATE(?, "%d-%m-%Y") + INTERVAL 1 DAY
        ORDER BY setAt DESC LIMIT 1
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [userId, date], function (err, results) {
                if(err) return reject(err);
                if(results.length > 0) {
                    return resolve(results[0]);
                } else {
                    return resolve(null);
                }
            });
        })
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
