var getConnection = require('./create-connection');

module.exports = function selectMatchingFoodsAndPrioritize(searchTerm, userId) {
    var data = [userId, userId, searchTerm, searchTerm, searchTerm];
    var query = `
        SELECT foods.*, COUNT(consumedFoods.foodId) AS history,
        COUNT(favorites.foodId) > 0 AS isInFavorites
        FROM foods
        LEFT JOIN consumedFoods
        ON foods.foodId = consumedFoods.foodId AND consumedFoods.userId = ?
        LEFT JOIN favorites
        ON foods.foodId = favorites.foodId AND favorites.userId = ?
        WHERE foods.foodName LIKE "%"?"%"
        GROUP BY foods.foodId
        ORDER BY isInFavorites DESC, history DESC,
        (CASE WHEN foods.foodName LIKE ""?"%" THEN 1
                WHEN foods.foodName LIKE "%"?"" THEN 3
                ELSE 2 END)
        LIMIT 100
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, data, function (err, results) {
                connection.release();
                if(err) reject(err);
                resolve(results);
            });
        })
    })
    .then(function (results) {
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
                history: row.history
            }
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
