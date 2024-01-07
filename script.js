const chessboard = document.getElementById("chessboard");
const cellTemplates = {
  white: [],
  black: [],
};

const pieces = [
  { type: "pawn", color: "white", file: "wP.png" },
  { type: "pawn", color: "black", file: "bP.png" },
  { type: "rook", color: "white", file: "wR.png" },
  { type: "rook", color: "black", file: "bR.png" },
  { type: "knight", color: "white", file: "wN.png" },
  { type: "knight", color: "black", file: "bN.png" },
  { type: "bishop", color: "white", file: "wB.png" },
  { type: "bishop", color: "black", file: "bB.png" },
  { type: "queen", color: "white", file: "wQ.png" },
  { type: "queen", color: "black", file: "bQ.png" },
  { type: "king", color: "white", file: "wK.png" },
  { type: "king", color: "black", file: "bK.png" },
];

for (let i = 0; i < 64; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  if (i 2 === 0) {
    cell.classList.add("white");
  } else {
    cell.classList.add("black");
  }
  chessboard.appendChild(cell);
  cellTemplates[i % 2].push(cell);
}

const pieceImages = pieces.map(({ color, type, file }) => {
  const img = new Image();
  img.src = `pieces/${color}${type}.png`;
  return img;
});

// Add pieces to the board
for (let i = 0; i < pieceImages.length; i++) {
  const piece = pieceImages[i];
  const rank = Math.floor(i / 8);
  const file = i % 8;
  const cell =
    (rank % 2 === 0 ? cellTemplates.white : cellTemplates.black)[file];
  cell.appendChild(piece);
}