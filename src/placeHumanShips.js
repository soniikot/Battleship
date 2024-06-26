import { shipCollection } from "./helpers/constrants.js";
import { renderHumanBoard } from "./GUI.js";
import { game } from "./gameMechanics.js";
import { startRound } from "./gameMechanics.js";

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
      startRound();
    }
  }
};
