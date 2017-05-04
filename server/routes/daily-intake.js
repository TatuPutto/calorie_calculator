var createConnection = require('../database/create-connection');
var calcNutritionValues = require('../util/query-csv').calculateNutritionValues;
var calcTotalNutritionValues = require('../util/query-csv').calcTotalNutritionValues;
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();


// return list of consumed foods for today
router.get('/', function (req, res) {
    if(req.session.user) {
        var userId = req.session.user.id;
        var query = `SELECT consumptionId, foodId, foodAmount, timeOfConsumption ` +
                `FROM consumedfoods WHERE userId=${userId} AND active = 1`;
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
                return {
                    consumptionId: item.consumptionId,
                    id: item.foodId,
                    amount: item.foodAmount,
                    timeOfConsumption: item.timeOfConsumption
                };
            });

            // get nutrition values per item
            var nutritionValuesPerItem = calcNutritionValues(consumedFoods);
            // calc sum of nutrition values across all consumed items
            var nutritionValuesInTotal = calcTotalNutritionValues(nutritionValuesPerItem);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({nutritionValuesPerItem, nutritionValuesInTotal}));
        });

        // handle failed query
        dbQuery.catch(function (err) {
            res.end(JSON.stringify(err));
        });
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({nutritionValuesPerItem: [], nutritionValuesInTotal: {
            energy: 0,
            protein: 0,
            carbs: 0,
            fat: 0
        }}));
    }
});

router.use(bodyParser.json());

// add food and amount to list of consumed foods
router.post('/', function (req, res) {
    var userId = req.session.user.id;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;

    if(!foodId || !foodAmount) {
        res.status(422);
        res.end();
    }

    var query = `INSERT INTO consumedfoods (userId, foodId, foodAmount) ` +
            `VALUES (${userId}, ${foodId}, ${foodAmount})`;
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
    var query = `UPDATE consumedfoods SET active = 0 ` +
            `WHERE consumptionId = ${consumptionId}`;
    var connection = createConnection();

    connection.query(query, function (err, results) {
      if(err) throw err;
    });

    connection.end();
    res.end();
});

module.exports = router;
