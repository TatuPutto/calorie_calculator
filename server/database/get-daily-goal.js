var getConnection = require('./create-connection');

module.exports = function getDailyGoal() {
    var query = 'SELECT energy, protein, carbohydrates, fat ' +
            'FROM dailygoals WHERE userId = 123 LIMIT 1';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, result) {
                if(err) reject(err);
                if(result.length > 0) {
                    resolve(result[0]);
                } else {
                    resolve({
                        energy: 2500,
                        protein: 180,
                        carbs: 250,
                        fat: 80
                    });
                }
            });
        })
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
