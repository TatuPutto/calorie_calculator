var path = require('path');
var url = require('url');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    req.session.cookiesAccepted = true;
    res.cookie('cookiesAccepted', true, {maxAge: (365 * 24 * 60 * 60 * 1000)});
    res.end();
});

module.exports = router;
