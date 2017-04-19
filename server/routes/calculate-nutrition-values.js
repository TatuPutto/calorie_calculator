var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.end(JSON.stringify(req.query));
});

module.exports = router;
