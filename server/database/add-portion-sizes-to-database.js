var getConnection = require('./create-connection');
var fs = require('fs');

var foods = fs.readFileSync('foods-with-portion-sizes.json' ,'utf8');
foods = JSON.parse(foods);

(function addPortionsToDatabase() {
    getConnection(function (err, connection) {
        if(err) throw err;

        var i = 0;
        for(var food in foods) {
            var foodPortions = foods[food].portionSizes;
            for(var portion in foodPortions) {
                var portionName = portion;
                var portionSize = foodPortions[portion];
                var foodId = food;

                var query = `INSERT INTO portionSizes (portionName, portionSize, foodId) VALUES ("${portionName}", ${portionSize}, ${foodId})`;

                connection.query(query);
            }
        }

    })
})();
