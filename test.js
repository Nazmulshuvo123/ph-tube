function getTimeString(time){
    //get days and rest hour
    const year = parseInt(time / 94608000);
    // let remainingSecond = time % 3600;
    const month = parseInt(time / 2592000);
    let remainingDays = time % 3600;
    const days = parseInt(remainingDays / 86400)

    return `${year} year ${month} month ${days} days ago`;

}
console.log(getTimeString(167212300))