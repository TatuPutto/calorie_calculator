var checkLogin = require('../database/check-login');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    req.session.loginVisited = true;
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.use(bodyParser.urlencoded({extended: false}));

router.post('/', (req, res) => {
    if(!req.body.username || !req.body.password) {
        res.status(400);
        res.end('Syötä käyttäjätunnus sekä salasana.');
    }

    checkLogin(req.body.username, req.body.password)
        .then((userInfo) => {
            req.session.user = userInfo;
            res.redirect('/current-entry');
        })
        .catch((err) => {
            console.log(err);
            res.end('Kirjautuminen epäonnistui.');
        })
});

module.exports = router;
