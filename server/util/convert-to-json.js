var fs = require('fs');
//var round = require('./round-to-one-decimal');
var createConnection = require('../database-util/create-connection');
var foods = fs.readFileSync('./food.csv', {encoding: 'utf-8'}).split('\n');
var nutritionValues = fs.readFileSync('./component_value.csv', 'utf8').split('\n');
//var portionSizes = fs.readFileSync('./foodaddunit.csv', 'utf8').split('\n');
var foodNames = [];


for(var i = 1; i < foods.length; i++) {
    var name = foods[i].split(';')[1];
   foodNames.push(name);
}


function getFoodName(id) {
    for(var i = 1; i < foods.length; i++) {
        if(foods[i].split(';')[0] == id) {
            return foods[i].split(';')[1];
        }
    }
}

function addFoodsAndPortionSizesToDatabase() {
    var webScrapedFoods = fs.readFileSync('./web-scraped-foods.json', 'utf-8');
    var nutritionValues = fs.readFileSync('./foods-with-portion-sizes.json', 'utf8');
    var webScrapedFoods = JSON.parse(webScrapedFoods);
    var parsedNutritionValues = JSON.parse(nutritionValues);
    var concattedObj = Object.assign(parsedNutritionValues, webScrapedFoods);


    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fooddiary'
    });

    connection.connect();

    for(var id in concattedObj) {
        var food = concattedObj[id];
        var name = food.name;
        var energy = food.energy;
        var protein = food.protein;
        var carbs = food.carbohydrates;
        var fat = food.fat;
        var portionSizes = food.portionSizes ? JSON.stringify(food.portionSizes) : null;

        var query = `
            INSERT INTO foods (foodId, foodName, energy, protein, carbs, fat, portionSizes)
            VALUES (${id}, "${name}", "${energy}", "${protein}", "${carbs}", "${fat}", '${portionSizes}')
        `;

        connection.query(query);
    }

    connection.end();

    return;
}

addFoodsAndPortionSizesToDatabase();

function createJSONfoodlist() {
    var json = {};
    var breakI = 1;
    var breakP = 1;
    //34306
    for(var i = 1; i <= 34306; i++) {
    //for(var i = 1; i <= 1000; i++) {
        var nutritionVal = asd(i, breakI);
        //var portions = portion(i, breakP);
        //console.log(portions);
        obj = nutritionVal[0];


        breakI = nutritionVal[1];
        //breakP = portions[1];

        if(Object.keys(nutritionVal[0]).length > 0) {
            obj['name'] = getFoodName(i);
            //obj['portionSizes'] = portions[0];
            console.log(obj);
            json[i] = obj;
        }

    }

    fs.writeFileSync('foods.json', JSON.stringify(json), 'utf8');
}

//createJSONfoodlist();

function createJSONfoodlistWithPortionSizes() {
    var latestMealName = '';
    var foodNamesWithLessDuplicates = [];

    for(var foodName of foodNames) {
        if(foodName) {
            var firstWord = foodName.split(' ')[0];
            if(firstWord != latestMealName && foodNamesWithLessDuplicates.indexOf(firstWord) === -1) {
                latestMealName = firstWord;
                foodNamesWithLessDuplicates.push(firstWord);
            }
        }

    }

    console.log('original length: ' +  foodNames.length + '\nvs :' + foodNamesWithLessDuplicates.length);

    fs.writeFileSync('food-names.json', JSON.stringify(foodNamesWithLessDuplicates), 'utf8');

}
//createJSONfoodlistWithPortionSizes();


function createJSONfoodlistOnlyNames() {
    var foodNamesArray = {};
    var breakI = 1;

    //34306
    for(var i = 1; i <= 34306; i++) {
    //for(var i = 1; i <= 1000; i++) {
        var nutritionVal = asd(i, breakI);
        //obj = nutritionVal[0];


        breakI = nutritionVal[1];

        if(Object.keys(nutritionVal[0]).length > 0) {
            //var  = getFoodName(i);
            console.log(obj);
            json[i] = obj;
        }
    }

    fs.writeFileSync('food-names.json', JSON.stringify(json), 'utf8');
}
//createJSONfoodlistOnlyNames();

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
                if(prop == 'CHOAVL') type = 'carbs';
                if(prop == 'PROT') type = 'protein';
                if(prop == 'FAT') type = 'fat';
                if(type == 'energy') {
                    value = nutritionValues[i].split(';')[2].replace(',', '.');
                    value = Math.round(value / 4.184);
                } else {
                    value = nutritionValues[i].split(';')[2].replace(',', '.');
                    value = Math.round(value * 10) / 10;
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
