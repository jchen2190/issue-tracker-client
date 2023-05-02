export function formatTime(time) {
    let jsonTime = new Date(time);
    let year = jsonTime.getFullYear();
    let month = jsonTime.getMonth() + 1;
    let day = jsonTime.getDate();
    let hours = jsonTime.getHours();
    let minutes = jsonTime.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let formattedDate = month + "/" + day + "/" + year;
    let formattedTime = hours + ":" + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
    let formattedDateTime = formattedDate + ' ' + formattedTime;
    return formattedDateTime;
}