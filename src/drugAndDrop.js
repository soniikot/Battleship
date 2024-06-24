import { shipCollection } from "./helpers/constrants.js";
import { game } from "./main.js";

export const handleDragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.dataset.ship);
};

export const handleDragOver = (event) => {
  event.preventDefault();
};

export const handleDrop = (event) => {
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
    const humanBoardContainer = document.getElementById("RenderedHumanBoard");
    humanBoardContainer.innerHTML = "";
    game.humanPlayer.gameBoard.renderGrid(humanBoardContainer);
  } else {
    console.log("Invalid position for the ship");
  }
};
