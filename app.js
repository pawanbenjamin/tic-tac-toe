// Make a reference to DOM Element(s)
const board = document.getElementById('board')

// This will hold all of our game's changing data
const gameState = {
  currentPlayer: 'X',
  winner: null,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
}

// This function will render our board onto the page
function makeBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // create a new element
      const cell = document.createElement('div')
      // add a class
      cell.classList.add('cell')
      // give it an ID representing the index positions
      // to reference later
      cell.id = `${i}-${j}`
      // append this new element to our board
      board.appendChild(cell)
    }
  }
}
// Don't forget to call this right away! (Or else there would be no board!)
makeBoard()

// ========== Game Logic Functions ============ //

function switchPlayers() {
  if (gameState.currentPlayer === 'X') {
    gameState.currentPlayer = 'O'
  } else {
    gameState.currentPlayer = 'X'
  }
}

// Helper functions to check different winning combos

function checkRows() {
  // loop through the board to find our row
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
  // loop through the board again
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
  // the only completely hardcoded check, using the
  // exact coordinates of the two diagonals
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

// We these powers combined we can write a function
// which checks the whole board
function checkBoard() {
  checkRows()
  checkCols()
  checkDiag()
}

// Because our checkBoard function resets a value in state,
// this next function can just read that value and act accordingly
function checkWin() {
  if (gameState.winner) {
    console.log(`${gameState.winner} wins the game!`)
  }
}

// A helper function which handles placing a player in state,
// then rendering the page accordingly
function playMoveById(id) {
  const row = id[0]
  const column = id[2]
  if (gameState.board[row][column] === null) {
    gameState.board[row][column] = gameState.currentPlayer
    // Switch Players here so that the current player can click in a valid space
    switchPlayers()
  }
}

function renderBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.getElementById(`${i}-${j}`)
      cell.innerText = gameState.board[i][j]
    }
  }
}

// Our main click handler which brings all of our game logic together!
function handleClick(event) {
  const id = event.target.id
  playMoveById(id)
  console.log(gameState)
  renderBoard()
  checkBoard()
  checkWin()
}

// Add an event listener to our board
board.addEventListener('click', handleClick)
