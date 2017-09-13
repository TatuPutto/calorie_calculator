var getConnection = require('./create-connection');

module.exports = function insertMealForToday(mealName, userId) {
    var query = `
        INSERT INTO meals (mealName, timeOfConsumption, userId)
        VALUES (?, NOW(), ?)
    `;
    var select = `
        SELECT mealId, mealName, timeOfConsumption from meals WHERE userId = ?
        ORDER BY timeOfConsumption DESC LIMIT 1;
    `;
    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, [mealName, userId], function (err, results) {
                if(err) reject(err);
                //resolve();
                getConnection(function (err, connection) {
                    connection.release();
                    if(err) reject(err);
                    connection.query(select, [userId], function (err, results) {
                        if(err) reject(err);
                        console.log('täälläpä: \n' + results[0]);
                        resolve(results[0]);
                    });
                });
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}
