var gCurrSavedMemeIdx = loadFromStorage('gCurrSavedMemeIdx') || 0

function saveMeme() {
    saveToStorage('savedMemeIdx: ' + gCurrSavedMemeIdx, gMeme)
    gCurrSavedMemeIdx++
    saveToStorage('gCurrSavedMemeIdx', gCurrSavedMemeIdx)
}