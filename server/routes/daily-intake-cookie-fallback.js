var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

// get consumedFoods from cookie
router.get('/', function (req, res) {
    if(req.cookies['consumedFoods']) {
        var consumedFoods = JSON.parse(req.cookies['consumedFoods']);
        var consumedFoodsMapped = consumedFoods.map(function (item, i) {
            return {
                consumptionId: item.consumptionId,
                id: item.id,
                amount: item.amount,
                timeOfConsumption: item.timeOfConsumption,
            };
        });

        // get nutrition values per item
        var nutritionValuesPerItem = calcNutritionValues(consumedFoodsMapped);
        // calc sum of nutrition values across all consumed items
        var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);
        //return {nutritionValuesPerItem, nutritionValuesInTotal};

        res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
    }
    res.end();
});

router.use(bodyParser.json());

// add food and amount to cookie
router.post('/', function (req, res) {
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;

    if(!foodId || !foodAmount) {
        res.status(400);
        res.end();
    }

    var consumedFoods = [];
    // pull values from consumedFoods cookie if it exists
    if(req.cookies['consumedFoods']) {
        consumedFoods = JSON.parse(req.cookies['consumedFoods']);
    }

    consumedFoods.push({
        consumptionId: (consumedFoods.length + 1),
        id: foodId,
        amount: foodAmount,
        timeOfConsumption: new Date().getTime()
    });

    res.cookie('consumedFoods', JSON.stringify(consumedFoods));
    res.end();
});

router.delete('/', function (req, res) {
    var consumedFoods = req.cookies['consumedFoods']
    if(consumedFoods) {
        consumedFoods = JSON.parse(consumedFoods);
        var index = consumedFoods.findIndex(function (food) {
            return food.consumptionId == req.query.consumptionId;
        });

        consumedFoods.splice(index, 1);

        res.cookie('consumedFoods', JSON.stringify(consumedFoods));
    }
    res.end();
});


module.exports = router;
