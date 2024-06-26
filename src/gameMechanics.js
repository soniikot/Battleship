import Player from "./player.js";
import GameBoard from "./Gameboard.js";
import { getCoordinates, renderComputerBoard } from "./GUI.js";

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
  const computerBoard = document.getElementById("renderedComputerBoard");
  if (computerBoard) {
    getCoordinates(computerBoard).then(({ row, col }) => {
      console.log(game.computerPlayer.gameBoard.receiveAttack(row, col));
      computerBoard.innerHTML = "";
      renderComputerBoard();

      console.log(game);
    });
  }
};
