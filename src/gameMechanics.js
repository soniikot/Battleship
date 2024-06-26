import Player from "./player.js";
import GameBoard from "./Gameboard.js";
import {
  getCoordinates,
  renderComputerBoard,
  renderHumanBoard,
} from "./GUI.js";

export const game = {
  humanPlayer: null,
  computerPlayer: null,
};

export const createPlayers = () => {
  const input = document.getElementById("name");
  game.computerPlayer = new Player(null, true);
  game.humanPlayer = new Player(input.value);
  game.currentPlayer = game.humanPlayer;
  return game;
};
const switchPlayer = () => {
  game.currentPlayer =
    game.currentPlayer === game.humanPlayer
      ? game.computerPlayer
      : game.humanPlayer;
};
export const startRound = () => {
  const computerBoard = document.getElementById("renderedComputerBoard");

  if (computerBoard) {
    getCoordinates(computerBoard).then(({ row, col }) => {
      game.computerPlayer.gameBoard.receiveAttack(row, col);
      computerBoard.innerHTML = "";
      renderComputerBoard();
      switchPlayer();
      console.log(game.currentPlayer);
      game.humanPlayer.computerAttacks();
      renderHumanBoard();
    });
  }
};
