var getCoonection = require('./create-connection');

module.exports = function addMeal() {
    var query = 'INSERT INTO MEALS (mealType, entryId, userId) ' +
            'VALUES ("Päivallinen", 1, 123)';
    var data = ['', '123'];

}
