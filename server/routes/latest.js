var findMatchingFoodsByIds = require('../util/query-csv').findMatchingFoodsByIds;
var getLatestConsumedFoods = require('../database/get-latest-consumed-foods');
var getFavoriteFoods = require('../database/get-favorite-foods');
var findIndexOfObjectId = require('../util/find-index-of-object-id');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    if(req.session.user) {
        getLatestConsumedFoods(req.session.user.id)
            .then(function (latestConsumedFoods) {
                var matchingFoods = findMatchingFoodsByIds(latestConsumedFoods);

                // determine which of the foods are in users favorites
                getFavoriteFoods(req.session.user.id)
                    .then(function(favoriteFoods) {
                        for(var i = 0; i < favoriteFoods.length; i++) {
                            var index = findIndexOfObjectId(
                                favoriteFoods[i],
                                matchingFoods
                            );
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
