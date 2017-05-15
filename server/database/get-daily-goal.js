var getConnection = require('./create-connection');

module.exports = function getDailyGoal(userId) {
    var query = `SELECT energy, protein, carbohydrates, fat ` +
            `FROM dailygoals WHERE userId=${userId} LIMIT 1`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, result) {
                connection.release();
                if(err) reject(err);
                if(result.length > 0) {
                    resolve(result[0]);
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
