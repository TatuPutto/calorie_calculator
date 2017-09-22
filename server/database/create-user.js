var getConnection = require('./create-connection');

module.exports = function addUser(userId, username, password) {
    // TODO encryption for password
    var data = [userId, username, password];
    var query = 'INSERT INTO users (userId, username, password) VALUES (?, ?, ?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject();
            connection.query(query, data, function (err, result) {
                if(err) return reject();
                return resolve({
                    id: userId,
                    username: username,
                    loggedIn: true
                });
            });
        });
    });
}
