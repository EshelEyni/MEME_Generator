'use strict'

var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function renderMeme(imgUrl) {
    gCtx.drawImage(imgUrl, 0, 0, gElCanvas.width, gElCanvas.height);
    let currMeme = getMeme()

    gCtx.font = currMeme.lines[gMeme.selectedLineIdx].size + 'px ' + currMeme.lines[gMeme.selectedLineIdx].fontType
    gCtx.textAlign = currMeme.lines[gMeme.selectedLineIdx].align
    gCtx.fillStyle = currMeme.lines[gMeme.selectedLineIdx].fillColor
    gCtx.strokeStyle = currMeme.lines[gMeme.selectedLineIdx].color

    if (currMeme.lines.length == 0)
        return;

    renderLine(currMeme.lines[0], 1)
    if (currMeme.lines.length > 1) {
        renderLine(currMeme.lines[1], 6)
    }
    for (let i = 2; i < currMeme.lines.length; i++) {
        const line = currMeme.lines[i];
        renderLine(line, i);
    }
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
