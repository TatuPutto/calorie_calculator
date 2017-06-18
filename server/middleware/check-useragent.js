var expressUseragent = require('express-useragent')
var express = require('express');
var router = express.Router();

router.use(expressUseragent.express());
router.use(function (req, res, next) {
    var ua = req.useragent;
    if(ua.isIE || ua.isEdge || ua.isFirefox || ua.isChrome || ua.isOpera) {
        next();
    } else {
        res.end('Your browser is not currently supported!');
    }
});

module.exports = router;
