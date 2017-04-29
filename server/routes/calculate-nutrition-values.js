var express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(req.query));
});

module.exports = router;
