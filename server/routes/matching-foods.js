var getMatchingFoods = require('../database/get-matching-foods');
var getFavoriteFoodIds = require('../database/get-favorite-food-ids');
var express = require('express');

var router = express.Router();

router.get('/:food', function (req, res) {
    getMatchingFoods(req.params.food)
        .then(function (matchingFoods) {

        // get favorite foods if user is logged in
        if(req.session.user && matchingFoods.length > 0) {
            // determine which of the foods are in users favorites
            getFavoriteFoodIds(req.session.user.id)
                .then(function(favoriteFoods) {
                    for(var i = 0; i < favoriteFoods.length; i++) {
                        var index = matchingFoods.findIndex(function (food) {
                            return food.foodId == favoriteFoods[i].foodId;
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
    }).catch(function (err) {
        res.status(400);
        res.end();
    })
});

module.exports = router;
