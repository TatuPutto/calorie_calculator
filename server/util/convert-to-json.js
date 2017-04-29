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

    fs.writeFileSync('foods_dot.json', JSON.stringify(json), 'utf8');
}

function asd(num, breakI) {
    var all = {};

    for(var i = breakI; i < nutritionValues.length; i++) {
        if(nutritionValues[i].split(';')[0] == num) {
            var prop = nutritionValues[i].split(';')[1];
            if(nutritionValues[i].split(';')[0] == num && prop == 'ENERC' ||
                prop == 'CHOAVL' || prop == 'FAT' || prop == 'PROT') {
                //prop
                all[nutritionValues[i].split(';')[1]] = nutritionValues[i].split(';')[2].replace(',', '.')
            }
        } else {
            breakI = i;
            break;
        }
    }
    return [all, breakI];
}
