var createConnection = require('../database/create-connection');
var getEntryFromDate = require('../database/get-entry-from-date');
var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
});

router.get('/:entry', function (req, res) {
    getEntryFromDate(req.session.user.id, req.params.entry)
        .then(function (entry) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(entry));
        }).catch(function (err) {
            res.status(400);
            res.end(err);
        });
});

module.exports = router;
