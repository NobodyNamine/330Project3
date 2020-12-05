function compareRatings(first,second) {
    if (first.score == second.score) {
        return 0;
    }
    if (first.score < second.score) {
        return 1;
    }
    return -1;
}

export {compareRatings};