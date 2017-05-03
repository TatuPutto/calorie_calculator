var findMatchingFoodsByIds = require('../util/query-csv').findMatchingFoodsByIds;
var getFavoriteFoods = require('../database/get-favorite-foods');
var addFoodToFavorites = require('../database/add-food-to-favorites');
var removeFoodFromFavorites = require('../database/remove-food-from-favorites');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {console.log('täällä');
    getFavoriteFoods()
        .then(function (favorites) {
            var matchingFoods = findMatchingFoodsByIds(favorites);
            console.log(matchingFoods);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(matchingFoods));
        })

        .catch(function (err) {
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
