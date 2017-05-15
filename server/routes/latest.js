var getLatestConsumedFoods = require('../database/get-latest-consumed-foods');
var getFavoriteFoodIds = require('../database/get-favorite-food-ids');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        getLatestConsumedFoods(req.session.user.id)
            .then(function (latestConsumedFoods) {

                // determine which of the foods are in users favorites
                getFavoriteFoodIds(req.session.user.id)
                    .then(function(favoriteFoods) {
                        for(var i = 0; i < favoriteFoods.length; i++) {
                            var index = latestConsumedFoods.findIndex(function (food) {
                                return food.foodId == favoriteFoods[i].foodId;
                            });
                            if(index !== -1) {
                                latestConsumedFoods[index]['favorite'] = true;
                            }
                        }

                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(latestConsumedFoods));
                    }).catch(function(err) {
                        console.log(err);
                        res.end(err);
                    });
            })
            .catch(function (err) {
                res.end(JSON.stringify(err));
            });
    } else {
        res.writeHead(403, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('Kirjaudu sisään nähdäksesi viimeisimmät lisäykset.'));
    }
});

module.exports = router;
