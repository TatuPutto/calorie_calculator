var express = require('express')
var matchingFoods = require('./routes/matching-foods');
var calculateNutritionValues = require('./routes/calculate-nutrition-values');

var port = process.env.PORT || 3000;
var app = express();

app.use('/matching-foods', matchingFoods);
app.use('/calculate-nutrition-values', calculateNutritionValues);

app.listen(port, () => console.log('Listening at port ' + port));
