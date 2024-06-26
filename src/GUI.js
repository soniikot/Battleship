import { shipCollection } from "./helpers/constrants.js";
import { handleDragStart } from "./placeHumanShips.js";
import { game } from "./gameMechanics.js";
const wrapper = document.querySelector(".wrapper");
export const renderBoardsforTheFirstTime = () => {
  wrapper.innerHTML = "";

  const humanBoard = document.createElement("div");
  const titleHumanBoard = document.createElement("div");
  titleHumanBoard.textContent = `${game.humanPlayer.name}'s Board`;
  humanBoard.id = "RenderedHumanBoard";
  humanBoard.classList.add("RenderedBoard");

  wrapper.appendChild(humanBoard);
  humanBoard.appendChild(titleHumanBoard);
  game.humanPlayer.gameBoard.renderGrid(humanBoard);

  const computerBoard = document.createElement("div");
  computerBoard.id = "renderedComputerBoard";
  const titleComputerboard = document.createElement("div");
  titleComputerboard.textContent = `Enemy's Board`;
  wrapper.appendChild(computerBoard);
  computerBoard.appendChild(titleComputerboard);
  computerBoard.classList.add("RenderedBoard");
  game.computerPlayer.gameBoard.renderGrid(titleComputerboard);
};
export const renderHumanBoard = () => {
  const humanBoardContainer = document.getElementById("RenderedHumanBoard");
  humanBoardContainer.innerHTML = "";

  const titleHumanBoard = document.createElement("div");
  titleHumanBoard.textContent = `${game.humanPlayer.name}'s Board`;
  humanBoardContainer.appendChild(titleHumanBoard);

  game.humanPlayer.gameBoard.renderGrid(humanBoardContainer);
};

export const createShipContainer = () => {
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

export const getCoordinates = () => {
  const computerBoard = document.getElementById("renderedComputerBoard");
  computerBoard.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");

    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    console.log(col);
    return row, col;
  });
};
