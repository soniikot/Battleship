import Player from "./player.js";
import GameBoard from "./Gameboard.js";
import { getCoordinates } from "./GUI.js";

export const game = {
  humanPlayer: null,
  computerPlayer: null,
};

export const createPlayers = () => {
  const input = document.getElementById("name");
  game.computerPlayer = new Player(null, true);
  game.humanPlayer = new Player(input.value);
  return game;
};

export const startRound = () => {
  console.log(game.computerPlayer);
  getCoordinates();
  // game.computerPlayer.gameBoard.receiveAttack();
};
