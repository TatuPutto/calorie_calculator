var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();



// return list of consumed foods for today
router.get('/', function (req, res) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'calorie_calculator'
    });

    connection.connect();


    var promise = new Promise(function (resolve, reject) {
        connection.query('SELECT food_id, food_amount FROM consumed_foods WHERE user_id = 123', function (err, results, fields) {
          if(err) reject(err);
          resolve(results);
        });

        connection.end();
    })
    promise.then(function (data) {
        var consumedFoods = data.map(function (item) {
            return {
                id: item.food_id,
                amount: item.food_amount
            };
        });

        // get nutrition values per item
        var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
        // calc sum of nutrition values across all consumed items
        var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
    });
    promise.catch(function (err) {
        res.end(JSON.stringify(err));
    });
});

router.use(bodyParser.json());

// add food and amount to list of consumed foods
router.post('/', function (req, res) {
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;
    if(!foodId || !foodAmount) {
        res.status(422);
        res.end();
    }

    console.log('Otetaan vastaan ruoka:' + req.body.foodId);
    console.log('Otetaan vastaan määrä:' + req.body.foodAmount);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'calorie_calculator'
    });

    connection.connect();



    var promise = new Promise(function (resolve, reject) {
        connection.query(`INSERT INTO consumed_foods (user_id, food_id, food_amount) VALUES (123, ${foodId}, ${foodAmount})`, function (err, results, fields) {
          if(err) reject(err);
          resolve(results);
        });

        connection.end();
    })
    promise.then(function (data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Lisääminen onnistui');
    });
    promise.catch(function (err) {
        res.end(JSON.stringify(err));
    });



    res.end(JSON.stringify('post'));
});

// remove item from list
router.delete('/', function (req, res) {

});

module.exports = router;
