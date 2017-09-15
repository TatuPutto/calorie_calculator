var findMatchingFoodsByName = require('../util/query-json').findMatchingFoodsByName;
var selectLatestConsumedfoods = require('../database/select-latest-consumed-foods');
var markFoodsAsLatelyConsumed = require('../util/mark-foods-as-lately-consumed');
var selectFavoriteFoods = require('../database/select-favorite-foods');
var markFoodsAsFavorites = require('../util/mark-foods-as-favorites');
var selectMatchingFoods = require('../database/select-matching-foods');
var selectMatchingFoodsAndPrioritize = require(
    '../database/select-matching-foods-and-prioritize'
);
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());

router.get('/:searchTerm', function (req, res) {
    // find foods matching the search term and prioritize the results by
    // users history and wheter or not food is in users favorites
    selectMatchingFoodsAndPrioritize(req.params.searchTerm, req.session.user.id)
        .then(function (matchingFoods) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(matchingFoods));
        })
        .catch(function (err) {
            res.status(400);
            res.end();
        })
});

module.exports = router;
