var express = require('express')
var clientRoutes = require('./routes/client-routes');
var matchingFoods = require('./routes/matching-foods');
var dailyGoal = require('./routes/daily-goal');
var dailyIntake = require('./routes/daily-intake');
var favorites = require('./routes/favorites');

var port = process.env.PORT || 3000;
var app = express();

/*
app.get('/convert', (req, res) => {
    var convertToJson = require('./util/convert-to-json');
    convertToJson();
    res.end('123');
})
*/
app.use('/matching-foods', matchingFoods);
app.use('/daily-goal', dailyGoal);
app.use('/daily-intake', dailyIntake);
app.use('/favorites', favorites);
app.use('/', clientRoutes);

app.listen(port, () => console.log('Listening at port ' + port));
