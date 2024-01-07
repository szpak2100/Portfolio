class Chessboard {
    constructor(elementId) {
      this.element = document.getElementById(elementId);
      this.game = new Chess();
      this.selectedCell = null;
      this.selectedPiece = null;
  
      this.initializeBoard();
      this.addEventListeners();
      this.updateBoard();
  
      setInterval(() => {
        if (this.game.game_over()) {
          console.log("Game over:", this.game.fen());
          clearInterval(this.intervalId);
        } else {
          this.updateBoard();
        }
      }, 100);
    }
  
    initializeBoard() {
      for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.cell = `${Math.floor(i / 8) + 1}-${(i % 8) + 1}`;
        this.element.appendChild(cell);
      }
    }
  
    addEventListeners() {
      this.element.addEventListener('click', (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;
  
        if (!this.selectedCell) {
          if (cell.firstChild) {
            this.selectedCell = cell;
            this.selectedPiece = cell.firstChild;
            cell.classList.add('selected');
          }
        } else {
          if (cell === this.selectedCell) {
            this.selectedCell = null;
            this.selectedPiece = null;
            cell.classList.remove('selected');
          } else {
            const move = this.game.move({
              from: this.selectedCell.dataset.cell,
              to: cell.dataset.cell,
            });
  
            if (move) {
              this.selectedCell = null;
              this.selectedPiece = null;
              cell.classList.remove('selected');
            }
          }
        }
      });
    }
  
    updateBoard() {
      for (let i = 0; i < 64; i++) {
        const cell = document.querySelector(`.cell:nth-child(${i + 1})`);
        const piece = this.game.get(cell.dataset.cell);
  
        if (piece) {
          cell.classList.add(piece.color);
          cell.firstChild.src = `pieces/${piece.type}${piece.color}.png`;
        } else {
          cell.classList.remove(...['white', 'black']);
          cell.firstChild.remove();
        }
      }
    }
  }