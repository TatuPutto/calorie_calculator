var getConnection = require('../database/create-connection');

module.exports = function removeFoodFromFavorites(userId, foodId) {
    var query = `DELETE FROM favorites WHERE userId=${userId} AND foodId=${foodId}`;
    
    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
              if(err) reject(err);
              resolve();
            });
            connection.release();
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
