/*function compareRatings(first,second) {
    if (first.score == second.score) {
        return 0;
    }
    if (first.score < second.score) {
        return 1;
    }
    return -1;
}

export {compareRatings};*/
function getRandom(min, max) {
        min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export{getRandom};