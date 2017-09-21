var getConnection = require('./create-connection');



module.exports = function selectNutritionValuesFromDateRange(week, userId) {
    var year = new Date().getFullYear();
    var from = week * 7;
    var to = from - 6;
    var data = [year, from, year, to, userId];
    var query = `
        SELECT
        ROUND(SUM(foods.energy / 100 * consumedfoods.foodAmount)) AS energy,
        ROUND(SUM(foods.protein / 100 * consumedfoods.foodAmount)) AS protein,
        ROUND(SUM(foods.carbs / 100 * consumedfoods.foodAmount)) AS carbs,
        ROUND(SUM(foods.fat / 100 * consumedfoods.foodAmount)) AS fat,
        DATE(consumedfoods.timeOfConsumption) AS date
        FROM consumedfoods
        LEFT JOIN foods ON foods.foodId = consumedfoods.foodId
        WHERE consumedfoods.timeOfConsumption <= MAKEDATE(?, ?) + INTERVAL 2 DAY
        AND consumedfoods.timeOfConsumption > MAKEDATE(?, ?)
        AND consumedfoods.foodId != 99999
        AND consumedfoods.userId = ? AND consumedfoods.active = 1
        GROUP BY DATE(consumedfoods.timeOfConsumption)
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.release();
            connection.query(query, data, function (err, results) {
                if(err) reject(err);
                resolve(results);
            });
        })
    })
    .then(function (results) {
        if(results.length === 0) return [];
        var fullWeek = [];

        // iterate through the days of given week e.g 18.9 - 24.9
        for(var i = 1; i <= 7; i++) {
            var matchingDateFound = false;
            var freshYear = new Date(year, 0);
            var date = new Date(freshYear.setDate((to + i)));
            var dateToCheck = date.toString().split(' ')[2];

            // push entries to matching week day
            for(var j = 0; j < results.length; j++) {
                var resultDate = results[j].date.toString().split(' ')[2];

                if(resultDate == dateToCheck) {
                    fullWeek.push(results[j]);
                    matchingDateFound = true;
                }
            }

            // leave current week day blank if there was no entries
            if(!matchingDateFound) fullWeek.push({date: date});
        }

        return fullWeek;
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
