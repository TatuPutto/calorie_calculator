module.exports = function findIndexOfObjectId(idToFind, array) {
    console.log(array);
    var index = array.findIndex(function (item) {
        return item.id == idToFind;
    });
    return index;
}
