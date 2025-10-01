const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = 'X';

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a tie!`;
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn`;

// Set the initial status message
statusDisplay.innerHTML = currentPlayerTurn();

// Event listeners for cells and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// NOTE: Ensure you have an element with class 'game--restart' in your HTML
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);


function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  // Check if the cell is already played or the game is inactive
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  // FIX: Corrected typo from 'clickeedCellIndex' to 'clickedCellIndex'
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winningCondition = winningConditions[i];
    let a = gameState[winningCondition[0]];
    let b = gameState[winningCondition[1]];
    let c = gameState[winningCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  // 1. Check for Win
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return; // Game over, stop execution
  }

  // 2. Check for Draw
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return; // Game over, stop execution
  }

  // 3. If no win and no draw, switch players
  handlePlayerChange();
}

function handlePlayerChange()
{
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}