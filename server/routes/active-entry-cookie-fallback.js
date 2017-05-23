var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var setCookieExpirationDate = require('../util/cookie-expiration-date');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

// get consumedFoods from cookie
router.get('/', function (req, res) {
    var consumedFoodsCookie = req.cookies['consumedFoods'];

    var consumedFoods = consumedFoodsCookie ? JSON.parse(consumedFoodsCookie) : [];
    var consumedFoodsMapped = [];

    consumedFoods.forEach(function (food) {
        if(food.active) {
            consumedFoodsMapped.push({
                consumptionId: food.consumptionId,
                id: food.id,
                amount: food.amount,
                timeOfConsumption: food.timeOfConsumption,
            });
        }
    });

    // get nutrition values per item
    var nutritionValuesPerItem = calcNutritionValues(consumedFoodsMapped);
    // calc sum of nutrition values across all consumed items
    var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
});

router.use(bodyParser.json());

// add food and amount to cookie
router.post('/', function (req, res) {
    var consumptionId = req.body.consumptionId;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;

    if(!foodId || !foodAmount) {
        res.status(400);
        res.end();
    }

    var consumedFoodsCookie = req.cookies['consumedFoods'];
    var consumedFoods = [];

    // pull values from consumedFoods cookie if it exists
    if(consumedFoodsCookie) {
        consumedFoods = JSON.parse(consumedFoodsCookie);
    }

    consumedFoods.push({
        consumptionId: consumptionId,
        id: foodId,
        amount: foodAmount,
        timeOfConsumption: new Date().getTime(),
        active: true
    });

    res.cookie(
        'consumedFoods',
        JSON.stringify(consumedFoods),
        {maxAge: setCookieExpirationDate()}
    );
    res.end();
});

router.delete('/', function (req, res) {
    var consumedFoodsCookie = req.cookies['consumedFoods']
    if(consumedFoodsCookie) {
        consumedFoods = JSON.parse(consumedFoodsCookie);
        var index = consumedFoods.findIndex(function (food) {
            return food.consumptionId == req.query.consumptionId;
        });

        consumedFoods[index].active = false;
        //consumedFoods.splice(index, 1);

        res.cookie('consumedFoods', JSON.stringify(consumedFoods));
    }
    res.end();
});


module.exports = router;
