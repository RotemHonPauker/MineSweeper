'use strict'
var gSize
var gMines
var gBoard
var gGame

function onInit(size, mines) {
    // This is called when page loads
    gSize = size
    gMines = mines
    gGame = {
        isOn: false,
        shownCount: 0, // how many cells are shown (help us calculate victory)
        markedCount: 0, // with flag
        secsPassed: 0,
        lives: 3
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    // Builds the board
    // Set the mines
    // Call setMinesNegsCount()
    // Return the created board

    const board = []
    for (var i = 0; i < gSize; i++) {
        board[i] = []
        for (var j = 0; j < gSize; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }
    // Todo: add function setMines + random
    board[0][1].isMine = true
    board[2][2].isMine = true

    setMinesNegsCount(board)

    return board
}

function setMinesNegsCount(board) {
    // Count mines around each cell and set the cell's minesAroundCount.
    for (var i = 0; i < gSize; i++) {
        for (var j = 0; j < gSize; j++) {
            board[i][j].minesAroundCount = countMinesNegs(board, i, j)
        }
    }
}

function countMinesNegs(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) count++
        }
    }
    return count
}

function renderBoard(board) {
    // Render the board as a <table> to the page
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            var className = ''
            var innerText = ''
            if (cell.isShown) { className += ' shown' }
            if (cell.isMarked) { className += ' marked' }
            if (cell.isMine) {
                className += ' mine'
                innerText += '💣'
            }
            if ((cell.minesAroundCount !== 0) && (!cell.isMine)) {
                className += `negs-${cell.minesAroundCount}`
                innerText += cell.minesAroundCount
            }
            strHTML += `\t<td data-i="${i}" data-j="${j}
                            class="cell ${className}" 
                            onclick="onCellClicked(this, ${i}, ${j})">
                            ${innerText}
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    console.log(board)
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    if (!gBoard.isOn) {
        gBoard.isOn = true
        // TODO: setTimer function on
    }
    if (elCell.classList.contains("shown")) return
    if (elCell.classList.contains("marked")) return
    if (elCell.classList.contains("mine")) {
        // TODO: reduce setLives function
    }
    if (gBoard.isOn) {
        revealCell(elCell, i, j)
    }
}

function revealCell(elCell, i, j) {
    const cell = gBoard[i][j]
    class_negs_list = []
    for (var neg = 1; neg < 9; neg++) {
        class_negs_list.push(`negs-${neg}`)
    }
    no_negs = 'negs-0'
    if (elCell.classList.contains("mine")) {
        elCell.classList.add("shown")
        cell.isShown = true
    }
    if (elCell.classlist.contains("negs")) {
        elCell.classList.add("shown")
    }


    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) count++
        }
    }

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