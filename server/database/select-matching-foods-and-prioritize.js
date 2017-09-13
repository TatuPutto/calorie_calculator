var getConnection = require('./create-connection');

module.exports = function selectMatchingFoodsAndPrioritize(searchTerm, userId) {
    var data = [userId, userId, searchTerm];
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
        (CASE WHEN foodName = 'maitorahka' THEN 1 WHEN
                foodName LIKE 'maitorahka%' then 2 ELSE 3 END) DESC
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
        var matchingFoods = [];
        results.forEach(function (row) {
            matchingFoods.push({
                id: row.foodId,
                name: row.foodName,
                energy: row.energy,
                protein: row.protein,
                carbs: row.carbs,
                fat: row.fat,
                //portionSizes: food.portionSizes,
                isInFavorites: row.isInFavorites ? true : false,
                history: row.history
            });
        });

        return matchingFoods;
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
