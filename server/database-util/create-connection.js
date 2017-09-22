var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fooddiary'
});

module.exports = function getConnection(callback) {
    pool.getConnection(function (err, connection) {
        callback(err, connection);
    });
};
