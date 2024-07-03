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

export const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.dataset.ship);
};

export const handleDragOver = (event) => {
  event.preventDefault();
};

const placedHumanShips = new Set();

export const dropHumanShips = (event) => {
  event.preventDefault();
  const shipName = event.dataTransfer.getData("text/plain");

  const ship = shipCollection[shipName];
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const direction = "horizontal";

  if (
    game.humanPlayer.gameBoard.placeShip(row, col, ship.length, direction) ===
    "ship placed"
  ) {
    renderHumanBoard();
    placedHumanShips.add(shipName);

    const shipElement = document.querySelector(
      `.ship[data-ship="${shipName}"]`
    );

    if (shipElement) {
      shipElement.remove();
    }

    if (placedHumanShips.size === 5) {
      const shipContainer = document.getElementById("ship-container");
      shipContainer.innerHTML = "";
      startRound();
    }
  }
};
