import Ship from "./ship.js";
import { handleDrop } from "./dragAndDrop.js";
import { handleDragOver } from "./dragAndDrop.js";

class GameBoard {
  grid = this.createGrid();
  ships = [];

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
    if (this.grid[row][col] instanceof Ship) {
      const ship = this.grid[row][col];
      ship.hit();
      this.grid[row][col] = "H";
      this.checkWinners();
      return "hit";
    } else {
      this.grid[row][col] = "M";
      return "missed";
    }
  }

  checkWinners() {
    if (this.ships.every((ship) => ship.isSunkStatus === true)) {
      return "game over";
    }
  }

  displayGrid() {
    const table = this.grid.map((row) =>
      row.map((cell) =>
        cell instanceof Ship
          ? "S"
          : cell === "M"
          ? "M"
          : cell === "H"
          ? "H"
          : cell === "X"
          ? "X"
          : " "
      )
    );
    return table;
  }

  renderGrid(container) {
    const table = document.createElement("table");
    const tableData = this.displayGrid();

    tableData.forEach((rowData, rowIndex) => {
      const row = document.createElement("tr");
      rowData.forEach((cellData, colIndex) => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;
        cell.addEventListener("dragover", handleDragOver);
        cell.addEventListener("drop", handleDrop);

        switch (cellData) {
          case "S":
            cell.className = "ship-cell";
          case "M":
            cell.className = "miss";
            break;
          case "H":
            cell.className = "hit";
            break;
          case "X":
            cell.className = "special";
            break;
          default:
            cell.className = "empty";
        }

        row.appendChild(cell);
      });

      table.appendChild(row);

      container.appendChild(table);
    });
  }
}

export default GameBoard;
