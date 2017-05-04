var createConnection = require('../database/create-connection');

module.exports = function checkLogin(username, password) {
    var query = `SELECT * FROM users WHERE username="${username}" ` +
            `AND password="${password}" LIMIT 1`;
    var connection = createConnection();

    return new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err, result) {
            if(err) reject(err);
            if(result.length > 0) {
                resolve({
                    id: result[0].userId,
                    username: result[0].username,
                    password: result[0].password
                });
            } else {
                reject('No matches');
            }
        });
        connection.end();
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
