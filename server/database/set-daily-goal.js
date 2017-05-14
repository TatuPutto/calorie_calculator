var getConnection = require('./create-connection');

module.exports = function setDailyGoal(userId, energy, protein, carbs, fat) {
    var query = `UPDATE dailygoals SET energy=${energy}, protein=${protein}, ` +
            `carbohydrates=${carbs}, fat=${fat} WHERE userId=123`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
              if(err) reject(err);
              resolve();
            });
            connection.release();
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
