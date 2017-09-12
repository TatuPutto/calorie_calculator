var findMatchingFoodsByName = require('../util/query-json').findMatchingFoodsByName;
var getLatestConsumedFoods = require('../database/get-latest-consumed-foods');
var markFoodsAsLatelyConsumed = require('../util/mark-foods-as-lately-consumed');
var getFavoriteFoods = require('../database/get-favorite-foods');
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

router.get('/:food', function (req, res) {

    var startTime = new Date();
    var matchingFoods = findMatchingFoodsByName(req.params.food);
    var endTime = new Date();

    var difference = endTime.getTime() - startTime.getTime();
    console.log(endTime.getTime());
    console.log(startTime.getTime());
    console.log(difference);


    // get favorite foods if user is logged in
    if(req.session.user) {
        Promise.all([
            getLatestConsumedFoods(req.session.user.id),
            getFavoriteFoods(req.session.user.id)
        ])
        .then(function (values) {
            var latest = values[0];
            var favorites = values[1];

            matchingFoods = markFoodsAsLatelyConsumed(latest, matchingFoods);
            matchingFoods = markFoodsAsFavorites(
                favorites,
                matchingFoods,
                true
            );

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(matchingFoods));
        })
        .catch(function (err) {
            res.status(400).end(err);
        })
    } else {
        // determine which of the foods are in users favorites (cookie)
        var favoriteFoodsCookie = req.cookies['favorites'];
        var favorites = favoriteFoodsCookie ? JSON.parse(favoriteFoodsCookie) : null;

        if(favorites) {
            matchingFoods = markFoodsAsFavorites(favorites, matchingFoods);
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(matchingFoods));
    }
});

module.exports = router;
