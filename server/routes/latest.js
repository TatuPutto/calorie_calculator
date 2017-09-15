var selectLatestConsumedfoods = require('../database/select-latest-consumed-foods');
var latestCookieFallback = require('./latest-cookie-fallback');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        latestCookieFallback(req, res);
    }
});

router.get('/', function (req, res) {
    selectLatestConsumedfoods(req.session.user.id)
        .then(function (latestConsumedFoods) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(latestConsumedFoods));
        })
        .catch(function(err) {
            console.log(err);
            res.status(400).end(err);
        });
});

module.exports = router;
