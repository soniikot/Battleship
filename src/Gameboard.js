const Ship = require("./ship");

class GameBoard {
  constructor() {
    this.grid = this.createGrid();
    this.ships = [];
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < 10; row++) {
      const rowArray = [];
      for (let col = 0; col < 10; col++) {
        rowArray.push(null);
      }
      grid.push(rowArray);
    }
    return grid;
  }

  placeShip(row, col, length, direction) {
    const ship = new Ship(length);

    if (
      !this.isValidPosition(row, col) ||
      !this.isSpaceAvailable(row, col, length, direction)
    ) {
      return "error";
    }

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        this.grid[row][col + i] = ship;
      } else if (direction === "vertical") {
        this.grid[row + i][col] = ship;
      }
    }

    this.markSurroundingCells(row, col, length, direction);
    this.ships.push(ship);
    return "ship placed";
  }

  markSurroundingCells(row, col, length, direction) {
    const surroundingCells = [];
    for (let i = -1; i <= length; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow, newCol;
        if (direction === "horizontal") {
          newRow = row + j;
          newCol = col + i;
        } else {
          newRow = row + i;
          newCol = col + j;
        }
        if (
          this.isValidPosition(newRow, newCol) &&
          this.grid[newRow][newCol] === null
        ) {
          surroundingCells.push([newRow, newCol]);
        }
      }
    }
    surroundingCells.forEach(([r, c]) => {
      this.grid[r][c] = this.grid[r][c] || "X";
    });
  }

  isValidPosition(row, col) {
    return row >= 0 && row < 10 && col >= 0 && col < 10;
  }

  isSpaceAvailable(row, col, length, direction) {
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        if (col + i >= 10 || this.grid[row][col + i] !== null) {
          return false;
        }
      } else if (direction === "vertical") {
        if (row + i >= 10 || this.grid[row + i][col] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  receiveAttack(row, col) {
    if (this.grid[row][col] !== null) {
      const ship = this.grid[row][col];
      ship.hit();
      return "hit";
    } else {
      this.grid[row][col] = "miss";
      return "missed";
    }
  }

  displayGrid() {
    const table = this.grid.map((row) =>
      row.map(
        (cell) =>
          cell === null
            ? " " // Empty cell
            : cell === "miss"
            ? "M" // Missed attack
            : cell === "hit"
            ? "H" // Hit attack
            : cell === "X"
            ? "X" // Prohibited area
            : "S" // Ship present
      )
    );
    return table;
  }
}

module.exports = GameBoard;
