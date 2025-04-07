let currentPlayer = 'X';
let boardState = Array(9).fill('');
let gameActive = true;

const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

function createBoard() {
  board.innerHTML = '';
  boardState = Array(9).fill('');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
  updateStatus();
}

function updateStatus() {
  status.textContent = `${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = e.target.getAttribute('data-index');
  if (!gameActive || boardState[index] !== '') return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (!boardState.includes('')) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => {
    const [a,b,c] = combo;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}

restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
});

window.addEventListener('DOMContentLoaded', () => {
  createBoard();
});
