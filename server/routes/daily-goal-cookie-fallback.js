var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

// get daily goal from cookie
router.get('/', function (req, res) {
    var dailyGoalCookie = req.cookies['dailyGoal'];
    var dailyGoal = dailyGoalCookie ? JSON.parse(dailyGoalCookie) : null;

    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify(dailyGoal));
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function (req, res) {
    var energy = req.body.energy;
    var protein = req.body.protein;
    var carbohydrates = req.body.carbs;
    var fat = req.body.fat;

    if(!energy || !protein || !carbohydrates || !fat) {
        res.status(400);
        res.end('Täytä kaikki pakolliset kentät.');
    }

    var dailyGoal = {energy, protein, carbohydrates, fat};
    res.cookie('dailyGoal', JSON.stringify(dailyGoal));
    res.end();
});

module.exports = router;
