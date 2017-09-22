var executeQuery = require('../database-util/execute-query');

module.exports = function selectEntriesFromToday(userId) {
    var query = `
        SELECT meals.mealId, meals.mealName,
        consumedfoods.consumptionId, consumedfoods.foodAmount,
        foods.foodId, foods.foodName, foods.energy,
        foods.protein, foods.carbs, foods.fat
        FROM meals, consumedfoods, foods
        WHERE meals.mealId = consumedfoods.mealId
        AND consumedfoods.foodId = foods.foodId AND consumedfoods.active = 1
        AND meals.userId = ? AND meals.active = 1
        AND meals.timeOfConsumption >= CURDATE()
        AND meals.timeOfConsumption < CURDATE() + INTERVAL 1 DAY
        ORDER BY meals.mealId, consumedfoods.timeOfConsumption
    `;

    return new Promise(function (resolve, reject) {
        executeQuery(query, [userId])
            .then(function (results) {
                return resolve(results);
            })
            .catch(function (err) {
                return reject(err);
            })
    })
    .then(function (results) {
        var energyInTotal = 0;
        var proteinInTotal = 0;
        var carbsInTotal = 0;
        var fatInTotal = 0;
        var meals = [];
        var latestMeal;

        results.forEach(function (row) {
            // find all the different types of meals in results
            if(row.mealName != latestMeal) {
                latestMeal = row.mealName;
                meals.push({
                    id: row.mealId,
                    name: row.mealName,
                    foods: []
                });
            }

            // skip placeholders
            if(row.foodId === 99999) return;

            var matchAtIndex = meals.findIndex(function (meal) {
                return meal.id === row.mealId;
            });

            var energyInAmount = Math.round((row.energy / 100) * row.foodAmount);
            var proteinInAmount = Math.round((row.protein / 100) * row.foodAmount * 10) / 10;
            var carbsInAmount = Math.round((row.carbs / 100) * row.foodAmount * 10) / 10;
            var fatInAmount = Math.round((row.fat / 100) * row.foodAmount * 10) / 10;

            // add course to meal
            meals[matchAtIndex].foods.push({
                consumptionId: row.consumptionId,
                id: row.foodId,
                name: row.foodName,
                amount: row.foodAmount,
                energy: energyInAmount,
                protein: proteinInAmount,
                carbs: carbsInAmount,
                fat: fatInAmount
            });

            // add row values towards the total
            energyInTotal += energyInAmount;
            proteinInTotal += proteinInAmount;
            carbsInTotal += carbsInAmount;
            fatInTotal += fatInAmount;
        });

        var total = {
            energy: Math.round(energyInTotal),
            protein: Math.round(proteinInTotal),
            carbs: Math.round(carbsInTotal),
            fat: Math.round(fatInTotal)
        };console.log(meals);

        return {entries: meals, total};
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
