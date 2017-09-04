var findIndexOfObjectId = require('../util/find-index-of-object-id');

module.exports = function markFoodsAsFavorites(favorites, matchingFoods, givePriority) {
    for(var i = 0; i < favorites.length; i++) {
        var index = findIndexOfObjectId(favorites[i], matchingFoods);
        if(index !== -1) {
            matchingFoods[index]['favorite'] = true;

            if(givePriority) {
                // move favorite foods to front
                var moveThis = matchingFoods.splice(index, 1)[0];
                matchingFoods.unshift(moveThis);
            }
        }
    }

    return matchingFoods;
}
