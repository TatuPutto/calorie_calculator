var getConnection = require('./create-connection');

module.exports = function checkLogin(username, password) {
    var query = 'SELECT * FROM users WHERE username=? AND password=? LIMIT 1';
    var data = [username, password];

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, data, function (err, results) {
                connection.release();
                if(err) reject(err);
                if(results.length > 0) {
                    resolve({
                        id: results[0].userId,
                        username: results[0].username,
                        password: results[0].password
                    });
                } else {
                    reject('No matches');
                }
            });
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
