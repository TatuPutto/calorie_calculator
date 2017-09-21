var getConnection = require('./create-connection');

module.exports = function setMealAsInactive(mealId) {
    var query = `
        UPDATE meals, consumedfoods
        SET meals.active = 0, consumedfoods.active = 0
        WHERE meals.mealId = ? AND consumedfoods.mealId = ?
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [mealId, mealId], function (err) {
                connection.release();
                if(err) reject(err);
                resolve();
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}
