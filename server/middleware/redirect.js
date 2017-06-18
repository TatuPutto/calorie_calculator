var expressUseragent = require('express-useragent')
var url = require('url');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    var parsedUrl = url.parse(req.url);
    if(parsedUrl.pathname == '/') {
        res.redirect('/current-entry?sort=search&q=');
    } else {
        next();
    }
});

module.exports = router;
