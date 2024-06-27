import Player from "./player.js";

export class Game {
  computerPlayer = new Player(null, true);

  constructor(name) {
    this.humanPlayer = new Player(name);
    this.currentPlayer = this.humanPlayer;
  }
}
