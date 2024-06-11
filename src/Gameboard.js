class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.grid = this.createGrid(size);
  }

  createGrid(size) {
    const grid = [];
    for (let row = 0; row < size; row++) {
      const rowArray = [];
      for (let col = 0; col < size; col++) {
        rowArray.push(null);
      }
      grid.push(rowArray);
    }
    return grid;
  }

  placeShip(row, col, length, direction) {
    if (
      !this.isValidPosition(row, col) ||
      !this.isSpaceAvailable(row, col, length, direction)
    ) {
      console.log("Invalid position or not enough space");
      return;
    }

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        this.grid[row][col + i] = "S";
      } else if (direction === "vertical") {
        this.grid[row + i][col] = "S";
      }
    }
  }

  isValidPosition(row, col) {
    return row >= 0 && row < this.size && col >= 0 && col < this.size;
  }

  isSpaceAvailable(row, col, length, direction) {
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        if (col + i >= this.size || this.grid[row][col + i] !== null) {
          return false;
        }
      } else if (direction === "vertical") {
        if (row + i >= this.size || this.grid[row + i][col] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  getPosition(row, col) {
    if (this.isValidPosition(row, col)) {
      return this.grid[row][col];
    }
    return null;
  }

  displayGrid() {
    const table = this.grid.map((row) =>
      row.map((cell) => (cell === null ? " " : cell))
    );
    console.table(table);
  }
}

// Example usage:
const gameBoard = new GameBoard();
gameBoard.placeShip(2, 3, 4, "horizontal");
gameBoard.placeShip(4, 5, 3, "vertical");
gameBoard.displayGrid();
