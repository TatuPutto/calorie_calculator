var getConnection = require('./create-connection');

module.exports = function checkLogin(username, password) {
    var query = `SELECT * FROM users WHERE username="${username}" ` +
            `AND password="${password}" LIMIT 1`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err, results) {
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
            connection.release();
        });
    }).catch(function (err) {
        console.log(err);
        throw err;
    });
}
