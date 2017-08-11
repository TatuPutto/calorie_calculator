var getConnection = require('./create-connection');

module.exports = function addUser(username, password) {
    // TODO encryption for password
    var query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    var data = [username, password];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.query(query, data, function (err, result) {
                connection.release();
                if(err) reject(err);
                resolve();
            });
        });
    });
}
