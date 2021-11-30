import Ship from "../factories/ship";
import ui from "../modules/ui";
import ai from "../modules/ai";
import {game} from "../factories/game";

const Gameboard = (player) => {
  let misses = [];
  let ships = [];
  let shotsReceived = [];
  let gameboard;
  player.isComputer() ? gameboard = document.getElementById("computer-board") : gameboard = document.getElementById("player-1-board");
  const rows = ai.rows;
  const columns = ai.columns;

  const placeShip = (shipName, coordsArray) => {
    const newShip = Ship(shipName, coordsArray);
    ships.push(newShip);
    return newShip;
  };

  const getShips = () => {
    return ships;
  }

  const getMisses = () => {
    return misses;
  }

  const prepopulateShips = (gameboard, shipObjArray) => {
    const thisGameboard = gameboard;
    shipObjArray.forEach(shipObj => {
      thisGameboard.placeShip(shipObj.name, shipObj.coordsArray);
      addShipToBoard(shipObj);
    });
  }

  const addShipToBoard = (shipObj) => {
    const boardsquares = gameboard.querySelectorAll(".board-square");
    const coordsArray = shipObj.coordsArray;
    coordsArray.forEach((coords, index) => {
      const squareIndex = ai.getIndex(coords);
      boardsquares[squareIndex].classList.add("ship-part");
      shipObj.isVertical? boardsquares[squareIndex].classList.add("vertical") : null;
      if (player.isComputer()) return;
      boardsquares[squareIndex].classList.add(`${shipObj.name.toLowerCase().split(" ").join("-")}-${index + 1}`);
    });
  }

  const handleSquareClick = e => {
    const lowerCasedCurrentPlayer = document.getElementById("current-player").textContent.toLowerCase();
    
    if (gameboard.id === "player-1-board" && lowerCasedCurrentPlayer !== "computer" || gameboard.id === "computer-board" && lowerCasedCurrentPlayer === "computer") {
      return;
    }

    const clickedIndex = ui.getSquareIndex(e.target, e.target.closest(".gameboard"));
    const square = ui.getSquareAtIndex(gameboard, clickedIndex);

    const result = receiveAttack(`${rows[ui.getRowFromIndex(clickedIndex)]}${columns[ui.getColumnFromIndex(clickedIndex)]}`);
    if (result === undefined) return;
    result !== undefined && result.shot === "hit" ? ui.addHitClass(square) : ui.addMissClass(square);

    if (allShipsSunk()) {
      alert(`Game over!`);
      return;
    }

    player.isComputer() ? player.computerTurn() : null;
    lowerCasedCurrentPlayer === "computer" ? ui.showCurrentPlayer(game.player.getName()) : ui.showCurrentPlayer("Computer");
  }

  const addSquareEventListeners = (gameboardDOMElement) => {
    const boardsquares = gameboardDOMElement.querySelectorAll(".board-square");
    boardsquares.forEach(square => square.addEventListener("click", handleSquareClick, false));
  }

  const receiveAttack = coords => {
    // Takes a pair of coordinates and checks if it's a repeat hit
    // If it is, just exit out of the function & return undefined
    if (shotsReceived.indexOf(coords) > -1) {
      return;
    }
    shotsReceived.push(coords);
    const wasHit = getShips().filter(ship => ship.getCoords().indexOf(coords) > -1)[0];
    // Determines if the attack was a hit or a miss
    // If a hit, record it as a hit for the correct ship
    if (wasHit !== null & wasHit !== undefined) {
      wasHit.hit(coords); // 1.
      return {shot: "hit", coords: coords};
      // 2. Trigger showing a *hit* on the gameboard
    } else {
      // If a miss, record it in the misses array of the Gameboard
      misses.push(coords); // 1.
      // 2. Trigger showing a *miss* on the gameboard
      return {shot: "miss", coords: coords};
    }
  };

  const allShipsSunk = () => {
    // The gameboard should be able to report if all ships have been sunk or not
    return ships.length === ships.filter(ship => ship.isSunk()).length;
  };

  const resetBoard = () => {
    misses = [];
    ships = [];
    shotsReceived = [];
  }

  return {placeShip, getShips, getMisses, prepopulateShips, addSquareEventListeners, receiveAttack, allShipsSunk, resetBoard};
};

export default Gameboard;