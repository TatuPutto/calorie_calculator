var fs = require('fs');

var foodList = fs.readFileSync('./server/test.json', 'utf8');
foodList = JSON.parse(foodList);

function findMatchingFoodsFromCSV(input) {
    input = input.toLowerCase().trim();
    var matchingFoods = [];

    for(foodId in foodList) {
        var foodName = foodList[foodId].name.toLowerCase();
        if(foodName.startsWith(input)) {
            var kcals = Number(foodList[foodId].ENERC.split(',')[0]) / 4.186;
            kcals = round(kcals.toString());


            matchingFoods.push({
                id: foodId,
                name: foodName,
                energy: foodList[foodId].ENERC + ' kJ (' + kcals + ')',
                protein: foodList[foodId].PROT,
                fat: foodList[foodId].FAT,
                carbs: foodList[foodId].CHOAVL,
            });
        }



    }
    return matchingFoods.sort();
}


function getNutritionValues(foodId) {
    var parsedNutritionValues = {};
    return foodId;
/*

    for(var i = 1; i < parsedFoodList.length - 1; i++) {



        var id = nutritionValues[i].split(';')[0];
        var type = nutritionValues[i].split(';')[1];

        if(+id === +foodId) {
            if(type == 'ENERC') {
                parsedNutritionValues['energy'] = nutritionValues[i].split(';')[2].split(',')[0];
            } else if(type == 'PROT') {
                parsedNutritionValues['protein'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Proteiinia: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'FAT') {
                parsedNutritionValues['fat'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Rasvaa: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'CHOAVL') {
                parsedNutritionValues['carbohydrates'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Hiilihydraatteja: ' + round(nutritionValues[i].split(';')[2]));
            }
        }
    }
    return parsedNutritionValues;*/

/*
    for(var i = 1; i < nutritionValues.length - 1; i++) {
        var id = nutritionValues[i].split(';')[0];
        var type = nutritionValues[i].split(';')[1];

        if(+id === +foodId) {
            if(type == 'ENERC') {
                parsedNutritionValues['energy'] = nutritionValues[i].split(';')[2].split(',')[0];
            } else if(type == 'PROT') {
                parsedNutritionValues['protein'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Proteiinia: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'FAT') {
                parsedNutritionValues['fat'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Rasvaa: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'CHOAVL') {
                parsedNutritionValues['carbohydrates'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Hiilihydraatteja: ' + round(nutritionValues[i].split(';')[2]));
            }
        }
    }
    return parsedNutritionValues;*/

    //convertToJson();
}



function convertToJson() {
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

    fs.writeFileSync('test.json', JSON.stringify(json), 'utf8');
    return asd();

}

function asd(num, breakI) {
    var all = {};

    for(var i = breakI; i < nutritionValues.length; i++) {
        if(nutritionValues[i].split(';')[0] == num) {
            var prop = nutritionValues[i].split(';')[1];
            if(nutritionValues[i].split(';')[0] == num && prop == 'ENERC' ||
                prop == 'CHOAVL' || prop == 'FAT' || prop == 'PROT') {
                //prop
                all[nutritionValues[i].split(';')[1]] = nutritionValues[i].split(';')[2]
            }
        } else {
            breakI = i;
            break;
        }
    }
    return [all, breakI];
}


function getFoodName(id) {
    for(var i = 1; i < foods.length; i++) {
        var foodId = foods[i].split(';')[0];

        if(foodId == id) {
            return foods[i].split(';')[1];
        }
    }



}


/*
function getNutritionValues(foodId) {
    var parsedNutritionValues = {};

    for(var i = 1; i < nutritionValues.length - 1; i++) {
        var id = nutritionValues[i].split(';')[0];
        var type = nutritionValues[i].split(';')[1];

        if(+id === +foodId) {
            if(type == 'ENERC') {
                parsedNutritionValues['energy'] = nutritionValues[i].split(';')[2].split(',')[0];
            } else if(type == 'PROT') {
                parsedNutritionValues['protein'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Proteiinia: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'FAT') {
                parsedNutritionValues['fat'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Rasvaa: ' + round(nutritionValues[i].split(';')[2]));
            } else if(type == 'CHOAVL') {
                parsedNutritionValues['carbohydrates'] = round(nutritionValues[i].split(';')[2]);
                //console.log('Hiilihydraatteja: ' + round(nutritionValues[i].split(';')[2]));
            }
        }
    }
    return parsedNutritionValues;
}
*/

function round(num) {
    num = num.replace(',', '.');
    var rounded = Math.round(+num * 10) / 10;
    return rounded.toFixed(1);
}



module.exports = findMatchingFoodsFromCSV;
