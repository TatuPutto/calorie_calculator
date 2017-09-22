var executeQuery = require('../database-util/execute-query');

module.exports = function getFavoriteFoods(userId) {
    var query = `
        SELECT foods.*
        FROM favorites
        INNER JOIN foods ON favorites.foodId = foods.foodId
        WHERE favorites.userId = ?
        ORDER BY foods.foodName
    `;

    return new Promise(function (resolve, reject) {
        executeQuery(query, [userId])
            .then(function (results) {
                return resolve(results);
            })
            .catch(function (err) {
                return reject(err);
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
                isInFavorites: true
            }
        });
    })
    .catch(function (err) {
        throw err;
    });
}
