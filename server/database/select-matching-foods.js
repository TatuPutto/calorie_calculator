var getConnection = require('./create-connection');

module.exports = function selectMatchingFoods(searchTerm) {
    var data = [searchTerm, searchTerm, searchTerm];
    var query = `
        SELECT foods.*
        FROM foods
        WHERE foodName LIKE "%"?"%"
        ORDER BY
        (CASE WHEN foodName LIKE ""?"%" THEN 1
                WHEN foodName LIKE "%"?"" THEN 3
                ELSE 2 END), foodName
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
