var registerUser = require('../database/register-user');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', function (req, res) {
    registerUser(req.body.username, req.body.password)
        .then(function (userInfo) {
            res.end('Rekisteröityminen onnistui');
        })
        .catch(function (err) {
            res.status(400);
            res.end('Rekisteröityminen epäonnistui.');
        });
});

module.exports = router;
