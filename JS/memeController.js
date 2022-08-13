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

    renderLine(currMeme.lines[0], 0);
    if (currMeme.lines.length > 1) {
        var last = currMeme.lines[1];
        renderLine(last, 6);
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
        line.rect.y = gElCanvas.height / 8 * (pos + 1)
    }

    var m = gCtx.measureText(line)

    line.rect.h = line.rect.x + line.size;
    line.rect.w = line.rect.y + m.width;

    gCtx.fillText(line.txt, line.rect.x, line.rect.y, gElCanvas.width, gElCanvas.height)
    gCtx.strokeText(line.txt, line.rect.x, line.rect.y, gElCanvas.width, gElCanvas.height)
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

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos);
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {

}


function onUp() {
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}