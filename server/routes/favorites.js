var selectFavoriteFoods = require('../database/select-favorite-foods');
var insertFoodToFavorites = require('../database/insert-food-to-favorites');
var deleteFoodFromFavorites = require('../database/delete-food-from-favorites');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    selectFavoriteFoods(req.session.user.id)
        .then(function (favoriteFoods) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(favoriteFoods));
        })
        .catch(function (err) {
            console.log(err);
            res.status(400);
            res.end();
        });
});

router.post('/:foodId', function (req, res) {
    insertFoodToFavorites(req.session.user.id, req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(403);
            res.end(err);
        });
});

router.delete('/:foodId', function (req, res) {
    deleteFoodFromFavorites(req.session.user.id, req.params.foodId)
        .then(function () {
            res.status(200);
            res.end();
        }).catch(function (err) {
            res.status(403);
            res.end(err);
        });
});

module.exports = router;
