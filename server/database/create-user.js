var getConnection = require('./create-connection');

module.exports = function addUser(userId, username, password) {
    // TODO encryption for password
    var data = [userId, username, password];
    var query = 'INSERT INTO users (userId, username, password) VALUES (?, ?, ?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.query(query, data, function (err, result) {
                connection.release();
                if(err) reject(err);
                resolve({
                    id: userId,
                    username: username,
                    loggedIn: true
                });
            });
        });
    });
}
