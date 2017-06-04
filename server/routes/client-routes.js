var path = require('path');
var url = require('url');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/app/', 'index.html'));
});

module.exports = router;
