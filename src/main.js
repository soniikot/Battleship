import {renderBoardsForTheFirstTime} from "./views/gameView.js";
import "./style.css";
import {createPlayers} from "./controllers/gameController.js";
import {game} from "./controllers/gameController.js";
import {createShipContainer} from "./views/gameView.js";
// import {startRound} from "./controllers/gameController.js";
// import { dropHumanShips } from "./placeHumanShips.js";

const startGameBtn = document.getElementById( "startGame" );

startGameBtn.addEventListener("click", () => {
  createPlayers();
  renderBoardsForTheFirstTime();
  createShipContainer();
  game.computerPlayer.computerPlacingShips();
});
