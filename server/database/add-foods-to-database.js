var getConnection = require('./create-connection');
var fs = require('fs');

var foods = fs.readFileSync('foods-with-portion-sizes.json' ,'utf8');
foods = JSON.parse(foods);
(function addFoodsToDatabase() {
    getConnection(function (err, connection) {
        if(err) throw err;

        var i = 0;
        for(var food in foods) {
            //i++;
            if(i > 1000) return;
            var foodId = food;


            var name = foods[food].name;
            var proteinPer100Grams = foods[food].protein;
            var carbPer100Grams = foods[food].carbohydrates;
            var fatPer100Grams = foods[food].fat;

            var query = `INSERT INTO foods (foodId, foodName, proteinPer100Grams, carbPer100Grams, fatPer100Grams) VALUES (${foodId}, "${name}", ${proteinPer100Grams}, ${carbPer100Grams}, ${fatPer100Grams})`
            console.log(query);
            connection.query(query, function (err, result) {
                connection.release();
                if(err) console.log(err);
            });
        }


    })
})();
