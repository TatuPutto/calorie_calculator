var getConnection = require('../database/create-connection');
var insertGoalForToday = require('../database/insert-goal-for-today');
var selectGoalFromDate = require('../database/select-goal-from-date');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();


// get goal set for date X
router.get('/:date', function (req, res) {
    selectGoalFromDate(req.session.user.id, req.params.date)
        .then(function (dailyGoal) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dailyGoal));
        })
        .catch(function () {
            res.status(400);
            res.end();
        });
});

router.use(bodyParser.urlencoded({extended: false}));

// set goal for today
router.post('/', function (req, res) {
    var energy = req.body.energy;
    var protein = req.body.protein;
    var carbs = req.body.carbs;
    var fat = req.body.fat;

    if(!energy || !protein || !carbs || !fat) {
        res.status(400);
        res.end('Täytä kaikki pakolliset kentät.');
    }

    insertGoalForToday(req.session.user.id, energy, protein, carbs, fat)
        .then(() => res.redirect('/'))
        .catch((err) => res.end(err));
});

module.exports = router;
