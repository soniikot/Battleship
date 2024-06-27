import Player from "../models/player.js";
import GameBoard from "../models/gameboard.js";
import {shipCollection} from "../helpers/constraints.js";
import {renderHumanBoard} from "../views/gameView.js";
import {Game} from '../models/game.js';

import {
  getCoordinates,
  renderComputerBoard,
  renderHumanBoard,
  displayGameOverMessage,
} from "../views/gameView.js";


let game;

export const createPlayers = () => {
  const input = document.getElementById( "name" );
  game = new Game( input )
};

const switchPlayer = () => {
  game.currentPlayer =
    game.currentPlayer === game.humanPlayer
      ? game.computerPlayer
      : game.humanPlayer;
};

export const startRound = () => {
  const computerBoard = document.getElementById( "renderedComputerBoard" );

  getCoordinates( computerBoard ).then( ( {row, col} ) => {
    game.computerPlayer.gameBoard.receiveAttack( row, col );
    computerBoard.innerHTML = "";
    renderComputerBoard();
    switchPlayer();

    game.humanPlayer.computerAttacks();

    renderHumanBoard();

    switchPlayer();

    if ( game.computerPlayer.gameBoard.checkWinners() === true ) {
      displayGameOverMessage( "humanPlayerWin" );
    } else if ( game.humanPlayer.gameBoard.checkWinners() === true ) {
      displayGameOverMessage( "computerPlayerWin" );
    } else if (
      game.computerPlayer.gameBoard.grid.every( ( array ) =>
        array.every( ( element ) => element !== null )
      )
    ) {
      console.log( game.computerPlayer.gameBoard.grid );
      displayGameOverMessage( "Draw" );
    } else {
      startRound();
    }
  } );
};

export const handleDragStart = ( event ) => {
  event.dataTransfer.setData( "text/plain", event.target.dataset.ship );
};

export const handleDragOver = ( event ) => {
  event.preventDefault();
};

const placedHumanShips = new Set();

export const dropHumanShips = ( event ) => {
  event.preventDefault();
  const shipName = event.dataTransfer.getData( "text/plain" );

  const ship = shipCollection[shipName];
  const row = parseInt( event.target.dataset.row, 10 );
  const col = parseInt( event.target.dataset.col, 10 );
  const direction = "horizontal";

  if (
    game.humanPlayer.gameBoard.placeShip( row, col, ship.length, direction ) ===
    "ship placed"
  ) {
    renderHumanBoard();
    placedHumanShips.add( shipName );

    const shipElement = document.querySelector(
      `.ship[data-ship="${ shipName }"]`
    );

    if ( shipElement ) {
      shipElement.remove();
    }

    if ( placedHumanShips.size === 5 ) {
      startRound();
    }
  }
};




