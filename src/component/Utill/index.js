
export function getColor(percent, start, end) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    return 'hsl(' + c + ', 60%, 48%)';
}

export function byKeys(obj, keys = []) {
    const filtered = {}
    keys.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            filtered[key] = obj[key]
        }
    })
    return filtered
}

export function shuffle(dataSet) {
    const array = dataSet.slice();
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}