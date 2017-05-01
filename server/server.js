var express = require('express')
var clientRoutes = require('./routes/client-routes');
var matchingFoods = require('./routes/matching-foods');
var calculateNutritionValues = require('./routes/calculate-nutrition-values');
var dailyIntake = require('./routes/daily-intake');

var port = process.env.PORT || 3000;
var app = express();


app.get('/convert', (req, res) => {
    var convertToJson = require('./util/convert-to-json');

    convertToJson();
    res.end('345');
});


app.get('/crawler', (req, res) => {
    require('request')({ uri: 'http://kalorilaskuri.fi/ravintosisalto?filter=maitorahka', encoding: 'utf8'}, function (error, response, body) {
        if(error) {
             console.log("Error: " + error);
        }
        response.setEncoding('utf16le');
        console.log(body);
        // Check status code (200 is HTTP OK)
        console.log("Status code: " + response.statusCode);
        if(response.statusCode === 200) {
         // Parse the document body
         var $ = require('cheerio').load(body);
         var tableRows = $('table > tr.pois');
         //var tableRows = cheerio('table > tr.pois > td.listahk');
         //var td = $(tableRows + ' > td.listahk');

        //console.log(tableRows.text());
        //console.log(tableRows.text());

        //console.log(tableRows);


         //console.log(td[0]);

         //var child = tableRows[0].children[6];

        var foods = {};
        var success = 1;
         for(var i = 0; i < tableRows.length; i++) {
             var row = tableRows[i];
            var food = {};
            for(var j = 1; j < row.children.length; j++) {
                //console.log('lapsi ' + row.children[j]);
                var childrenIsTable = row.children[j].children[0];
                //if(childrenIsTable.type == 'table')
                //if(j === 1)
                //console.log(childrenIsTable.name);
                var child = row.children[j].children[0].data;
                if(childrenIsTable.name == 'table') {
                    console.log('löyty');
                    child = childrenIsTable.children[0].children[0].children[0].data;
                }
                //console.log(childrenIsTable);
                /*if(childrenIsTable.attribs.hasOwnPropery('class') && childrenIsTable.attribs.class == 'listahk') {
                    console.log('löytyi');
                    break;
                }*/

                //console.log(child);

                if(child) {
                    var keys = Object.keys(food).length;
                    var replaceGrams = String.fromCharCode(160) + 'g';
                    var replaceKcal = String.fromCharCode(160) + 'kcal';

                    if(keys === 0) {
                        food['name'] = child.replace(/[^a-z0-9 ,.?!%()<>-+]/ig, 'ä').trim();
                    } else if(keys === 1) {
                        food['energy'] = child.trim().replace(',', '.').replace(replaceKcal, '')
                    } else if(keys === 2) {
                        food['protein'] = child.trim().replace(',', '.').replace(replaceGrams, '')
                    } else if(keys === 3) {
                        food['carbohydrates'] = child.trim().replace(',', '.').replace(replaceGrams, '')
                    } else if(keys === 4) {
                        food['fat'] = child.trim().replace(',', '.').replace(replaceGrams, '')
                    }
                }
                /*if(j > 1) {
                    break;
                }*/
            }
            if(food.energy !== ''  && food.protein!== '' && food.carbs!== ''  && food.carb!== '' ) {

                var foodId = (success + 34306);
                foods[foodId] = food;
                success++;
            } else {

            }




            //if(i > 5) {
                //break;
            //}


        }

         require('fs').writeFileSync('maitorahka.json', JSON.stringify(foods), 'utf8');
         //const $ = cheerio.load('<ul id="fruits">...</ul>');
        }
        //34306



        res.end('123')
    });

});


app.use('/matching-foods', matchingFoods);
app.use('/calculate-nutrition-values', calculateNutritionValues);
app.use('/daily-intake', dailyIntake);
app.use('/', clientRoutes);



app.listen(port, () => console.log('Listening at port ' + port));
