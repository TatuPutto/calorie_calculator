var getConnection = require('../database/create-connection');
var setDailyGoal = require('../database/set-daily-goal');
var getDailyGoal = require('../database/get-daily-goal');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
/*
router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.status(403)
        res.end();
    }
});*/


var getConnection = require('../database/create-connection');

router.get('/test', (req, res) => {
    getConnection((err, connection) => {
        if(err) console.log(err);
        connection.query('SELECT * FROM consumedFoods WHERE userId = 123', (err, result) => {
            if(err) console.log(err);
            console.log(result);
        });
        connection.release();
    })




});


// return list of consumed foods for today
router.get('/', function (req, res) {
    getDailyGoal()
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

    setDailyGoal(123, energy, protein, carbs, fat)
        .then(() => res.redirect('/'))
        .catch((err) => res.end(err));
});

module.exports = router;
