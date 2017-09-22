var getConnection = require('./create-connection');

module.exports = function checkLogin(username, password) {
    var query = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';
    var data = [username, password];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, data, function (err, results) {
                if(err) return reject(err);
                if(results.length > 0) {
                    return resolve({
                        id: results[0].userId,
                        username: results[0].username,
                        loggedIn: true
                    });
                } else {
                    return reject();
                }
            });
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
