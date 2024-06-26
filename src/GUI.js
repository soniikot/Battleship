import { shipCollection } from "./helpers/constrants.js";
import { handleDragStart } from "./placeHumanShips.js";
import { game } from "./gameMechanics.js";

const wrapper = document.querySelector(".wrapper");

export const renderBoardsforTheFirstTime = () => {
  wrapper.innerHTML = "";

  const humanBoardWrapper = document.createElement("div");

  const humanBoard = document.createElement("div");

  const titleHumanBoard = document.createElement("div");

  titleHumanBoard.textContent = `${game.humanPlayer.name}'s Board`;
  humanBoard.id = "RenderedHumanBoard";

  humanBoard.classList.add("RenderedBoard");
  wrapper.appendChild(humanBoardWrapper);
  humanBoardWrapper.appendChild(titleHumanBoard);

  humanBoardWrapper.appendChild(humanBoard);

  game.humanPlayer.gameBoard.renderGridForHuman(humanBoard);

  const computerBoardWrapper = document.createElement("div");

  const computerBoard = document.createElement("div");

  const titleComputerBoard = document.createElement("div");
  titleComputerBoard.textContent = `Enemy's Board`;
  computerBoard.id = "renderedComputerBoard";
  wrapper.appendChild(computerBoardWrapper);
  computerBoardWrapper.appendChild(titleComputerBoard);
  computerBoardWrapper.appendChild(computerBoard);

  computerBoard.classList.add("RenderedBoard");
  game.computerPlayer.gameBoard.renderGridForComputer(computerBoard);
};
export const renderHumanBoard = () => {
  const humanBoard = document.getElementById("RenderedHumanBoard");
  humanBoard.innerHTML = "";
  console.log(game.humanPlayer);
  game.humanPlayer.gameBoard.renderGridForHuman(humanBoard);
};

export const renderComputerBoard = () => {
  const computerBoard = document.getElementById("renderedComputerBoard");
  computerBoard.innerHTML = "";
  game.computerPlayer.gameBoard.renderGridForComputer(computerBoard);
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

export const getCoordinates = (computerBoard) => {
  if (!computerBoard) return;

  return new Promise((resolve) => {
    computerBoard.addEventListener("click", (event) => {
      let currentElement = event.target;

      while (currentElement && !currentElement.dataset.row) {
        currentElement = currentElement.parentNode;
      }

      if (currentElement && currentElement.dataset) {
        const row = parseInt(currentElement.dataset.row, 10);
        const col = parseInt(currentElement.dataset.col, 10);
        resolve({ row, col });
      }
    });
  });
};
