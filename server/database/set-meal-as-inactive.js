var getConnection = require('./create-connection');

module.exports = function setMealAsInactive(mealId) {
    var query = `
        UPDATE meals, consumedfoods
        SET meals.active = 0, consumedfoods.active = 0
        WHERE meals.mealId = ? AND consumedfoods.mealId = ?
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [mealId, mealId], function (err) {
                if(err) return reject(err);
                return resolve();
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}
