var getConnection = require('./create-connection');

module.exports = function createTemporaryUser(userId) {
    var data = [userId, `Anon${userId}`];
    var query = 'INSERT INTO users (userId, username) VALUES (?, ?)';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject();
            connection.query(query, data, function (err, result) {
                if(err) return reject(err);
                return resolve();
            });
        });
    });
}
