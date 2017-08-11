var checkUsernameAvailability = require('../database/check-username-availability');
var express = require('express');
var router = express.Router();

router.get('/:username', function (req, res) {
    checkUsernameAvailability(req.params.username)
        .then(function () {
            res.status(200).end('Käyttäjätunnus on saatavilla.');
        })
        .catch(function () {
            res.status(403).end('Käyttäjätunnus on jo käytössä.');
        });
});

module.exports = router;
