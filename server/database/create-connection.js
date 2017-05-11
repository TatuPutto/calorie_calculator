var mysql = require('mysql');
var connectionParams;

if(process.env.CLEARDB_DATABASE_URL) {
    var dbURL = process.env.CLEARDB_DATABASE_URL;
    var host = dbURL.split('/')[2].split('@')[1].split('/')[0];
    var user  = dbURL.split('/')[2].split(':')[0];
    var password  = dbURL.split('/')[2].split(':')[1].split('@')[0];
    var database  = dbURL.split('/')[3].split('?')[0];
    
    connectionParams = {host, user, password, database};
} else {
    connectionParams = {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fooddiary'
    };
}

module.exports = function createConnection() {
    return mysql.createConnection(connectionParams);
}
