import { shipCollection } from "../helpers/constraints.js";
import { Game } from "../models/game.js";

import {
  getCoordinates,
  renderComputerBoard,
  renderHumanBoard,
  displayGameOverMessage,
} from "../views/gameView.js";

export let game;

export const createPlayers = () => {
  const input = document.getElementById("name");
  game = new Game(input.value);
};

const switchPlayer = () => {
  game.currentPlayer =
    game.currentPlayer === game.humanPlayer
      ? game.computerPlayer
      : game.humanPlayer;
};

export const startRound = () => {
  const computerBoard = document.getElementById("renderedComputerBoard");

  const handleAttack = ({ row, col }) => {
    const attackResult = game.computerPlayer.gameBoard.receiveAttack(row, col);
    renderComputerBoard();

    switch (attackResult) {
      case "hit":
        if (game.computerPlayer.gameBoard.checkWinners()) {
          displayGameOverMessage("humanPlayerWin");
        } else {
          switchPlayer();
          game.humanPlayer.computerAttacks();
          renderHumanBoard();
          switchPlayer();
          startRound();
        }
        break;
      case "missed":
        switchPlayer();
        game.humanPlayer.computerAttacks();
        renderHumanBoard();
        switchPlayer();
        startRound();
        break;
      default:
      case "already hit":
        alert("You can not hit the same place twice");
        getCoordinates(computerBoard).then(handleAttack);
        break;
    }

    if (
      game.computerPlayer.gameBoard.grid.every((array) =>
        array.every((element) => element !== null)
      )
    ) {
      displayGameOverMessage("Draw");
    }
  };

  getCoordinates(computerBoard).then(handleAttack);
};

