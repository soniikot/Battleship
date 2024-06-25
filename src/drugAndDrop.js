import { shipCollection } from "./helpers/constrants.js";
import { game } from "./main.js";
import { placedShips } from "./main.js";

export const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.dataset.ship);
};

export const handleDragOver = (event) => {
  event.preventDefault();
};

export const handleDrop = (event) => {
  event.preventDefault();
  const shipName = event.dataTransfer.getData("text/plain");

  if (placedShips.has(shipName)) {
    console.log(`Ship ${shipName} has already been placed.`);
    return;
  }
  const ship = shipCollection[shipName];
  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);
  const direction = "horizontal";

  if (
    game.humanPlayer.gameBoard.placeShip(row, col, ship.length, direction) ===
    "ship placed"
  ) {
    const humanBoardContainer = document.getElementById("RenderedHumanBoard");
    humanBoardContainer.innerHTML = "";
    const titleHumanBoard = document.createElement("div");
    titleHumanBoard.textContent = `${game.humanPlayer.name}'s Board`;
    humanBoardContainer.appendChild(titleHumanBoard);
    game.humanPlayer.gameBoard.renderGrid(humanBoardContainer);

    placedShips.add(shipName);

    const shipElement = document.querySelector(
      `.ship[data-ship="${shipName}"]`
    );
    if (shipElement) {
      shipElement.remove();
    }
  }
};
