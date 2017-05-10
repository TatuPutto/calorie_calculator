var createConnection = require('../database/create-connection');
var setDailyGoal = require('../database/set-daily-goal');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.status(403)
        res.end();
    }
});

// return list of consumed foods for today
router.get('/', function (req, res) {
    var query = 'SELECT energy, protein, carbohydrates, fat ' +
            'FROM dailygoals WHERE userId = 123';
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
        var dailyGoal = {
            energy: data[0].energy,
            protein: data[0].protein,
            carbs: data[0].carbohydrates,
            fat: data[0].fat
        }

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(dailyGoal));
    });

    // handle failed query
    dbQuery.catch(function (err) {
        console.log(err);
        res.end(JSON.stringify(err));
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
