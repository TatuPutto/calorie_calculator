import pad from './pad';

export function getCurrentDate() {
    var d = new Date();
    var day = pad(d.getDate());
    var month = pad(d.getMonth() + 1);
    var year = pad(d.getFullYear());

    return `${day}-${month}-${year}`;
}

export function getCurrentWeek() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return Math.ceil(day / 7);
}

export function getWeek(date) {
    var now = new Date(date);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    return Math.ceil(day / 7);
}
