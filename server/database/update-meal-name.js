var getConnection = require('./create-connection');

module.exports = function updateMealName(mealId, mealName) {
    var query = 'UPDATE meals SET mealName = ? WHERE mealId = ?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, [mealName, mealId], function (err, result) {
              if(err) reject(err);
              resolve();
            });
        });
    }).catch(function (err) {
        throw err;
    });
}
