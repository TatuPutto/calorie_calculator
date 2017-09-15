var createTemporaryUser = require('../database/create-temporary-user');
var cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

router.use(cookieParser());
router.use(function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        var userId = req.cookies['userId'];

        if(userId) {
            req.session.user = {id: userId};
            next();
        } else {
            var userId = Math.floor(Math.random() * 1000000000);

            createTemporaryUser(userId)
                .then(function () {
                    res.cookie(
                        'userId',
                        userId,
                        {maxAge: (7 * 24 * 60 * 60 * 1000)}
                    );
                    next();
                })
                .catch(function (err) {
                    console.log(err);
                    next();
                })
        }
    }
});

module.exports = router;
