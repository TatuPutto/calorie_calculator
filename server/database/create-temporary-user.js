var getConnection = require('./create-connection');

module.exports = function addUser(userId) {
    // TODO encryption for password
    var query = 'INSERT INTO users (userId, username) VALUES (?, ?)';
    var data = [userId, `Anon${userId}`];

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
