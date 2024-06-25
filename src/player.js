import GameBoard from "./Gameboard.js";
import { shipCollection } from "./helpers/constrants.js";

class Player {
  gameBoard = new GameBoard();
  constructor(name, isComputer = false) {
    this.name = isComputer ? "Computer" : name;
    this.isComputer = isComputer;
  }
  computerPlacingShips(gameBoard) {
    Object.values(shipCollection).forEach((ship, index) => {
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
  /*placeShipRandomly() {
    const { row, col, length, direction } = this.getRandomDataToPlaceShip();
    const computerPlacedShips = new Set();

    return this.gameBoard.placeShip(row, col, length, direction);
  }

  getRandomDataToPlaceShip() {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    const length = () => {
      {
        const shipKeys = Object.keys(shipCollection);
        const randomIndex = Math.floor(Math.random() * shipKeys.length);
        const randomShipKey = shipKeys[randomIndex];
        console.log(shipCollection[randomShipKey].length);
        return shipCollection[randomShipKey].length;
      }
    };
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    return { row, col, length, direction };
  }*/
}

export default Player;
