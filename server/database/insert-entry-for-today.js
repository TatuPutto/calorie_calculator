var getConnection = require('./create-connection');

function insertEntryForToday(foodId, foodAmount, mealId, userId) {
    var data = [foodId, foodAmount, mealId, userId];
    var query = `
        INSERT INTO consumedFoods
        (foodId, foodAmount, timeOfConsumption, mealId, userId)
        VALUES (?, ?, NOW(), ?, ?)
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) reject(err);
            connection.query(query, data, function (err, results) {
                if(err) reject(err);
                resolve();
            });
        });
    })
    .catch(function (err) {
        throw err;
    });
}

module.exports = insertEntryForToday;
