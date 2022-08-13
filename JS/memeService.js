var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            fontType: 'Impact',
            size: 50,
            align: 'center',
            color: 'black',
            fillColor: 'white',
            rect: {x: null, y: null, w: null, h: null},
        },
    ]
}

function setImg(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    return img
}

function getMeme(img) {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    renderMeme(gCurrImgToMeme.url)
}

function setFontStyle(text) {
    gMeme.lines[gMeme.selectedLineIdx].fontType = text
    renderMeme(gCurrImgToMeme.url)
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme(gCurrImgToMeme.url)
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
    renderMeme(gCurrImgToMeme.url)
}

function setAlignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    renderMeme(gCurrImgToMeme.url)
}

function setAlignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    renderMeme(gCurrImgToMeme.url)
}

function setAlignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    renderMeme(gCurrImgToMeme.url)
}


function insertSticker(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt += val.innerHTML
    renderMeme(gCurrImgToMeme.url)
}

function setLineSize(num) {
    gMeme.lines[gMeme.selectedLineIdx].size += num
    if (gMeme.lines[gMeme.selectedLineIdx].size === 0) gMeme.lines[gMeme.selectedLineIdx].size = 4
    renderMeme(gCurrImgToMeme.url)
}

function switchLines() {
    const elTxtInput = document.querySelector('.txt-input')
    gMeme.selectedLineIdx += 1
    if (gMeme.selectedLineIdx > (gMeme.lines.length - 1)) {
        gMeme.selectedLineIdx = 0
    }

    elTxtInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 50,
        align: 'center',
        color: 'black',
        fillColor: 'white',
        rect: { x: null, y: null, height: null, width: null }
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    document.querySelector('.txt-input').value = ''
}


function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-btn').innerHTML = `
        <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        <img src="img/icons8-connect-64.png" class="share-img">
        Share   
        </a>`

        document.querySelector('.upload-btn').innerHTML = '👉'
        document.querySelector('.upload-btn').classList.add('upload-finger')
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}