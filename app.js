const board = document.getElementById('board')
const onePlayer = document.getElementById('1p')
const twoPlayer = document.getElementById('2p')
const reset = document.getElementById('reset')
const gameType = document.getElementsByClassName('game-type')[0]
const turn = document.getElementById('turn')
const win = document.getElementById('winner')

let gameState = {
  computer: false,
  winner: null,
  isDraw: false,
  currentPlayer: 'X',
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
}

function makeBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.id = `${i}-${j}`
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
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[i][0] !== null &&
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
    ) {
      gameState.winner = gameState.board[i][0]
    }
  }
}

function checkCols() {
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
    ) {
      gameState.winner = gameState.board[0][i]
    }
  }
}

function checkDiag() {
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][0] === gameState.board[1][1] &&
      gameState.board[1][1] === gameState.board[2][2]
    ) {
      gameState.winner = gameState.board[1][1]
    } else if (
      gameState.board[0][i] !== null &&
      gameState.board[0][2] === gameState.board[1][1] &&
      gameState.board[1][1] === gameState.board[2][0]
    ) {
      gameState.winner = gameState.board[1][1]
    }
  }
}

function checkDraw() {
  const nulls = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === null) {
        nulls.push(null)
      }
    }
  }
  if (nulls.length === 0) {
    gameState.isDraw = true
  }
}

function displayWinOrDraw() {
  if (gameState.winner) {
    turn.innerText = ''
    win.innerText = `${gameState.winner} wins the game!`
  } else if (gameState.isDraw) {
    turn.innerText = ''
    win.innerText = `We have a draw!`
  }
}

function checkBoard() {
  checkRows()
  checkCols()
  checkDiag()
  checkDraw()
  displayWinOrDraw()
}

function playMoveById(id) {
  const row = id[0]
  const column = id[2]
  if (gameState.board[row][column] === null) {
    gameState.board[row][column] = gameState.currentPlayer
    switchPlayers()
  }
}

function playComputerMove() {
  const openSpaces = []
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === null) {
        openSpaces.push([i, j])
      }
    }
  }
  const randomIndex = Math.floor(Math.random() * openSpaces.length)
  const [row, col] = openSpaces[randomIndex]
  gameState.board[row][col] = gameState.currentPlayer
  switchPlayers()
}

function renderBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`${i}-${j}`)
      cell.innerText = gameState.board[i][j]
    }
  }
  turn.innerText = `${gameState.currentPlayer}'s turn!`
}

function handleClick(event) {
  if (!gameState.winner && !gameState.isDraw) {
    const id = event.target.id
    playMoveById(id)
    renderBoard()
    checkBoard()
    if (gameState.computer && !gameState.winner && !gameState.isDraw) {
      playComputerMove()
      renderBoard()
      checkBoard()
    }
  }
}

board.addEventListener('click', handleClick)

onePlayer.addEventListener('click', () => {
  gameType.classList.toggle('hide')
  turn.innerText = `${gameState.currentPlayer}'s turn!`
  gameState.computer = true
  console.log(gameState)
})

twoPlayer.addEventListener('click', () => {
  gameType.classList.toggle('hide')
  turn.innerText = `${gameState.currentPlayer}'s turn!`
  gameState.computer = false
  console.log(gameState)
})

reset.addEventListener('click', () => {
  gameType.classList.remove('hide')
  gameState = {
    computer: false,
    isDraw: false,
    currentPlayer: 'X',
    winner: null,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  }
  turn.innerText = ``
  win.innerText = ''
  renderBoard()
})
