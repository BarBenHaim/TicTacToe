const rows = 3;
const columns = 3;
let p1result = document.getElementById("p1-result");
let p2result = document.getElementById("p2-result");
let winnerName = document.getElementById("winner");
let boardArray = Array(rows)
  .fill()
  .map(() => Array(columns).fill(""));
let n = [""][""];

const board = document.getElementById("board");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");
const startBtn = document.getElementById("start-btn");

let p1turn = true;
let p2turn = false;
let p1score = 0;
let p2score = 0;

function renderGame() {
  board.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${i}-${j}`;
      cell.textContent = boardArray[i][j];
      console.log(boardArray[i][j]);

      board.appendChild(cell);
      cell.addEventListener("click", () => handleCellClick(cell, i, j));
    }
  }
}

function handleCellClick(cell, row, col) {
  if (cell.textContent == "") {
    if (p1turn) {
      cell.textContent = "X";
      boardArray[row][col] = "X";
      p1turn = false;
      p2turn = true;
    } else if (p2turn) {
      cell.textContent = "O";
      boardArray[row][col] = "O";
      p1turn = true;
      p2turn = false;
    }
    winnerIs(cell, row, col);
  }
}

clearBtn.addEventListener("click", () => {
  boardArray = boardArray.map((row) => row.fill(""));

  renderGame();
});

resetBtn.addEventListener("click", () => {
  boardArray = boardArray.map((row) => row.fill(""));
  p1score = 0;
  p2score = 0;
  p1result.innerHTML = `<p>Player One: ${p1score} </p>`;
  p2result.innerHTML = `<p>Player Two: ${p2score} </p>`;
  renderGame();
});

renderGame();

let winnerIs = function (cell, row, col) {
  console.log(boardArray[row][col]);
  console.log(row, col);

  // Check rows
  for (let row = 0; row < rows; row++) {
    if (
      boardArray[row][0] !== "" &&
      boardArray[row][0] === boardArray[row][1] &&
      boardArray[row][0] === boardArray[row][2]
    ) {
      winnerVisual(boardArray[row][0]);
      return boardArray[row][0];
    }
  }

  // Check columns
  for (let col = 0; col < columns; col++) {
    if (
      boardArray[0][col] !== "" &&
      boardArray[0][col] === boardArray[1][col] &&
      boardArray[0][col] === boardArray[2][col]
    ) {
      winnerVisual(boardArray[0][col]);
      return boardArray[0][col];
    }
  }

  // Check diagonal (top-left to bottom-right)
  if (
    boardArray[0][0] !== "" &&
    boardArray[0][0] === boardArray[1][1] &&
    boardArray[0][0] === boardArray[2][2]
  ) {
    winnerVisual(boardArray[0][0]);
    return boardArray[0][0];
  }

  // Check diagonal (top-right to bottom-left)
  if (
    boardArray[0][2] !== "" &&
    boardArray[0][2] === boardArray[1][1] &&
    boardArray[0][2] === boardArray[2][0]
  ) {
    winnerVisual(boardArray[0][2]);
    return boardArray[0][2];
  }

  return "NO WINNER";
};

function winnerVisual(winner) {
  if (winner) {
    if (winner == "X") {
      p1score++;
      p1result.innerHTML = `<p>Player One: ${p1score} </p>`;
      alert("X won!");
      winnerName.textContent = `Previous Loser: O`;
      winnerName.style.display = "block";
    } else if (winner == "O") {
      p2score++;
      p2result.innerHTML = `<p>Player Two: ${p2score} </p>`;
      alert("O won!");
      winnerName.textContent = `Previous Loser: X`;
      winnerName.style.display = "block";
    }
  }

  boardArray = boardArray.map((row) => row.fill(""));

  renderGame();
}
