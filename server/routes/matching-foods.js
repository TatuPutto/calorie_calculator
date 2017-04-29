var getMatchingFoods = require('../util/query-csv').getMatchingFoods;
var express = require('express');

var router = express.Router();

router.get('/:food', function (req, res) {
    var matchingFoods = getMatchingFoods(req.params.food);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(matchingFoods));
});


module.exports = router;
