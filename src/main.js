import { renderBoardsforTheFirstTime } from "./GUI.js";
import "./style.css";
import { createPlayers } from "./gameMechanics.js";
import { game } from "./gameMechanics.js";
import { createShipContainer } from "./GUI.js";
import { startRound } from "./gameMechanics.js";
import { dropHumanShips } from "./placeHumanShips.js";

const startGameBtn = document.getElementById("startGame");
startGameBtn.addEventListener("click", () => {
  createPlayers();
  renderBoardsforTheFirstTime();
  createShipContainer();
  game.computerPlayer.computerPlacingShips();
});
