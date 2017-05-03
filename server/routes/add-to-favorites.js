var createConnection = require('../database/create-connection');
var addFoodToFavorites = require('../database/add-food-to-favorites');
var removeFoodFromFavorites = require('../database/remove-food-from-favorites');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var query = 'SELECT foodId FROM favorites WHERE userId = 123';
    var connection = createConnection();

    var dbQuery = new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err, result) {
            if(err) reject(err);
            resolve(result);
        });
        connection.end();
    });

    dbQuery.then(function (data) {
        var favorites = data.map((item) => {
            console.log(item);
            return item.foodId;
        });
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(favorites));
    });

    dbQuery.catch(function (err) {
        res.end(JSON.stringify(err));
    });
});


router.put('/:foodId', function (req, res) {
    addFoodToFavorites(req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.end(err);
        });
});

router.delete('/:foodId', function (req, res) {
    removeFoodFromFavorites(req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.end(err);
        });
});


module.exports = router;
