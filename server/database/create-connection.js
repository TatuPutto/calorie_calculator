var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fooddiary'
});

module.exports = function getConnection(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
