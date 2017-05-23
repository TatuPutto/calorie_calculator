var createConnection = require('../database/create-connection');
var getEntryDates = require('../database/get-entry-dates');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/current-entry');
    }
});

router.get('/', function (req, res) {
    getEntryDates(req.session.user.id)
        .then(function (dates) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(dates));
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

module.exports = router;
