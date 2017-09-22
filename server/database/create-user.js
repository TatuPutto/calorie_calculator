var executeQuery = require('../database-util/execute-query');

module.exports = function addUser(userId, username, password) {
    // TODO encryption for password
    var data = [userId, username, password];
    var query = 'INSERT INTO users (userId, username, password) VALUES (?, ?, ?)';

    return new Promise(function (resolve, reject) {
        executeQuery(query, data)
            .then(function () {
                return resolve({
                    id: userId,
                    username: username,
                    loggedIn: true
                });
            })
            .catch(function (err) {
                return reject(err);
            })
    });
}
