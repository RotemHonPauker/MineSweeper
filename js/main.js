'use strict'

gBoard = []

cell = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

gLevel = {
    SIZE: 4,
    MINES: 2
}

gGame = {
    isOn: false,
    shownCount: 0, // how many cells are shown (help us calculate victory)
    markedCount: 0, // with flag
    secsPassed: 0
}

function onInit() {
    // This is called when page loads
}

function buildBoard() {
    // Builds the board
    // Set the mines
    // Call setMinesNegsCount()
    // Return the created board

}

function setMinesNegsCount(board) {
    // Count mines around each cell and set the cell's minesAroundCount.

}

function renderBoard(board) {
    // Render the board as a <table> to the page

}






function onCellClicked(elCell, i, j) {
    // Called when a cell is clicked

}

function onCellMarked(elCell) {
    // Called when a cell is rightclicked
    // See how you can hide the context menu on right click

}

function checkGameOver() {
    // and all the other cells are shown
    // Game ends when all mines are marked, 

}

function expandShown(board, elCell, i, j) {
    // When user clicks a cell with no mines around, 
    // we need to open not only that cell, but also its neighbors.
    // NOTE: start with a basic implementation that only opens
    // the non-mine 1st degree neighbors
    // BONUS: if you have the time later, try to work more like the
    // real algorithm (see description at the Bonuses section below)

}