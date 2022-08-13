'use strict'
var gCurrImgToMeme

function renderGallery(imgsArr) {
    let strHTMLs = ''
    imgsArr.forEach(img => {
        strHTMLs += `<img src="${img.url}" onclick="onImgSelect(this.id)" id="${img.id}">`
    })
    const elImgGallery = document.querySelector('.img-gallery')
    elImgGallery.innerHTML = strHTMLs
}

function onImgSelect(clickedImgId) {
    gMeme.selectedImgId = clickedImgId
    openEditor()
    gCurrImgToMeme = gImgs.find(img => img.id == clickedImgId)
    if (typeof (gCurrImgToMeme.url) === 'string') gCurrImgToMeme.url = setImg(gCurrImgToMeme.url)
    resizeCanvas()
    renderMeme(gCurrImgToMeme.url)
}

function genRanMeme() {
    onImgSelect(getRandomInt(1, gImgs.length))
    setLineColor(getRandomColor())
    setFillColor(getRandomColor())
    setRanLines()


    renderMeme(gCurrImgToMeme.url)
}

function setRanLines() {
    let numOfLines = getRandomInt(1, gMeme.lines.length + 1)
    if (numOfLines === 1) {
        gMeme.selectedLineIdx = getRandomInt(0, gMeme.lines.length)
        setLineTxt(makeLorem())
        setLineSize(60)
    }
    if (numOfLines > 1) {
        gMeme.selectedLineIdx = 0
        setLineTxt(makeLorem())
        gMeme.selectedLineIdx = 1
        setLineTxt(makeLorem())
    }
}

function renderLabels() {
    const labels = getLabels()
    var strHTMLs = labels.map(label => `<option>${label}</option>`)
    strHTMLs.unshift('<option value="">Select Label</option>')
    

    document.querySelector('.filter-label-select').innerHTML = strHTMLs.join('')
}


function onSetFilterBy(filterBy) {
    // console.log(filterBy);
    filterBy = setImgFilter(filterBy)
    renderGallery(getImgsForDisplay())
    
    // const queryStringParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}`
    // const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    // window.history.pushState({ path: newUrl }, '', newUrl)

}
