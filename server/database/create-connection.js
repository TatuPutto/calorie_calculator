var mysql = require('mysql');
var pool;

if(process.env.CLEARDB_DATABASE_URL) {
    var dbURL = process.env.CLEARDB_DATABASE_URL;
    var host = dbURL.split('/')[2].split('@')[1].split('/')[0];
    var user  = dbURL.split('/')[2].split(':')[0];
    var password  = dbURL.split('/')[2].split(':')[1].split('@')[0];
    var database  = dbURL.split('/')[3].split('?')[0];

    pool = mysql.createPool({host, user, password, database});
} else {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fooddiary'
    });
}

module.exports = function getConnection(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
