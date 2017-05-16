var getConnection = require('../database/create-connection');
var setDailyGoal = require('../database/set-daily-goal');
var getDailyGoal = require('../database/get-daily-goal');
var dailyGoalWithCookies = require('./daily-goal-cookie-fallback');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        dailyGoalWithCookies(req, res);
    }
});

router.get('/', function (req, res) {
    getDailyGoal(req.session.user.id)
        .then(function (dailyGoal) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dailyGoal));
        }).catch(function (err) {
            res.status(400);
            res.end();
        });
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function (req, res) {
    var energy = req.body.energy;
    var protein = req.body.protein;
    var carbs = req.body.carbs;
    var fat = req.body.fat;

    if(!energy || !protein || !carbs || !fat) {
        res.status(400);
        res.end('Täytä kaikki pakolliset kentät.');
    }

    setDailyGoal(req.session.user.id, energy, protein, carbs, fat)
        .then(() => res.redirect('/'))
        .catch((err) => res.end(err));
});

module.exports = router;
