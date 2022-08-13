function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeLorem(wordCount = 5) {
    const words = [
        'Slim Shady', 'above', 'the roof',
        'was', 'look', 'HAHA', 'to',
        'for shizel', 
        'what', 'as generally', 'happens', 'ultimate',
        'don\'t', 'it', 'was', 'legend', 
       ]
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

