var executeQuery = require('../database-util/execute-query');

module.exports = function createTemporaryUser(userId) {
    var data = [userId, `Anon${userId}`];
    var query = 'INSERT INTO users (userId, username) VALUES (?, ?)';

    return new Promise(function (resolve, reject) {
        executeQuery(query, data)
            .then(function () {
                return resolve();
            })
            .catch(function (err) {
                return reject(err);
            })
    });
}
