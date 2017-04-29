var path = require('path');
var express = require('express');
var router = express.Router();

// serve index.html on request to root
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// serve other static assets
router.get('/:file', function (req, res) {
    res.sendFile(path.join(__dirname, '../client', req.params.file));
});

module.exports = router;
