'use strict'
var gRandom = false
var gBoard
var gGame

function onInit(size, mines) {
    // This is called when page loads
    const lives = (mines > 3) ? 3 : mines
    gGame = {
        size: size,
        mines: mines,
        isOn: false,
        shownCount: 0, // how many cells are shown (help us calculate victory)
        markedCount: 0, // with flag
        secsPassed: 0,
        lives: lives
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    // Builds the board
    // Set the mines
    // Call setMinesNegsCount()
    // Return the created board

    var board = []
    for (var i = 0; i < gGame.size; i++) {
        board[i] = []
        for (var j = 0; j < gGame.size; j++) {
            const cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }

    // board = setMines(board)
    // board = setMinesNegsCount(board)

    return board
}

function setMines(board, clickI, clickJ) {
    if (!gRandom) {
        var i = 0
        var p = 1
        while (i < gGame.mines) {
            var rowIdx = Math.floor((i * 3 + p) / 4)
            var colIdx = (i * 3 + p) % 4
            if ((clickI === rowIdx) && (clickJ === colIdx)) {
                p++
                continue
            }
            board[rowIdx][colIdx].isMine = true
            i++
        }
    } else {
        var m = gGame.mines
        while (m > 0) {
            var rowIdx = Math.floor(Math.random() * (gGame.size))
            var colIdx = Math.floor(Math.random() * (gGame.size))
            if ((clickI === rowIdx) && (clickJ === colIdx)) continue
            if (!board[rowIdx][colIdx].isMine) {
                board[rowIdx][colIdx].isMine = true
                m--
            } else continue
        }
    }
    return board
}

function setMinesNegsCount(board) {
    // Count mines around each cell and set the cell's minesAroundCount.
    for (var i = 0; i < gGame.size; i++) {
        for (var j = 0; j < gGame.size; j++) {
            board[i][j].minesAroundCount = countMinesNegs(board, i, j)
        }
    }
    return board
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
            // var innerText = ''
            // if (cell.isShown) { className += ' shown' }
            // if (cell.isMarked) { className += ' marked' }
            if (cell.isMine) {
                className += ' mine'
                // innerText += '💣'
            } else {
                className += `negs negs-${cell.minesAroundCount}`
                // if (cell.minesAroundCount !== 0) {
                //    innerText += cell.minesAroundCount
                // }
            }
            strHTML += `\t<td data-i="${i}" data-j="${j}"
                            class="cell ${className}" 
                            onclick="onCellClicked(${i}, ${j})"
                            oncontextmenu="onCellMarked(event, this, ${i}, ${j})">
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML

    const elLives = document.querySelector(".lives .symbol")
    elLives.innerText = '💛'.repeat(gGame.lives)

    const elSmiley = document.querySelector(".reset-btn")
    elSmiley.innerText = '😀'
}


function onCellClicked(i, j) {
    if (!gGame.isOn) {
        gGame.isOn = true
        gBoard = setMines(gBoard, i, j)
        gBoard = setMinesNegsCount(gBoard)
        renderBoard(gBoard)
        // TODO: setTimer function on
    }

    const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    if (elCell.classList.contains('shown')) return
    if (elCell.classList.contains('marked')) return
    if (elCell.classList.contains('mine')) {
        gGame.lives--
        checkGameOver()
    }
    if (gGame.isOn) {
        revealCell(elCell, i, j)
        checkGameOver()
    }
}

function revealCell(elCell, rowIdx, colIdx) {
    const cell = gBoard[rowIdx][colIdx]
    if (elCell.classList.contains("mine")) {
        elCell.classList.add("shown")
        elCell.innerText = '💣'
        cell.isShown = true
        gGame.shownCount++
    }
    if (elCell.classList.contains("negs")) {
        if (!elCell.classList.contains("negs-0")) {
            elCell.classList.add("shown")
            elCell.innerText = cell.minesAroundCount
            cell.isShown = true
            gGame.shownCount++
        } else {
            // TODO: expandShown
            for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
                if (i < 0 || i >= gBoard.length) continue
                for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                    if (j < 0 || j >= gBoard[0].length) continue
                    if (gBoard[i][j].isMarked === true) continue
                    var currCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                    currCell.classList.add("shown")
                    if (!currCell.classList.contains("negs-0")) {
                        currCell.innerText = gBoard[i][j].minesAroundCount
                    }
                    gBoard[i][j].isShown = true
                    gGame.shownCount++
                }
            }
        }
    }
}

function onCellMarked(event, elCell, i, j) {
    event.preventDefault()
    if (elCell.classList.contains('shown')) return
    if (elCell.classList.contains("marked")) {
        elCell.classList.remove("marked")
        elCell.innerText = ''
        gBoard[i][j].isSMarked = false
        gGame.markedCount--
    } else {
        elCell.classList.add("marked")
        elCell.innerText = '🚩'
        gBoard[i][j].isSMarked = true
        gGame.markedCount++
    }
    checkGameOver()
}

function checkGameOver() {
    const elSmiley = document.querySelector(".reset-btn")
    const elLives = document.querySelector(".lives .symbol")
    const numHearts = [...elLives.innerText].length
    const countMines = gGame.markedCount + (numHearts - gGame.lives)
    const elLeftMines = document.querySelector(".left-mines")

    // lives:
    elLives.innerText = '💛'.repeat(gGame.lives) + '💔'.repeat(numHearts - gGame.lives)
    if (gGame.lives < 1) {
        gGame.isOn = false
        elSmiley.innerText = '😫'
        // TODO: function revealAllMines
        // TODO: stop function setTimer
    }

    // mines:
    elLeftMines.innerText = `${gGame.mines - countMines}`
    console.log(gGame.mines - countMines, gGame.shownCount, gGame.markedCount)
    if ((gGame.mines === countMines)
        && (gGame.shownCount + gGame.markedCount === gGame.size ** 2)) {
        gGame.isOn = false
        elSmiley.innerText = '😍'
        // TODO: stop function setTimer
    }

}

function expandShown(board, elCell, i, j) {
    // When user clicks a cell with no mines around, 
    // we need to open not only that cell, but also its neighbors.
    // NOTE: start with a basic implementation that only opens
    // the non-mine 1st degree neighbors
    // BONUS: if you have the time later, try to work more like the
    // real algorithm (see description at the Bonuses section below)

}