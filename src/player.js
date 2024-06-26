import GameBoard from "./Gameboard.js";
import { shipCollection } from "./helpers/constrants.js";

class Player {
  gameBoard = new GameBoard();
  constructor(name, isComputer = false) {
    this.name = isComputer ? "Computer" : name;
    this.isComputer = isComputer;
  }
  computerPlacingShips() {
    Object.values(shipCollection).forEach((ship) => {
      let placed = false;
      while (!placed) {
        const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (
          this.gameBoard.placeShip(row, col, ship.length, direction) ===
          "ship placed"
        ) {
          placed = true;
        }
      }
    });
  }
}

export default Player;
