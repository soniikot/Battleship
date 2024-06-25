import { handleDragStart, handleDragOver, handleDrop } from "./DragDrop.js";
import { startPlacingShips, renderHumanBoard } from "./GUI.js";
import Player from "./player.js";
import { shipCollection } from "./helpers/constrants.js";
import Ship from "./ship.js";
import "./style.css";

export const game = {
  humanPlayer: null,
  computerPlayer: null,
};

export const placedHumanShips = new Set();

const createPlayers = () => {
  const input = document.getElementById("name");
  game.computerPlayer = new Player(null, true);
  game.humanPlayer = new Player(input.value);
};

const showBoards = () => {
  const wrapper = document.querySelector(".wrapper");
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
  game.computerPlayer.gameBoard.renderGrid(titleComputerboard);

  startPlacingShips();
};

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", createPlayers);
startGameBtn.addEventListener("click", showBoards);
