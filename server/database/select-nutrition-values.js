var executeQuery = require('../database-util/execute-query');

module.exports = function selectNutritionValues(ids) {
    var query = 'SELECT * from foods where foodId IN (?)';

    return new Promise(function (resolve, reject) {
        executeQuery(query, [ids])
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
                //isInFavorites: row.isInFavorites ? true : false,
                //history: row.history
            }
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
