var selectLatestConsumedfoods = require('../database/select-latest-consumed-foods');
var express = require('express');
var router = express.Router();


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
