var gFilterBy = { label: ''}

var gImgs = [
    { id: 1, url: '/meme-imgs (square)/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: '/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: '/meme-imgs (square)/3.jpg', keywords: ['funny', 'dog'] },
    { id: 4, url: '/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: '/meme-imgs (square)/5.jpg', keywords: ['funny', 'dog'] },
    { id: 6, url: '/meme-imgs (square)/6.jpg', keywords: ['funny', 'dog'] },
    { id: 7, url: '/meme-imgs (square)/7.jpg', keywords: ['funny', 'dog'] },
    { id: 8, url: '/meme-imgs (square)/8.jpg', keywords: ['funny', 'dog'] },
    { id: 9, url: '/meme-imgs (square)/9.jpg', keywords: ['funny', 'dog'] },
    { id: 10, url: '/meme-imgs (square)/10.jpg', keywords: ['funny', 'dog'] },
    { id: 11, url: '/meme-imgs (square)/11.jpg', keywords: ['funny', 'dog'] },
    { id: 12, url: '/meme-imgs (square)/12.jpg', keywords: ['funny', 'dog'] },
    { id: 13, url: '/meme-imgs (square)/13.jpg', keywords: ['funny', 'dog'] },
    { id: 14, url: '/meme-imgs (square)/14.jpg', keywords: ['funny', 'dog'] },
    { id: 15, url: '/meme-imgs (square)/15.jpg', keywords: ['funny', 'dog'] },
    { id: 16, url: '/meme-imgs (square)/16.jpg', keywords: ['funny', 'dog'] },
    { id: 17, url: '/meme-imgs (square)/17.jpg', keywords: ['funny', 'dog'] },
    { id: 18, url: '/meme-imgs (square)/18.jpg', keywords: ['funny', 'dog'] },
];


function getLabels() {
    var keywords = new Set()
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => keywords.add(keyword))
    })
    keywords = Array.from(keywords)
    return keywords
}


function setImgFilter(filterBy = {}) {
    if (filterBy.label !== undefined) gFilterBy.label = filterBy.label
    // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getImgsForDisplay() {
    var imgs = gImgs.filter(img => img.keywords.join().includes(gFilterBy.label))

    // const startIdx = gPageIdx * PAGE_SIZE
    // cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
    return imgs
}