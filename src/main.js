import GameBoard from "./Gameboard.js";
import Player from "./player.js";
import Ship from "./ship.js";
import user_interface from "./user_interface.js";
import _ from "lodash";

const startGame = () => {
  const startGameBtn = document.getElementById("startGame");
  startGameBtn.addEventListener("click", () => {
    createPlayers(), showBoards();
  });
};

const createPlayers = () => {
  const input = document.getElementById("name");
  const computerPlayer = new Player(null, true);
  const humanPlayer = new Player(input.value);
};

const showBoards = () => {
  document.body.innerHTML = "";
};

startGame();
