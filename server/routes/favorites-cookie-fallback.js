var findMatchingFoodsByIds = require('../util/query-csv').findMatchingFoodsByIds;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

// get favorite foods from cookie
router.get('/', function (req, res) {
    var favoriteFoodsCookie = req.cookies['favorites'];
    var favorites = favoriteFoodsCookie ? JSON.parse(favoriteFoodsCookie) : [];

    if(favorites) {
        var matchingFoods = findMatchingFoodsByIds(favorites);
        matchingFoods.forEach(function (food) {
            return food['favorite'] = true;
        });
        favorites = matchingFoods;
    }

    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify(favorites));
});

router.put('/:foodId', function (req, res) {
    var favoriteFoodsCookie = req.cookies['favorites'];
    var favorites = [];

    // pull values from favorites cookie if it exists
    if(favoriteFoodsCookie) {
        favorites = JSON.parse(favoriteFoodsCookie);
    }

    favorites.push(req.params.foodId);

    res.cookie('favorites', JSON.stringify(favorites));
    res.end();
});

router.delete('/:foodId', function (req, res) {
    var favoriteFoodsCookie = req.cookies['favorites'];
    if(favoriteFoodsCookie) {
        var favorites = JSON.parse(favoriteFoodsCookie);
        var index = favorites.indexOf(req.params.foodId);
        favorites.splice(index, 1);

        res.cookie('favorites', JSON.stringify(favorites));
    }
    res.end();
});

module.exports = router;
