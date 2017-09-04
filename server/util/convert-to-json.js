var fs = require('fs');
var round = require('./round-to-one-decimal');

var foods = fs.readFileSync('./server/ruuat.csv', 'utf8').split('\n');
var foodNames = [];
for(var i = 1; i < foods.length; i++) {
    var name = foods[i].split(';')[1];
   foodNames.push(name);
}

var nutritionValues = fs.readFileSync('./server/ravintoarvot.csv', 'utf8').split('\n');

var portionSizes = fs.readFileSync('./server/foodaddunit.csv', 'utf8').split('\n');


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
    var breakP = 1;
    //34306
    for(var i = 1; i <= 34306; i++) {
    //for(var i = 1; i <= 1000; i++) {
        var nutritionVal = asd(i, breakI);
        var portions = portion(i, breakP);
        console.log(portions);
        obj = nutritionVal[0];


        breakI = nutritionVal[1];
        breakP = portions[1];

        if(Object.keys(nutritionVal[0]).length > 0) {
            obj['name'] = getFoodName(i);
            obj['portionSizes'] = portions[0];
            console.log(obj);
            json[i] = obj;
        }

    }

    fs.writeFileSync('foods-with-portion-sizes.json', JSON.stringify(json), 'utf8');
}

function portion(num, breakP) {
    var portions = {};

    for(var i = breakP; i < portionSizes.length; i++) {
        if(portionSizes[i].split(';')[0] == num) {
            var prop = portionSizes[i].split(';')[1];
            var propReal;
            if(prop == 'PORTS') propReal = 'pieni annos';
            if(prop == 'PORTM') propReal = 'keskikokoinen annos';
            if(prop == 'PORTL') propReal = 'iso annos';

            if(prop == 'KPL_S') propReal = 'pieni kpl';
            if(prop == 'KPL_M') propReal = 'keskikokoinen kpl';
            if(prop == 'KPL_L') propReal = 'iso kpl';

            if(prop == 'DL') propReal = 'dl';
            if(prop == 'RKL') propReal = 'rkl';
            if(prop == 'TL') propReal = 'tl';

            portions[propReal] = Math.round(portionSizes[i].split(';')[2].replace(',', '.'));
        } else {
            breakP = i;
            break;
        }
    }
    return [portions, breakP];
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
