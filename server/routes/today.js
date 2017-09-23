var selectEntriesFromToday = require('../database/select-entries-from-today');
var insertEntryForToday = require('../database/insert-entry-for-today');
var insertMealForToday = require('../database/insert-meal-for-today');
var updateEntry = require('../database/update-entry');
var updateMealName = require('../database/update-meal-name');
var setMealAsInactive = require('../database/set-meal-as-inactive');
var setEntryAsInactive = require('../database/set-entry-as-inactive');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();


// return list of entries for today
router.get('/', function (req, res) {
    selectEntriesFromToday(req.session.user.id)
        .then(function (results) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(results));
        })
        .catch(function () {
            res.status(400);
            res.end();
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
                var consumptionId = new Date().getTime().toString();

                // create placeholder entry
                insertEntryForToday(consumptionId, 99999, 1, createdMeal.mealId, userId)
                    .then(function () {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({
                            id: createdMeal.mealId,
                            name: createdMeal.mealName,
                            foods: []
                        }));
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.end(err);
            });
    }
});

// add new entry for today
router.post('/add-entry', function (req, res) {
    var userId = req.session.user.id;
    var consumptionId = req.body.consumptionId;
    var foodId = req.body.foodId;
    var foodAmount = req.body.foodAmount;
    var mealId = req.body.mealId;

    if(!consumptionId || !foodId || !foodAmount || !mealId) {
        res.status(422);
        res.end();
    } else {
        insertEntryForToday(consumptionId, foodId, foodAmount, mealId, userId)
            .then(function () {
                res.status(200);
                res.end();
            })
            .catch(function () {
                res.status(400);
                res.end();
            });
    }
});

// update meal name
router.patch('/update-meal', function (req, res) {
    var userId = req.session.user.id;
    var mealId = req.body.mealId;
    var mealName = req.body.mealName;

    if(!mealId || !mealName) {
        res.status(422);
        res.end();
    } else {
        updateMealName(mealId, mealName)
            .then(function () {
                res.status(200);
                res.end();
            })
            .catch(function () {
                res.status(400);
                res.end();
            });
    }
});

// update entry
router.patch('/update-entry', function (req, res) {
    var userId = req.session.user.id;
    var consumptionId = req.body.consumptionId;
    var foodAmount = req.body.foodAmount;

    if(!consumptionId || !foodAmount || foodAmount <= 0) {
        res.status(422);
        res.end();
    } else {
        updateEntry(consumptionId, userId, foodAmount)
            .then(function () {
                res.status(200);
                res.end();
            })
            .catch(function () {
                res.status(400);
                res.end();
            });
    }
});

// set meal and all the entries associated with it as inactive
router.patch('/remove-meal', function (req, res) {
    if(!req.query.mealId) {
        res.status(422);
        res.send('Poistettavan ateria ID täytyy olla määritelty.');
        res.end();
    }

    setMealAsInactive(req.query.mealId)
        .then(function () {
            res.status(200);
            res.end();
        })
        .catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

// set single entry as inactive
router.patch('/remove-entry', function (req, res) {
    if(!req.query.consumptionId) {
        res.status(422);
        res.send('Poistettavan merkinnän ID täytyy olla määritelty.');
        res.end();
    }

    setEntryAsInactive(req.query.consumptionId)
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
