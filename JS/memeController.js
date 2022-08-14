'use strict'

var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gStickerScrollIdx = 0
const stickers = ['🌜', '🐍', '🗡️', '🤸‍♂️', '😎', '😂', '👣', '😍', '⚽', '😈', '🤪', '🖤',]


function renderMeme(imgUrl) {
    gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height);
    let currMeme = getMeme()

    if (currMeme.lines.length == 0)
        return;
    getLineSetting(currMeme, 0)
    renderLine(currMeme.lines[0], 1)
    if (currMeme.lines.length > 1) {
        getLineSetting(currMeme, 1)
        renderLine(currMeme.lines[1], 6)
    }
    for (let i = 2; i < currMeme.lines.length; i++) {
        getLineSetting(currMeme, currMeme.selectedLineIdx)
        const line = currMeme.lines[i];
        renderLine(line, i);
    }
}

function getLineSetting(meme, idx) {
    gCtx.font = meme.lines[idx].size + 'px '
        + meme.lines[idx].fontType
    gCtx.textAlign = meme.lines[idx].align
    gCtx.fillStyle = meme.lines[idx].fillColor
    gCtx.strokeStyle = meme.lines[idx].color

}

function renderLine(line, pos) {
    if (line.rect.x == null) {
        line.rect.x = gElCanvas.width / 2
    }
    if (line.rect.y == null) {
        line.rect.y = gElCanvas.height / 8 * (pos * 1)
    }
    if (line.rect.height == null) {
        line.rect.height = line.size
    }
    line.rect.width = gCtx.measureText(line.txt).width
    gCtx.fillText(line.txt, line.rect.x, line.rect.y)
    gCtx.strokeText(line.txt, line.rect.x, line.rect.y)
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    setCanvasHeight()
    gElCanvas.width = elContainer.offsetWidth - 5;
    gElCanvas.height = elContainer.offsetHeight - 5;
    if (gCurrImgToMeme) renderMeme(gCurrImgToMeme.url)
}

function setCanvasHeight() {
    var elContainer = document.querySelector('.canvas-container');
    const style = getComputedStyle(elContainer)
    var elCanvasWidth = style.width
    elContainer.style.height = elCanvasWidth
}

function renderStickers() {
    let stickers = getStickersForDisplay()
    const elStickersContainer = document.querySelector('.stickers-container')
    // elStickersContainer.innerHTML = `<a href="#" onclick="insertSticker(this)">${stickers}</a>`
    let strHTMLs = ''
    stickers.forEach(sticker => {
        strHTMLs += `<a href="#" onclick="insertSticker(this)">${sticker}</a>`
    })

    elStickersContainer.innerHTML = strHTMLs
}

function getStickersForDisplay() {
    var stickersForDisplay = []
    for (let i = 0; i < 5; i++) {
        stickersForDisplay.push(stickers[(gStickerScrollIdx + i) % stickers.length])
    }
    return stickersForDisplay
}

function onScrollUpSticker() {
    gStickerScrollIdx++
    renderStickers()
}
function onScrollDownSticker() {
    gStickerScrollIdx--
    renderStickers()
}