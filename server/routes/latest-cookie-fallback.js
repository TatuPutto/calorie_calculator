var findMatchingFoodsByIds = require('../util/query-json').findMatchingFoodsByIds;
var calcNutritionValues = require('../util/query-json').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-json').calcTotalNutritionValues;
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

// get latest consumed foods from
router.get('/', function (req, res) {
    var latestConsumedFoods = [];
    var consumedFoodsCookie = req.cookies['consumedFoods'];

    if(consumedFoodsCookie) {
        var consumedFoods = JSON.parse(consumedFoodsCookie);
        var consumedFoodsMapped = consumedFoods.map(function (food) {
            return food.id;
        });

        latestConsumedFoods = findMatchingFoodsByIds(consumedFoodsMapped);
        latestConsumedFoods.reverse();
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(latestConsumedFoods));
});

module.exports = router;
