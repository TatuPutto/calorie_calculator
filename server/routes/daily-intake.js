var createConnection = require('../database/create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();


// return list of consumed foods for today
router.get('/', function (req, res) {
    var query = 'SELECT consumptionId, foodId, foodAmount, timeOfConsumption ' +
            'FROM consumedfoods WHERE userId = 123';
    var connection = createConnection();

    // execute query
    var dbQuery = new Promise(function (resolve, reject) {
        connection.connect();
        connection.query(query, function (err, results) {
          if(err) reject(err);
          resolve(results);
        });
        connection.end();
    });

    // handle successfull query response
    dbQuery.then(function (data) {

        var consumedFoods = data.map(function (item) {
            //console.log(item.timeOfConsumption);
            return {
                consumptionId: item.consumptionId,
                id: item.foodId,
                amount: item.foodAmount,
                timeOfConsumption: item.timeOfConsumption
            };
        });

        //console.log(consumedFoods);
        // get nutrition values per item
        var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
        // calc sum of nutrition values across all consumed items
        var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);
        //console.log(nutritionValuesPerItem);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
    });

    // handle failed query
    dbQuery.catch(function (err) {
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

    var query = `INSERT INTO consumedfoods (userId, foodId, foodAmount) ` +
            `VALUES (123, ${foodId}, ${foodAmount})`;
    var connection = createConnection();

    var dbQuery = new Promise(function (resolve, reject) {
        connection.query(query, function (err, results) {
          if(err) reject(err);
          resolve(results);
        });

        connection.end();
    });

    dbQuery.then(function (data) {
        res.end();
    });

    dbQuery.catch(function (err) {
        res.end(JSON.stringify(err));
    });
});

// remove item from list
router.delete('/', function (req, res) {
    var consumptionId = req.query.consumptionId;
    var query = `DELETE FROM consumedfoods WHERE consumptionId = ${consumptionId}`;
    var connection = createConnection();

    connection.query(query, function (err, results) {
      if(err) throw err;
    });

    connection.end();
    res.end();
});

module.exports = router;
