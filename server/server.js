var path = require('path');
var url = require('url');
var express = require('express')
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var checkUseragent = require('./middleware/check-useragent');
var firstVisit = require('./middleware/first-visit');
var redirect = require('./middleware/redirect');
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

// check that user is using supported browser (Chrome, Firefox, Opera, IE or Edge)
app.use(checkUseragent);

app.use(session({
    cookieName: 'session',
    secret: 'gjkrejtGSDFGertjksfdv<JLfjdsalfsadtjwekWRAsdf',
    duration: (7 * 24 * 60 * 60 * 1000)
}));

// redirect root requests to /current-entry
app.use(redirect);
app.use(express.static(path.join(__dirname, '../client/app')));
app.use(express.static(path.join(__dirname, './public')));
// only allow user to access the page
// after login has been visited and cookies are accepted
app.use(firstVisit);

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
