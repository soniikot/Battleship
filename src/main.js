import { createBoardContainers } from "./views/gameView.js";
import "./style.css";
import { createPlayers } from "./controllers/gameController.js";
import { game } from "./controllers/gameController.js";
import { createShipContainer } from "./views/gameView.js";

const startGameBtn = document.getElementById("startGame");

startGameBtn.addEventListener("click", () => {
  createPlayers();
  createBoardContainers();
  createShipContainer();
  game.computerPlayer.computerPlacingShips();
});
