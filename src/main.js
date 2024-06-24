import GameBoard from "./Gameboard.js";
import Player from "./player.js";
import Ship from "./ship.js";
import "./style.css";

import _ from "lodash";
const game = {
  humanPlayer: null,
  computerPlayer: null,
};
const createPlayers = () => {
  const input = document.getElementById("name");
  game.computerPlayer = new Player(null, true);
  game.humanPlayer = new Player(input.value);
  console.log("players works");
};
const shipCollection = {
  aircraftCarrier: new Ship(5),
  battleShip: new Ship(4),
  cruiser: new Ship(3),
  submarine: new Ship(3),
  destroyer: new Ship(2),
};
const startPlacingships = () => {};

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
  game.computerPlayer.gameBoard.renderGrid(computerBoard);
  //startPlacingships();
  console.log("boardd works");
};
const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", createPlayers);
startGameBtn.addEventListener("click", showBoards);
