module.exports = function setCookieExpirationDate() {
    var now = new Date();
    var month = now.getMonth() + 1;
    var date = now.getDate() + 1;
    var year = now.getFullYear();
    var end = new Date(`${month}/${date}/${year} 00:00:00 AM`);

    return end - now;
}
