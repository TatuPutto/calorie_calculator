export default function pad(num) {
    return num = (num / 10 < 1) ? ('0' + num) : num;
}
