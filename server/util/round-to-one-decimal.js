module.exports = function round(num) {
    var rounded = Math.round(num * 10) / 10;
    return rounded.toFixed(1);
}
