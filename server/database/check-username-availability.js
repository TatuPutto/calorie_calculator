var getConnection = require('./create-connection');

module.exports = function checkUsernameAvailability(username) {
    var query = 'SELECT * FROM users WHERE username=?';

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, [username], function (err, results) {
                connection.release();
                if(err) reject(err);
                if(results.length === 0) {
                    console.log('resolvataan');
                    resolve();
                } else {
                    console.log(results.length + ' rejektoidaan');
                    reject();
                }
            });
        });
    })
    .catch(function (err) {
        console.log(`Käyttäjätunnuksen saatavuuden tarkistaminen ei onnistunut (${err})`);
        throw err;
    });
}
