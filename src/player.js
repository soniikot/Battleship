import GameBoard from "./Gameboard";

class Player {
  constructor(name, isComputer = false) {
    this.name = isComputer ? "Computer" : name;
    this.isComputer = isComputer;
    this.gameBoard = new GameBoard();
  }
  placeShipRandomly() {
    const { row, col, length, direction } = this.getRandomDataToPlaceShip();
    return this.gameBoard.placeShip(row, col, length, direction);
  }

  getRandomDataToPlaceShip() {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    const length = Math.floor(Math.random() * 5 + 1);
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    return { row, col, length, direction };
  }
}

export default Player;
