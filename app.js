const board = document.getElementById('board')

const gameState = {
  computer: false,
  currentPlayer: 'X',
  winner: null,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
}

function makeBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //
      const cell = document.createElement('div')
      //
      cell.classList.add('cell')
      //
      cell.id = `${i}-${j}`
      //
      board.appendChild(cell)
    }
  }
}

makeBoard()

function switchPlayers() {
  if (gameState.currentPlayer === 'X') {
    gameState.currentPlayer = 'O'
  } else {
    gameState.currentPlayer = 'X'
  }
}

function checkRows() {
  for (let i = 0; i < gameState.board.length; i++) {
    if (
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
    ) {
      gameState.winner = gameState.board[i][0]
    }
  }
}

function checkCols() {
  for (let i = 0; i < gameState.board.length; i++) {
    if (
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
    ) {
      gameState.winner = gameState.board[i][0]
    }
  }
}

function checkDiag() {
  if (
    gameState.board[0][0] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][2]
  ) {
    gameState.winner = gameState.board[1][1]
  } else if (
    gameState.board[0][2] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][0]
  ) {
    gameState.winner = gameState.board[1][1]
  }
}

function checkBoard() {
  checkRows()
  checkCols()
  checkDiag()
}

function checkWin() {
  if (gameState.winner) {
    console.log(`${gameState.winner} wins the game!`)
  }
}

function playMoveById(id, event) {
  const row = id[0]
  const column = id[2]
  if (gameState.board[row][column] === null) {
    gameState.board[row][column] = gameState.currentPlayer
    event.target.innerText = gameState.board[row][column]
  }
}

function handleClick(event) {
  const id = event.target.id
  playMoveById(id, event)
  switchPlayers()
  checkBoard()
  checkWin()
}

board.addEventListener('click', handleClick)
