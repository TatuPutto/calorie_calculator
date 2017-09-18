var createConnection = require('../database/create-connection');
var selectEntriesFromDate = require('../database/select-entries-from-date');
var selectNutritionValuesFromDateRange =
        require('../database/select-nutrition-values-from-date-range');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
});

router.get('/single/:date', function (req, res) {
    selectEntriesFromDate(req.params.date, req.session.user.id)
        .then(function (entry) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(entry));
        })
        .catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

router.get('/multiple/:week', function (req, res) {
    selectNutritionValuesFromDateRange(req.params.week, req.session.user.id)
        .then(function (nutritionValues) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(nutritionValues));
        })
        .catch(function (err) {
            console.log(err);
            res.status(400);
            res.end(err);
        });
});


module.exports = router;
