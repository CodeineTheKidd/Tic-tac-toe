// Selecting HTML elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Game state variables
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

// Handle cell click event
function handleCellClick(event) {
  const cell = event.target;
  const clickedCellIndex = parseInt(cell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  // Update game state
  gameState[clickedCellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer);

  // Check for win or draw
  if (checkWin(currentPlayer)) {
    endGame(`Player ${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame("It's a draw!");
  } else {
    // Switch to the other player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check for a win
function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === player;
    });
  });
}

// Check for a draw
function checkDraw() {
  return gameState.every(cell => cell !== '');
}

// End the game
function endGame(messageText) {
  gameActive = false;
  message.textContent = messageText;
}

// Reset the game
function resetGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}
