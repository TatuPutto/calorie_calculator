var checkUsernameAvailability = require('../database/check-username-availability');
var createUser = require('../database/create-user');
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
            var userId = Math.floor(Math.random() * 1000000000);

            createUser(userId, req.body.username, req.body.password)
                .then(function (userInfo) {
                    req.session.user = userInfo;
                    res.redirect('/current-entry');
                })
                .catch(function (err) {
                    throw err;
                });
        })
        .catch(function (err) {
            res.send('Rekisteröityminen epäonnistui.');
            res.end();
        });
});

module.exports = router;
