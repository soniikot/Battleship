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
  game.humanPlayer = new Player("Sofia");
  console.log("players are created");
};
const showBoards = () => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "";
  const humanBoard = document.createElement("div");
  humanBoard.id = "RenderedHumanBoard";
  wrapper.appendChild(humanBoard);
  console.log("Human board created and appended");

  if (game.humanPlayer && game.humanPlayer.gameBoard) {
    game.humanPlayer.gameBoard.renderGrid(humanBoard);
    console.log("Game board rendered");
  } else {
    console.error("Human player or game board is not defined.");
  }
};
const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", createPlayers);
startGameBtn.addEventListener("click", showBoards);
