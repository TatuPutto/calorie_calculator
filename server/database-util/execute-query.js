var getConnection = require('./create-connection');

module.exports = function executeQuery(query, data) {
    return new Promise(function(resolve, reject) {
        return getConnection(handleConnection);

        function handleConnection(err, connection) {
            if(err) return reject();
            connection.release();
            return connection.query(query, data, handleResults);
        }

        function handleResults(err, results) {
            if(err) return reject();
            return resolve(results);
        }
    })
    .catch(function (err) {
        console.log('palautetaan täältä');
        throw err;
    });
}
