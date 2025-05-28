const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const sizeInput = document.getElementById("sizeInput");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let boardSize = 0;
let currentPlayer = 1;
let rows = []
let cols = []
let diag = 0
let antiDiag = 0;
let gameOver = false;

function createBoard(n) {
  boardEl.innerHTML = "";
  boardEl.style.gridTemplateColumns = `repeat(${n}, 50px)`;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      boardEl.appendChild(cell);
    }
  }
}

function handleMove(e) {
  if (gameOver) return;
  const cell = e.target;
  const row = +cell.dataset.row;
  const col = +cell.dataset.col;
  if (cell.textContent) return;

  const mark = currentPlayer === 1 ? "X" : "O";
  cell.textContent = mark;
  cell.classList.add("disabled");

  const add = currentPlayer === 1 ? 1 : -1;

  // this is used to find winning condition
  rows[row] += add;
  cols[col] += add;
  if (row === col) diag += add;
  if (row + col === boardSize - 1) antiDiag += add;

  if(checkWinner(row, col, mark)) {
    return;
  }
  currentPlayer *= -1;
}

function checkWinner(row, col, mark) {
    if (
        Math.abs(rows[row]) === boardSize ||
        Math.abs(cols[col]) === boardSize ||
        Math.abs(diag) === boardSize ||
        Math.abs(antiDiag) === boardSize
      ) {
        messageEl.textContent = `Player ${mark} wins!`;
        gameOver = true;
        enableInput(true);
        return true;
      }
      return false;
}

function enableInput(enable) {
  sizeInput.disabled = !enable;
  startBtn.disabled = !enable;
}

function startGame() {
  boardSize = +sizeInput.value;
  if (boardSize < 3) {
    alert("board size shuld be greater than 3");
    return;
  }
  rows = Array(boardSize).fill(0);
  cols = Array(boardSize).fill(0);
  diag = 0;
  antiDiag = 0;
  currentPlayer = 1;
  gameOver = false;
  messageEl.textContent = "";

  createBoard(boardSize);
  attachEventListner();
  enableInput(false);
}

function attachEventListner() {
  boardEl.addEventListener("click", (e) => {
    const cell = e.target;
    if (cell.classList.contains("cell")) {
      handleMove(e);
    }
  });
}

function resetGame() {
  boardEl.innerHTML = "";
  messageEl.textContent = "";
  enableInput(true);
}

function init() {
  startBtn.addEventListener("click", startGame);
  resetBtn.addEventListener("click", resetGame);
}

init();
