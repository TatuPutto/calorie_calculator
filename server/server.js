var express = require('express')
var clientRoutes = require('./routes/client-routes');
var matchingFoods = require('./routes/matching-foods');
var calculateNutritionValues = require('./routes/calculate-nutrition-values');
var dailyIntake = require('./routes/daily-intake');

var port = process.env.PORT || 3000;
var app = express();

app.use('/matching-foods', matchingFoods);
app.use('/calculate-nutrition-values', calculateNutritionValues);
app.use('/daily-intake', dailyIntake);
app.use('/', clientRoutes);

app.listen(port, () => console.log('Listening at port ' + port));
