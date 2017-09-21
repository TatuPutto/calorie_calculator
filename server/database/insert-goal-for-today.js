var getConnection = require('./create-connection');

module.exports = function insertGoalForToday(userId, energy, protein, carbs, fat) {
    var data = [userId, energy, protein, carbs, fat];
    var query = `
        INSERT INTO dailygoals (userId, energy, protein, carbs, fat, setAt)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, data, function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve();
            });
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
