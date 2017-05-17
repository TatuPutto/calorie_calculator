var createConnection = require('../database/create-connection');
var getConsumedFoods = require('../database/get-consumed-foods');
var addFoodToConsumedFoods = require('../database/add-food-to-consumed-foods');
var removeFoodFromConsumedFoods = require('../database/remove-food-from-consumed-foods');
var dailyIntakeWithCookies = require('./daily-intake-cookie-fallback');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        // use cookies to store consumed foods if user isn't logged in
        dailyIntakeWithCookies(req, res);
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
    console.log(req.body);
    var userId = req.session.user.id;
    var consumptionId = req.body.consumptionId;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;

    if(!consumptionId || !foodId || !foodAmount) {
        res.status(422);
        res.end();
    }

    addFoodToConsumedFoods(consumptionId, userId, foodId, foodAmount)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
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
