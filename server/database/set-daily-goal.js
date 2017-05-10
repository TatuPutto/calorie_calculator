var createConnection = require('../database/create-connection');

module.exports = function removeFoodFromFavorites(userId, energy, protein, carbs, fat) {
    var query = `UPDATE dailygoals SET energy=${energy}, protein=${protein}, ` +
            `carbohydrates=${carbs}, fat=${fat} WHERE userId=123`;

    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err) {
            if(err) reject(err);
            resolve();
        });
        connection.end();
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
