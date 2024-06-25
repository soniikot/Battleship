import GameBoard from "./Gameboard.js";
import Player from "./player.js";
import Ship from "./ship.js";
import "./style.css";
import { handleDragStart } from "./drugAndDrop.js";
import { shipCollection } from "./helpers/constrants.js";

import _ from "lodash";
export const game = {
  humanPlayer: null,
  computerPlayer: null,
};
const wrapper = document.querySelector(".wrapper");
const createPlayers = () => {
  const input = document.getElementById("name");
  game.computerPlayer = new Player(null, true);
  game.humanPlayer = new Player(input.value);
  console.log("players works");
};
export const placedShips = new Set();
const playerPlaceShips = () => {
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
    wrapper.appendChild(shipContainer);
    shipContainer.appendChild(shipElement);

    shipElement.addEventListener("dragstart", handleDragStart);
  });
};

const showBoards = () => {
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
  computerBoard.id = "RenderedComputerBoard";
  const titleComputerboard = document.createElement("div");
  titleComputerboard.textContent = `Enemy's Board`;
  wrapper.appendChild(computerBoard);
  computerBoard.appendChild(titleComputerboard);
  computerBoard.classList.add("RenderedBoard");
  game.computerPlayer.gameBoard.renderGrid(computerBoard);
  playerPlaceShips();
};
const activePlayer = () => {
  activePlayer === humanPlayer ? computerPlayer : humanPlayer;
};
const startRound = () => {
  humanPlayer.gameBoard.placeShip(0, 0, 1, "horizontal");
};
const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", createPlayers);
startGameBtn.addEventListener("click", showBoards);

if (placedShips.size === 5) {
  startRound();
}
