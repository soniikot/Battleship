import { shipCollection } from "../helpers/constraints.js";
import { game, startRound } from "../controllers/gameController.js";

const wrapper = document.querySelector(".wrapper");

export const createBoardContainers = () => {
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

  renderHumanBoard();

  const computerBoardWrapper = document.createElement("div");

  const computerBoard = document.createElement("div");

  const titleComputerBoard = document.createElement("div");
  titleComputerBoard.textContent = `Enemy's Board`;
  computerBoard.id = "renderedComputerBoard";
  wrapper.appendChild(computerBoardWrapper);
  computerBoardWrapper.appendChild(titleComputerBoard);
  computerBoardWrapper.appendChild(computerBoard);

  computerBoard.classList.add("RenderedBoard");

  renderComputerBoard();
};

export const renderHumanBoard = () => {
  const humanBoard = document.getElementById("RenderedHumanBoard");
  humanBoard.innerHTML = "";

  const table = document.createElement("table");
  const tableData = game.humanPlayer.gameBoard.displayGrid();

  tableData.forEach((rowData, rowIndex) => {
    const row = document.createElement("tr");
    rowData.forEach((cellData, colIndex) => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("drop", dropHumanShips);

      switch (cellData) {
        case "S":
          cell.className = "ship-cell";
          break;
        case "M":
          cell.className = "miss";
          break;
        case "H":
          cell.className = "hit";
          break;
        case "X":
          cell.className = "special";
          break;
        default:
          cell.className = "empty";
      }

      row.appendChild(cell);
    });

    table.appendChild(row);

    humanBoard.appendChild(table);
  });
};

export const renderComputerBoard = () => {
  const computerBoard = document.getElementById("renderedComputerBoard");
  computerBoard.innerHTML = "";

  const table = document.createElement("table");
  const tableData = game.computerPlayer.gameBoard.displayGrid();

  tableData.forEach((rowData, rowIndex) => {
    const row = document.createElement("tr");
    rowData.forEach((cellData, colIndex) => {
      const cell = document.createElement("td");
      cell.textContent = cellData;
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      switch (cellData) {
        case "M":
          cell.textContent = "M";
          cell.className = "miss";
          break;
        case "H":
          cell.textContent = "H";
          cell.className = "hit";
          break;
        default:
          cell.textContent = "";
          cell.className = "hidden";
      }
      row.appendChild(cell);
    });

    table.appendChild(row);

    computerBoard.appendChild(table);
  });
};
const shipContainerWrapper = document.createElement("div");
shipContainerWrapper.id = "ship-container-wrapper";

export const createShipContainer = () => {
  const shipContainerTitle = document.createElement("p");
  shipContainerTitle.textContent = "Place your ships";

  const shipContainer = document.createElement("div");
  shipContainer.id = "ship-container";
  shipContainerWrapper.appendChild(shipContainerTitle);

  const rotateButton = document.createElement("button");
  rotateButton.textContent = "Rotate Ships";
  rotateButton.addEventListener("click", rotateShips);

  shipContainerWrapper.appendChild(rotateButton);

  Object.entries(shipCollection).forEach(([shipName, ship]) => {
    const shipElement = document.createElement("div");
    shipElement.classList.add("ship");
    shipElement.draggable = true;
    shipElement.dataset.ship = shipName;
    shipElement.classList.add = "hotizontal";

    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("ship-cell");
      shipElement.appendChild(cell);
    }

    shipElement.addEventListener("dragstart", handleDragStart);
    shipContainer.appendChild(shipElement);
  });
  shipContainerWrapper.append(shipContainer);
  wrapper.prepend(shipContainerWrapper);
};

const rotateShips = () => {
  const shipElements = document.querySelectorAll(".ship");
  shipElements.forEach((shipElement) => {
    shipElement.classList.toggle("vertical");
  });
};

export const handleDragStart = (event) => {
  const shipElement = event.target;
  const shipDirection = getShipDirection(shipElement);
  event.dataTransfer.setData("text/plain", shipElement.dataset.ship);
  event.dataTransfer.setData("direction", shipDirection);
};

export const handleDragOver = (event) => {
  event.preventDefault();
};

const getShipDirection = (shipElement) => {
  return shipElement.classList.contains("vertical") ? "vertical" : "horizontal";
};
const placedHumanShips = new Set();

export const dropHumanShips = (event) => {
  event.preventDefault();
  const shipName = event.dataTransfer.getData("text/plain");
  const direction = event.dataTransfer.getData("direction") || "horizontal";

  const ship = shipCollection[shipName];

  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);

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
      shipContainerWrapper.innerHTML = "";
      startRound();
    }
  }
};

export const getCoordinates = (computerBoard) => {
  if (!computerBoard) return;

  return new Promise((resolve) => {
    computerBoard.addEventListener("click", (event) => {
      const target = event.target.closest("[data-row]");

      if (target) {
        resolve({
          row: parseInt(target.dataset.row, 10),
          col: parseInt(target.dataset.col, 10),
        });
      }
    });
  });
};

export const displayGameOverMessage = (outcome) => {
  const GameOverMessage = document.createElement("div");
  GameOverMessage.classList.add("game-over-message");

  let message;
  switch (outcome) {
    case "humanPlayerWin":
      message = "You win! Congratulations!";
      break;
    case "computerPlayerWin":
      message = "Computer wins! Better luck next time!";
      break;
    case "Draw":
      message = "It's a draw! Well played!";
      break;
    default:
      message = "Unknown outcome";
  }

  GameOverMessage.textContent = message;

  document.body.appendChild(GameOverMessage);
};
