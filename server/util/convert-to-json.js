var fs = require('fs');
var round = require('./round-to-one-decimal');

var foods = fs.readFileSync('./server/ruuat.csv', 'utf8').split('\n');
var foodNames = [];
for(var i = 1; i < foods.length; i++) {
    var name = foods[i].split(';')[1];
   foodNames.push(name);
}


var nutritionValues = fs.readFileSync('./server/ravintoarvot.csv', 'utf8').split('\n');


function getFoodName(id) {
    for(var i = 1; i < foods.length; i++) {
        if(foods[i].split(';')[0] == id) {
            return foods[i].split(';')[1];
        }
    }
}

module.exports = function convertToJson() {
    var json = {};
    var breakI = 1;
    //34306
    for(var i = 1; i <= 34306; i++) {
        var asdf = asd(i, breakI);

        obj = asdf[0];
        breakI = asdf[1];

        if(Object.keys(asdf[0]).length > 0) {
            obj['name'] = getFoodName(i);
            json[i] = obj;
        }

    }

    fs.writeFileSync('foods.json', JSON.stringify(json), 'utf8');
}

function asd(num, breakI) {
    var all = {};

    for(var i = breakI; i < nutritionValues.length; i++) {
        if(nutritionValues[i].split(';')[0] == num) {
            var prop = nutritionValues[i].split(';')[1];
            if(nutritionValues[i].split(';')[0] == num && prop == 'ENERC' ||
                prop == 'CHOAVL' || prop == 'FAT' || prop == 'PROT') {

                var type;
                var value;
                if(prop == 'ENERC') type = 'energy';



                if(prop == 'CHOAVL') type = 'carbohydrates';
                if(prop == 'PROT') type = 'protein';
                if(prop == 'FAT') type = 'fat';


                if(type == 'energy') {
                    value = nutritionValues[i].split(';')[2].replace(',', '.');
                    value = Math.round(value / 4.184);
                } else {
                    value = nutritionValues[i].split(';')[2].replace(',', '.');
                    value = round(value);
                }

                all[type] = value;
            }
        } else {
            breakI = i;
            break;
        }
    }
    return [all, breakI];
}
