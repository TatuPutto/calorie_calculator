var path = require('path');
var express = require('express');
var router = express.Router();

// serve index.html on request to root
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/app/static', 'index.html'));
});

// serve other static assets
router.get('/:file', function (req, res) {
    var ext = req.params.file.split('.')[1];
    ext = (ext == 'js') ? 'js/components' : ext;
    res.sendFile(path.join(
            __dirname, '../../client/app/', ext, '/', req.params.file));
});

module.exports = router;
