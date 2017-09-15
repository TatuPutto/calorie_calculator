var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var userInfo = {};
    if(req.session.user) {
        userInfo['loggedIn'] = req.session.user.loggedIn;
        userInfo['username'] = req.session.user.username;
    } else {
        userInfo['loggedIn'] = false;
        userInfo['username'] = 'Anonyymi';
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(userInfo));
});

module.exports = router;
