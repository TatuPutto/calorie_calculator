import pad from './pad';

export default function getCurrentDate() {
    var d = new Date();
    var day = pad(d.getDate());
    var month = pad(d.getMonth() + 1);
    var year = pad(d.getFullYear());

    return `${day}-${month}-${year}`;
}
