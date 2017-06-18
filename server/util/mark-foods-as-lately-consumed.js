function markFoodsAsLatelyConsumed(latest, matchingFoods) {
    matchingFoods.forEach(function (matchingFood, i) {
        if(latest.indexOf(+matchingFood.id) !== -1) {
            matchingFood['latelyConsumed'] = true;

            var moveThis = matchingFoods.splice(i, 1)[0];
            matchingFoods.unshift(moveThis);
        }
    });

    return matchingFoods;
}

module.exports = markFoodsAsLatelyConsumed;
