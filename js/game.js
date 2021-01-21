'use strict'
const MINEIMG = '💣'
const testing = '⚽'
const FLAG = '🏴‍☠️'
var gBoard;
var gInterval;
var counterClick = 0
var gLives = 3

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


var gLevel = {
    size: 4,
    mines: 2
}

function init() {
    gGame.shownCount = 0
    gGame.markedCount = 0
    counterClick = 0
    totalSeconds = 0
    gLives = 3
    gGame.isOn = true

    gBoard = buildBoard(gLevel.size)
    renderBoard(gBoard)
    clearInterval(gInterval)
    var elEmoji = document.querySelector('.emoji')
    elEmoji.innerText = '😀'

}

function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board.push([])
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                mineArroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                gameElement: null
            }
        }

    }
    spawnMinesInRandom(board)
    setMinesNegsCount(board)
    return board
}




// Render the board to an HTML table
function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            // var tdId = `cell-${i}-${j}`;
            strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j}) "oncontextmenu="cellMarked(this, ${i}, ${j});return false;">`

            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            var num = countMines(i, j, board);
            currCell.minesAroundCount = num
        }
    }
    return num
}


function countMines(cellI, cellJ, mat) {
    var minesAroundCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].gameElement === MINEIMG) minesAroundCount++;
        }
    }
    return minesAroundCount
}



function spawnMinesInRandom(board) {
    var minesCounter = gLevel.mines;
    while (minesCounter !== 0) {
        var idxI = getRandomIntInclusive(0, board.length - 1)
        var idxJ = getRandomIntInclusive(0, board.length - 1)
        var rdmCell = board[idxI][idxJ]
        if (!rdmCell.isMine) {
            rdmCell.gameElement = MINEIMG;
            rdmCell.isMine = true;
            minesCounter--;
        }
    }
}


function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (counterClick === 0) {
        counterClick++
        gInterval = setInterval(setTime, 1000)
    }
    var cell = gBoard[i][j];
    if (cell.isMarked) return
    if (cell.isShown === false) {
        if (cell.gameElement !== MINEIMG) {
            elCell.innerText = cell.minesAroundCount;
            cell.isShown = true;
            gGame.shownCount++
            console.log(gGame)
        }

    }
    if (cell.gameElement === MINEIMG) {
        elCell.innerText = cell.gameElement //Render Bomb in DOM
        cell.isShown = true
        gLives--
        console.log(gLives, 'livessss')
        checkGameOver(i, j)
    }


}



function cellMarked(elCell, i, j) {
    elCell.addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
    }, false)
    if (!gGame.isOn) return
    var board = gBoard[i][j]

    if (!board.isMarked) {
        elCell.innerText = FLAG
        board.isMarked = true
    } else {
        board.isMarked = false
        elCell.innerText = ''
    }

    if (board.isMine === true && board.isMarked === true) {
        gGame.markedCount++
        console.log('MarkCount: ', gGame.markedCount)


    } else if (board.isMine && !board.isMarked) {
        gGame.markedCount--
        console.log('MarkCount: ', gGame.markedCount)
    }
    checkGameOver(i, j)

}



function checkGameOver(i, j) {
    var correctCount = gLevel.size ** 2 - gLevel.mines
    var board = gBoard[i][j]
    var elEmoji = document.querySelector('.emoji')
    var elLives = document.querySelector('.lives')
    elLives.innerText = gLives

    if (gGame.shownCount === correctCount && gGame.markedCount === gLevel.mines) {
        console.log('game is over')
        clearInterval(gInterval)
        elEmoji.innerText = '😎'
    } else if (gLives === 0) {
        gGame.isOn = false
        clearInterval(gInterval)
        elEmoji.innerText = '🤕'
    }

}






function levelEasy() {
    gLevel = {
        size: 4,
        mines: 1
    }
    init()
    return gLevel
}

function levelNormal() {
    gLevel = {
        size: 8,
        mines: 12
    }
    init()
    return gLevel
}

function levelExpert() {
    gLevel = {
        size: 12,
        mines: 30
    }
    init()
    return gLevel
}
//TODO BUGS!!!

// FIX FLAG ON NUMBERS AFTER WIN
//ADD LEVELS!
//FIRST CLICK NEVER BOMB!

//NEVER GIVE UP!