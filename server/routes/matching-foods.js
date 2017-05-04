var findMatchingFoodsByName = require('../util/query-csv').findMatchingFoodsByName;
var getFavoriteFoods = require('../database/get-favorite-foods');
var express = require('express');

var router = express.Router();

router.get('/:food', function (req, res) {
    var matchingFoods = findMatchingFoodsByName(req.params.food);

    // get favorite foods if user is logged in
    if(req.session.user) {
        // determine which of the foods are in users favorites
        getFavoriteFoods(req.session.user.id)
            .then(function(favoriteFoods) {
                for(var i = 0; i < favoriteFoods.length; i++) {
                    var index = matchingFoods.findIndex(function (food) {
                        return food.id == favoriteFoods[i];
                    });
                    if(index !== -1) {
                        matchingFoods[index]['favorite'] = true;

                        // move favorite foods to front
                        var moveThis = matchingFoods.splice(index, 1)[0];
                        matchingFoods.unshift(moveThis);
                    }
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(matchingFoods));
            }).catch(function(err) {
                console.log(err);
                res.end(err);
            });
    } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(matchingFoods));
    }
});

module.exports = router;
