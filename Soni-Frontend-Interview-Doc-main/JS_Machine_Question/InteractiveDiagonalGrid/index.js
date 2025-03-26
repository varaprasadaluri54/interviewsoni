const gridContainer = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");

const cells = [];
let lastClickedCell = null;

const buildGrid = (n) => {
  gridContainer.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${n}, 1fr)`;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
      cells.push(cell);
      gridContainer.appendChild(cell);
    }
  }
};

const onReset = (e) => {
  cells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });
};

const onClickGrid = (e) => {
  if (!e.target.classList.contains("cell") || e.target == lastClickedCell)
    return;

  // Reset diagonals only for the previous clicked cell
  if (lastClickedCell) {
    onReset();
  }

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  // Change diagonals to red
  cells.forEach((cell) => {
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);

    // Check for diagonal and anti-diagonal
    if (r - c === row - col || r + c === row + col) {
      cell.style.backgroundColor = "red";
    }
  });

  // Change the clicked cell to yellow
  e.target.style.backgroundColor = "yellow";

  // Update lastClickedCell
  lastClickedCell = e.target;
};

function init() {
  const gridSize = 7; // Grid size
  buildGrid(gridSize);
  gridContainer.addEventListener("click", onClickGrid);
  resetBtn.addEventListener("click", onReset);
}

init();
