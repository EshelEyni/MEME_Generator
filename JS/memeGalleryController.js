'use strict'
var gSavedMemes = []
var gSavedMemeCanvases = []
var gElMemeCanvas
var memeCtx

function loadMemesFromStorage() {
    for (let i = 0; i < gCurrSavedMemeIdx; i++) {
        gSavedMemes[i] = loadFromStorage('savedMemeIdx: ' + i)
    }
}

function renderMemeGallery(memeArr) {
    let currMemeId
    let strHTMLs = ''
    const elMemeGallery = document.querySelector('.meme-gallery-container')

    if (memeArr.length === 0) {
        elMemeGallery.innerHTML = 'no saved memes avialable '
        return
    }

    memeArr.forEach(meme => {
        meme.url = findImgForSavedMeme(meme)
        meme.id = memeArr.indexOf(meme)
        currMemeId = meme.id
        strHTMLs += `
        <div class="meme-container">
        <canvas id="meme-canvas-num-${meme.id}" class="meme-canvas" onclick="onMemeSelect(this.id)"
         height="350" width="350"></canvas>
        </div>
        `
    })
    elMemeGallery.innerHTML = strHTMLs
    renderMemeCanvases()
    resizeMemeCanvas()
    renderMemeToCanvas()
}

function renderMemeCanvases() {
    gSavedMemes.forEach(meme => {
        gSavedMemeCanvases[meme.id] = {}
        gSavedMemeCanvases[meme.id].elCanvas = (document.getElementById('meme-canvas-num-' + meme.id))
        gSavedMemeCanvases[meme.id].ctx = gSavedMemeCanvases[meme.id].elCanvas.getContext('2d')
    })
}

function renderMemeToCanvas() {
    gSavedMemes.forEach(meme => {
        var currCanvas = gSavedMemeCanvases[meme.id]
        if (typeof (meme.url) === 'string') meme.url = setImg(meme.url)
        currCanvas.ctx.drawImage(meme.url,
            0, 0, currCanvas.elCanvas.width, currCanvas.elCanvas.height);

        currCanvas.ctx.font = meme.lines[meme.selectedLineIdx].size + 'px sans-serif'
        currCanvas.ctx.textAlign = meme.lines[meme.selectedLineIdx].align
        currCanvas.ctx.fillStyle = meme.lines[meme.selectedLineIdx].fillColor
        currCanvas.ctx.strokeStyle = meme.lines[meme.selectedLineIdx].color

        currCanvas.ctx.fillText(meme.lines[0].txt, currCanvas.elCanvas.width / 2,
            currCanvas.elCanvas.height / 8, currCanvas.elCanvas.width, currCanvas.elCanvas.height)
        currCanvas.ctx.strokeText(meme.lines[0].txt, currCanvas.elCanvas.width / 2,
            currCanvas.elCanvas.height / 8, currCanvas.elCanvas.width, currCanvas.elCanvas.height)
        currCanvas.ctx.fillText(meme.lines[1].txt, currCanvas.elCanvas.width / 2,
            (currCanvas.elCanvas.height / 8) * 7, currCanvas.elCanvas.width, currCanvas.elCanvas.height)
        currCanvas.ctx.strokeText(meme.lines[1].txt, currCanvas.elCanvas.width / 2,
            (currCanvas.elCanvas.height / 8) * 7, currCanvas.elCanvas.width, currCanvas.elCanvas.height)


    })
}

function resizeMemeCanvas() {
    var elMemeContainer = document.querySelector('.meme-container');
    gSavedMemeCanvases.forEach(canvas => {
        canvas.elCanvas.width = elMemeContainer.offsetWidth - 25;
        canvas.elCanvas.height = elMemeContainer.offsetHeight - 25;
    })
}

function findImgForSavedMeme(meme) {
    var memeImg = gImgs.find(img => img.id == meme.selectedImgId)
    return memeImg.url
}

function onMemeSelect(clickedMemeId) {
    let splitMemeId = clickedMemeId.split('-')
    let memeId = +splitMemeId[splitMemeId.length - 1]
    gMeme = gSavedMemes[memeId]
    openEditor()

    gCurrImgToMeme = gImgs.find(img => img.id == gMeme.selectedImgId)
    if (typeof (gCurrImgToMeme.url) === 'string') gCurrImgToMeme.url = setImg(gCurrImgToMeme.url)


    resizeCanvas()
    renderMeme(gSavedMemes[memeId].url)
}
