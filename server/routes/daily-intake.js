var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

// return list of consumed foods for today
router.get('/', function (req, res) {
    var consumedFoods = [
        {
            food: 'Suklaa, keskiarvo',
            id: 6,
            amount: 200
        },
        {
            food: 'Lakritsi',
            id: 8,
            amount: 100
        }
    ];

    // get nutrition values per item
    var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
    // calc sum of nutrition values across all consumed items
    var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);
    console.log(nutritionValuesInTotal);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
});

router.use(bodyParser.json());

// add food and amount to list of consumed foods
router.post('/', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.end(JSON.stringify('post'));
});

// remove item from list
router.delete('/', function (req, res) {

});

module.exports = router;
