/*
function convertToJson() {
    var json = {};
    var breakI = 1;
    //34306
    for(var i = 1; i <= 34306; i++) {
        var asdf = asd(i, breakI);

        obj = asdf[0];
        breakI = asdf[1];

        if(Object.keys(asdf[0]).length > 0) {
            json[i] = asdf[0];
        }

    }


    fs.writeFileSync('ruuat.json', JSON.stringify(json), 'utf8');
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
*/
