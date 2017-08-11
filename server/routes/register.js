var checkUsernameAvailability = require('../database/check-username-availability');
var addUser = require('../database/add-user');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function (req, res) {
    checkUsernameAvailability(req.body.username)
        .then(function () {
            addUser(req.body.username, req.body.password)
                .then(function (userInfo) {
                    res.end('Rekisteröityminen onnistui');
                })
                .catch(function (err) {
                    res.status(400);
                    res.end('Rekisteröityminen epäonnistui.');
                });
        })
        .catch(function (err) {
            res.end('Rekisteröityminen epäonnistui.');
        });

});

module.exports = router;
