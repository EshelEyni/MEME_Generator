
const elGallery = document.querySelector('.gallery-container')
const elImgGallery = document.querySelector('.img-gallery')
const elEditorContainer = document.querySelector('.editor-container')
const elMemeGallery = document.querySelector('.meme-gallery-container')
const elAbout = document.querySelector('.about-container')
const elTxtInput = document.querySelector('.txt-input')
const elMainNavList =  document.querySelector('.main-nav-list')
const elShadowScreen = document.querySelector('.shadow-screen')
gElCanvas = document.getElementById('my-canvas')
gCtx = gElCanvas.getContext('2d')

function init() {
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('resize', resizeMemeCanvas())
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

function toggleMobileNavList(){
    elMainNavList.classList.toggle('reveal')
    elShadowScreen.classList.toggle('reveal')
}
