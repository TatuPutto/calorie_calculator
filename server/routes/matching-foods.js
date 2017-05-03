var findMatchingFoodsByName = require('../util/query-csv').findMatchingFoodsByName;
var getFavoriteFoods = require('../database/get-favorite-foods');
var express = require('express');

var router = express.Router();

router.get('/:food', function (req, res) {
    var matchingFoods = findMatchingFoodsByName(req.params.food);

    getFavoriteFoods()
        .then(function(favoriteFoods) {
            for(var i = 0; i < favoriteFoods.length; i++) {
                var index = matchingFoods.findIndex(function (food) {
                    return food.id == favoriteFoods[i];
                });
                if(index !== -1) {
                    matchingFoods[index]['favorite'] = true;
                }
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(matchingFoods));
        }).catch(function(err) {
            console.log(err);
            res.end(err);
        });
});


module.exports = router;
