var findMatchingFoodsByIds = require('../util/query-json').findMatchingFoodsByIds;
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var getLatestConsumedFoods = require('../database/get-latest-consumed-foods');
var getFavoriteFoods = require('../database/get-favorite-foods');
var latestCookieFallback = require('./latest-cookie-fallback');
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        latestCookieFallback(req, res);
    }
});

router.get('/', function (req, res) {
    Promise.all([
        getLatestConsumedFoods(req.session.user.id),
        getFavoriteFoods(req.session.user.id)
    ])
    .then(function (values) {
        var latest = values[0];
        var favorites = values[1];
        var matchingFoods = findMatchingFoodsByIds(latest);
        matchingFoods = markFoodsAsFavorites(favorites, matchingFoods, false);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(matchingFoods));
    })
    .catch(function(err) {
        console.log(err);
        res.status(400).end(err);
    });
});

module.exports = router;
