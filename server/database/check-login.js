var executeQuery = require('../database-util/execute-query');

module.exports = function checkLogin(username, password) {
    var query = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';

    return new Promise(function (resolve, reject) {
        executeQuery(query, [username, password])
            .then(function (results) {
                if(results.length > 0) {
                    return resolve({
                        id: results[0].userId,
                        username: results[0].username,
                        loggedIn: true
                    });
                } else {
                    return reject();
                }
            })
            .catch(function (err) {
                return reject(err);
            })
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
