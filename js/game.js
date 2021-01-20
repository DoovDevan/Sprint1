'use strict'
var gBoard;
const MINEIMG = '💣'
const testing = '⚽'

var gLevel = {
    size: 4,
    mines: 2
}
function init() {
    gBoard = buildBoard(gLevel.size)
    renderBoard(gBoard)
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
            strHTML += `<td class="cell" onclick="cellClicked(this, ${i}, ${j})">`
            if (cell.isMine === true) strHTML += MINEIMG


            strHTML += '</td>'
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (cell.isShown === false) {
        if (cell.gameElement !== MINEIMG) {
            elCell.innerText = cell.minesAroundCount;
            cell.isShown = true;
        } else {

        }
    }
    console.log(gBoard);
}




function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) { //loop board
        for (var j = 0; j < board.length; j++) { // loop board
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


