var checkLogin = require('../database/check-login');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../login.html'));
});

router.use(bodyParser.urlencoded(false));

router.post('/', (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.end('Syötä käyttäjätunnus sekä salasana.');
    }

    checkLogin(req.body.username, req.body.password)
        .then((userInfo) => {
            req.session.user = userInfo;
            console.log('sessiossa');
            console.log(req.session.user);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.end('Login failed');
        })
});

module.exports = router;
