var url = require('url');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    var parsedUrl = url.parse(req.url);
    var pathname = parsedUrl.pathname;

    if(req.session.loginVisited || pathname == '/login' ||
            pathname == '/accept-cookies') {
        next();
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
