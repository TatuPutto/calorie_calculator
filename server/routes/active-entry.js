var createConnection = require('../database/create-connection');
var getConsumedFoods = require('../database/get-consumed-foods');
var selectEntriesFromToday = require('../database/select-entries-from-today');
var selectLatestMealByUser = require('../database/select-latest-meal-by-user');
var insertEntryForToday = require('../database/insert-entry-for-today');
var insertMealForToday = require('../database/insert-meal-for-today');
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

// return list of entries for today
router.get('/', function (req, res) {
    selectEntriesFromToday(req.session.user.id)
        .then(function (consumedFoods) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(consumedFoods));
        })
        .catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

router.use(bodyParser.json());

// add new meal for today
router.post('/add-meal', function (req, res) {
    var userId = req.session.user.id;
    var mealName = req.body.mealName;

    if(!mealName) {
        res.status(422);
        res.end();
    } else {
        insertMealForToday(mealName, userId)
            .then(function (createdMeal) {
                console.log(createdMeal.mealId);
                // create placeholder entry
                insertEntryForToday(99999, 1, createdMeal.mealId, userId)
                    .then(function () {
                        console.log('luominen onnistui');
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(createdMeal));
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.end(err);
            });
    }
});


// add food and amount to list of consumed foods
router.post('/add-entry', function (req, res) {
    var userId = req.session.user.id;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;
    var mealId = req.body.mealId;

    if(!foodId || !foodAmount || !mealId) {
        res.status(422);
        res.end();
    } else {
        insertEntryForToday(foodId, foodAmount, mealId, userId)
            .then(function () {
                res.status(200);
                res.end();
            })
            .catch(function (err) {
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
            })
            .catch(function (err) {
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
        })
        .catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

module.exports = router;
