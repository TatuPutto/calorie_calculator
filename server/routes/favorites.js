var findMatchingFoodsByIds = require('../util/query-json').findMatchingFoodsByIds;
var getFavoriteFoods = require('../database/get-favorite-foods');
var addFoodToFavorites = require('../database/add-food-to-favorites');
var removeFoodFromFavorites = require('../database/remove-food-from-favorites');
var favoritesCookieFallback = require('./favorites-cookie-fallback');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        favoritesCookieFallback(req, res);
    }
});

router.get('/', function (req, res) {
    getFavoriteFoods(req.session.user.id)
        .then(function (favorites) {
            var matchingFoods = findMatchingFoodsByIds(favorites);
            matchingFoods.forEach(function (food) {
                return food['favorite'] = true;
            });

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(matchingFoods));
        })
        .catch(function (err) {
            res.end(JSON.stringify(err));
        });
});

router.post('/:foodId', function (req, res) {
    addFoodToFavorites(req.session.user.id, req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(403);
            res.end(err);
        });
});

router.delete('/:foodId', function (req, res) {
    removeFoodFromFavorites(req.session.user.id, req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(403);
            res.end(err);
        });
});

module.exports = router;
