<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.12.0/chess.min.js"></script>

const chessboard = document.getElementById("chessboard");
const game = new Chess();

let selectedCell = null;
let selectedPiece = null;

chessboard.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell) return;

  if (!selectedCell) {
    if (cell.firstChild) {
      selectedCell = cell;
      selectedPiece = cell.firstChild;
      cell.classList.add("selected");
    }
  } else {
    if (cell === selectedCell) {
      selectedCell = null;
      selectedPiece = null;
      cell.classList.remove("selected");
    } else {
      const move = game.move({
        from: selectedCell.dataset.cell,
        to: cell.dataset.cell,
      });

      if (move) {
        selectedCell = null;
        selectedPiece = null;
        cell.classList.remove("selected");
      }
    }
  }
});


for (let i = 0; i < 64; i++) {
    const cell = document.querySelector(`.cell:nth-child(${i + 1})`);
    cell.dataset.cell = `${Math.floor(i / 8) + 1}-${(i % 8) + 1}`;
  }

  function updateBoard() {
    for (let i = 0; i < 64; i++) {
      const cell = document.querySelector(`.cell:nth-child(${i + 1})`);
      const piece = game.get(cell.dataset.cell);
  
      if (piece) {
        cell.classList.add(piece.color);
        cell.firstChild.src = `pieces/${piece.type}${piece.color}.png`;
      } else {
        cell.classList.remove(...["white", "black"]);
        cell.firstChild.remove();
      }
    }
  }
  
  setInterval(() => {
    if (game.game_over()) {
      console.log("Game over:", game.fen());
      clearInterval(intervalId);
    } else {
      updateBoard();
    }
  }, 100);