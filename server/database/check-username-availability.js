var getConnection = require('./create-connection');

module.exports = function checkUsernameAvailability(username) {
    var query = 'SELECT * FROM users WHERE username = ?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [username], function (err, results) {
                if(err) return reject(err);
                if(results.length === 0) {
                    return resolve();
                } else {
                    return reject();
                }
            });
        });
    });
}
