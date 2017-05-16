var findMatchingFoodsByIds = require('../util/query-csv').findMatchingFoodsByIds;
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var getLatestConsumedFoods = require('../database/get-latest-consumed-foods');
var getFavoriteFoods = require('../database/get-favorite-foods');
var latestConsumedFoodsCookieFallback = require('./latest-consumed-foods-cookie-fallback');
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        latestConsumedFoodsCookieFallback(req, res);
    }
});

router.get('/', function (req, res) {
    getLatestConsumedFoods(req.session.user.id)
        .then(function (latestConsumedFoods) {
            var matchingFoods = findMatchingFoodsByIds(latestConsumedFoods);

            // determine which of the foods are in users favorites
            getFavoriteFoods(req.session.user.id)
                .then(function(favorites) {
                    matchingFoods = markFoodsAsFavorites(favorites, matchingFoods);

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(matchingFoods));
                }).catch(function(err) {
                    console.log(err);
                    res.end(err);
                });
        }).catch(function (err) {
            res.end(JSON.stringify(err));
        });
});

module.exports = router;
