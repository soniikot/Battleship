import { game } from "./main.js";
import { shipCollection } from "./helpers/constrants.js";
import { handleDragStart } from "./DragDrop.js";

export const renderHumanBoard = () => {
  const humanBoardContainer = document.getElementById("RenderedHumanBoard");
  humanBoardContainer.innerHTML = "";

  const titleHumanBoard = document.createElement("div");
  titleHumanBoard.textContent = `${game.humanPlayer.name}'s Board`;
  humanBoardContainer.appendChild(titleHumanBoard);

  game.humanPlayer.gameBoard.renderGrid(humanBoardContainer);
};

export const startPlacingShips = () => {
  const wrapper = document.querySelector(".wrapper");
  const shipContainer = document.createElement("div");
  shipContainer.id = "ship-container";

  Object.entries(shipCollection).forEach(([shipName, ship]) => {
    const shipElement = document.createElement("div");
    shipElement.classList.add("ship");
    shipElement.draggable = true;
    shipElement.dataset.ship = shipName;

    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("ship-cell");
      shipElement.appendChild(cell);
    }

    shipElement.addEventListener("dragstart", handleDragStart);
    shipContainer.appendChild(shipElement);
  });

  wrapper.appendChild(shipContainer);
};
