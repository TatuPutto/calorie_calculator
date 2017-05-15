var getConnection = require('./create-connection');

module.exports = function getMatchingFoods(searchStr) {
    var query = `SELECT * FROM foods WHERE foodName LIKE "%${searchStr}%" LIMIT 100`;


    /*
    var query = `SELECT foods.* FROM foods ` +
            `INNER JOIN favorites ON foods.foodId = favorites.foodId ` +
            `WHERE favorites.userId=${userId}`;
    */


    /*var query = `SELECT foods.*, FROM foods ` +
            `INNER JOIN portionSizes ON portionSizes.foodId = foods.foodId ` +
            `WHERE foods.foodName LIKE "%${searchStr}%" LIMIT 100`;
            console.log(query);*/
            //var query = `SELECT foods.* FROM foods RIGHT JOIN portionSizes ON portionSizes.foodId = foods.foodId WHERE foods.foodName LIKE "%${searchStr}%"`;

            //var query = `SELECT foods.* FROM foods WHERE foods.foodName LIKE "%${searchStr}%" UNION SELECT * FROM portionSizes WHERE portionSizes.foodId=foods.foodId`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
                connection.release();
                if(err) reject(err);
                if(results.length > 0) {
                    resolve(results);
                } else {
                    resolve(null);
                }
            });
        })
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
