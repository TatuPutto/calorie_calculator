var path = require('path');
var url = require('url');
var express = require('express')
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var acceptCookies = require('./routes/accept-cookies');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var userInfo = require('./routes/user-info');
var clientRoutes = require('./routes/client-routes');
var matchingFoods = require('./routes/matching-foods');
var dailyGoal = require('./routes/daily-goal');
var activeEntry = require('./routes/active-entry');
var favorites = require('./routes/favorites');
var latest = require('./routes/latest');
var diaryEntries = require('./routes/diary-entries');
var getEntry = require('./routes/get-entry');
var port = process.env.PORT || 3000;
var app = express();

// block usage with safari
app.use(require('express-useragent').express());
app.use(function (req, res, next) {
    if(req.useragent.isSafari) {
        res.end('Safari is not currently supported!');
    }
    next();
});

app.use(session({
    cookieName: 'session',
    secret: 'gjkrejtGSDFGertjksfdv<JLfjdsalfsadtjwekWRAsdf',
    duration: (7 * 24 * 60 * 60 * 1000)
}));

app.use(function (req, res, next) {
    var parsedUrl = url.parse(req.url);
    if(parsedUrl.pathname == '/') {
        res.redirect('/current-entry');
    } else {
        next();
    }
});

app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, './public')));

app.use(function (req, res, next) {
    var parsedUrl = url.parse(req.url);
    var pathname = parsedUrl.pathname;

    if(req.session.loginVisited || pathname == '/login' ||
            pathname == '/accept-cookies') {
        next();
    } else {
        res.redirect('/login');
    }
});

app.use('/accept-cookies', acceptCookies);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/user-info', userInfo);
app.use('/matching-foods', matchingFoods);
app.use('/daily-goal', dailyGoal);
app.use('/favorites', favorites);
app.use('/latest', latest);
app.use('/active-entry', activeEntry);
app.use('/entry', getEntry);
app.use('/diary-entries', diaryEntries);
app.use('*', clientRoutes);

app.listen(port, () => console.log('Listening at port ' + port));
