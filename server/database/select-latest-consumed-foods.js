var getConnection = require('./create-connection');

module.exports = function selectLatestConsumedfoods(userId) {
    var query = `
        SELECT foods.*, COUNT(favorites.foodId) > 0 AS isInFavorites
        FROM consumedFoods
        INNER JOIN foods ON consumedFoods.foodId = foods.foodId
        LEFT JOIN favorites ON consumedFoods.foodId = favorites.foodId
        WHERE consumedFoods.userId = ? AND consumedFoods.foodId != 99999
        GROUP BY foods.foodId
        ORDER BY consumedFoods.timeOfConsumption DESC
        LIMIT 20
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [userId], function (err, results) {
              if(err) reject(err);
              resolve(results);
            });
            connection.release();
        });
    }).then(function (results) {
        return results.map(function (row) {
            return {
                id: row.foodId,
                name: row.foodName,
                energy: row.energy,
                protein: row.protein,
                carbs: row.carbs,
                fat: row.fat,
                portionSizes: JSON.parse(row.portionSizes),
                isInFavorites: row.isInFavorites ? true : false,
            }
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
