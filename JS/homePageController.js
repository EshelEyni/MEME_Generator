var elGallery 
var elImgGallery 
var elEditorContainer 
var elMemeGallery 
var elAbout 
var elTxtInput 
var elTxtInputFont 
var elMainNavList 
var elShadowScreen

function init() {
    elGallery = document.querySelector('.gallery-container')
    elImgGallery = document.querySelector('.img-gallery')
    elEditorContainer = document.querySelector('.editor-container')
    elMemeGallery = document.querySelector('.meme-gallery-container')
    elAbout = document.querySelector('.about-container')
    elTxtInput = document.querySelector('.txt-input')
    elTxtInputFont = document.querySelector('.filter-font-select')
    elMainNavList = document.querySelector('.main-nav-list')
    elShadowScreen = document.querySelector('.shadow-screen')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('resize', resizeMemeCanvas())
    renderStickers()
    renderGallery(getImgsForDisplay())
    renderLabels()
}


function openEditor() {
    elEditorContainer.classList.remove('close')
    elGallery.classList.add('close')
    elMemeGallery.classList.add('close')
    elAbout.classList.add('close')
}

function openGallery() {
    elGallery.classList.remove('close')
    elEditorContainer.classList.add('close')
    elMemeGallery.classList.add('close')
    elAbout.classList.add('close')
    elTxtInput.value = ''
}

function openAbout() {
    elAbout.classList.remove('close')
    elGallery.classList.add('close')
    elEditorContainer.classList.add('close')
    elMemeGallery.classList.add('close')
    elTxtInput.value = ''
}


function openMemeGallery() {
    elMemeGallery.classList.remove('close')
    elGallery.classList.add('close')
    elEditorContainer.classList.add('close')
    elAbout.classList.add('close')
    elTxtInput.value = ''
    loadMemesFromStorage()
    renderMemeGallery(gSavedMemes)
}

function toggleMobileNavList() {
    elMainNavList.classList.toggle('reveal')
    elShadowScreen.classList.toggle('reveal')
}
