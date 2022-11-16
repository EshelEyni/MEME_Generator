var gFilterBy = { label: ''}

var gImgs = [
    { id: 1, url: '../assets/img/meme-img/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: './assets/img/meme-img/2.jpg', keywords: ['funny', 'dog'] },
    { id: 3, url: './assets/img/meme-img/3.jpg', keywords: ['funny', 'dog'] },
    { id: 4, url: './assets/img/meme-img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: './assets/img/meme-img/5.jpg', keywords: ['funny', 'dog'] },
    { id: 6, url: './assets/img/meme-img/6.jpg', keywords: ['funny', 'dog'] },
    { id: 7, url: './assets/img/meme-img/7.jpg', keywords: ['funny', 'dog'] },
    { id: 8, url: './assets/img/meme-img/8.jpg', keywords: ['funny', 'dog'] },
    { id: 9, url: './assets/img/meme-img/9.jpg', keywords: ['funny', 'dog'] },
    { id: 10, url: './assets/img/meme-img/10.jpg', keywords: ['funny', 'dog'] },
    { id: 11, url: './assets/img/meme-img/11.jpg', keywords: ['funny', 'dog'] },
    { id: 12, url: './assets/img/meme-img/12.jpg', keywords: ['funny', 'dog'] },
    { id: 13, url: './assets/img/meme-img/13.jpg', keywords: ['funny', 'dog'] },
    { id: 14, url: './assets/img/meme-img/14.jpg', keywords: ['funny', 'dog'] },
    { id: 15, url: './assets/img/meme-img/15.jpg', keywords: ['funny', 'dog'] },
    { id: 16, url: './assets/img/meme-img/16.jpg', keywords: ['funny', 'dog'] },
    { id: 17, url: './assets/img/meme-img/17.jpg', keywords: ['funny', 'dog'] },
    { id: 18, url: './assets/img/meme-img/18.jpg', keywords: ['funny', 'dog'] },
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
    return gFilterBy
}

function getImgsForDisplay() {
    var imgs = gImgs.filter(img => img.keywords.join().includes(gFilterBy.label))
    return imgs
}