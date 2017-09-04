var createConnection = require('../database/create-connection');
var getConsumedFoods = require('../database/get-consumed-foods');
var addFoodToConsumedFoods = require('../database/add-food-to-consumed-foods');
var updateConsumedFoodAmount = require('../database/update-consumed-food-amount');
var removeFoodFromConsumedFoods = require('../database/remove-food-from-consumed-foods');
var activeEntryCookieFallback = require('./active-entry-cookie-fallback');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

// use cookies to store consumed foods if user isn't logged in
router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        activeEntryCookieFallback(req, res);
    }
});

// return list of consumed foods for today
router.get('/', function (req, res) {
    getConsumedFoods(req.session.user.id)
        .then(function (consumedFoods) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(consumedFoods));
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

router.use(bodyParser.json());

// add food and amount to list of consumed foods
router.post('/', function (req, res) {
    var userId = req.session.user.id;
    var consumptionId = req.body.consumptionId;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;

    if(!consumptionId || !foodId || !foodAmount) {
        res.status(422);
        res.end();
    } else {
        addFoodToConsumedFoods(consumptionId, userId, foodId, foodAmount)
            .then(function () {
                res.status(200);
                res.end();
            }).catch(function (err) {
                res.status(400);
                res.end(err);
            });
    }
});

// update amount of consumed food in the list
router.patch('/', function (req, res) {
    var userId = req.session.user.id;
    var consumptionId = req.body.consumptionId;
    var foodAmount = req.body.foodAmount;

    if(!consumptionId || !foodAmount || foodAmount <= 0) {
        res.status(422);
        res.end();
    } else {
        updateConsumedFoodAmount(consumptionId, userId, foodAmount)
            .then(function () {
                res.status(200);
                res.end();
            }).catch(function (err) {
                res.status(400);
                res.end(err);
            });
    }
});


// remove item from list
router.delete('/', function (req, res) {
    var userId = req.session.user.id;
    var consumptionId = req.query.consumptionId;

    removeFoodFromConsumedFoods(userId, consumptionId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

module.exports = router;
