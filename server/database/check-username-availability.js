var executeQuery = require('../database-util/execute-query');

module.exports = function checkUsernameAvailability(username) {
    var query = 'SELECT * FROM users WHERE username = ?';

    return new Promise(function (resolve, reject) {
        executeQuery(query, [username])
            .then(function (results) {
                if(results.length === 0) {
                    return resolve();
                } else {
                    return reject();
                }
            });
    });
}
