var createConnection = require('../database/create-connection');
var getEntriesFromPast7Days = require('../database/get-past-7-days');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
});

router.get('/', function (req, res) {
    getEntriesFromPast7Days(req.session.user.id)
        .then(function (diaryEntries) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(diaryEntries));
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

module.exports = router;
