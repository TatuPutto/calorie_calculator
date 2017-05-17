var findMatchingFoodsByName = require('../util/query-csv').findMatchingFoodsByName;
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var getFavoriteFoods = require('../database/get-favorite-foods');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

router.get('/:food', function (req, res) {
    var matchingFoods = findMatchingFoodsByName(req.params.food);
    // get favorite foods if user is logged in
    if(req.session.user) {
        // determine which of the foods are in users favorites (database)
        getFavoriteFoods(req.session.user.id)
            .then(function(favorites) {
                matchingFoods = markFoodsAsFavorites(favorites, matchingFoods);

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(matchingFoods));
            }).catch(function(err) {
                console.log(err);
                res.end(err);
            });
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
