var getConnection = require('./create-connection');

module.exports = function selectNutritionValues(ids) {
    var query = 'SELECT * from foods where foodId IN (?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [ids], function (err, results) {
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
