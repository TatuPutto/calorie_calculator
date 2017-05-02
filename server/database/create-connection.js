var mysql = require('mysql');

module.exports = function createConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'foodDiary'
    });

    return connection;
}
