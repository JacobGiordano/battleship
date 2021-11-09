import Ship from "../factories/ship";
import Player from "./player";

const Gameboard = () => {
  let misses = [];
  let ships = [];
  let shotsReceived = [];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  let disableBoardClicks = false;

  const placeShip = coordsArray => {
    const newShip = Ship(coordsArray);
    ships.push(newShip);
    return newShip;
  };

  const getShips = () => {
    return ships;
  }

  const getMisses = () => {
    return misses;
  }

  const prepopulateShips = (player, gameboard, coords2DArray) => {
    const thisGameboard = gameboard;
    coords2DArray.forEach(array => {
      thisGameboard.placeShip(array);
      addShipToBoard(player, array)
    });
  }

  const addShipToBoard = (player, coordsArray) => {
    let gameboard;
    player.isComputer() ? gameboard = document.getElementById("computer-board") : gameboard = document.getElementById("player-1-board");
    const boardsquares = gameboard.querySelectorAll(".board-square");

    coordsArray.forEach(coords => {
      const splitCoords = coords.split("");
      const row = rows.indexOf(splitCoords[0]) * 10;
      const column = columns.indexOf(splitCoords[1]);
      boardsquares[row + column].classList.add("ship-part");
    });
  }

  const _getClickedIndex = (e) => {
    return Array.from(e.target.parentNode.children).indexOf(e.target);
  }

  const _getClickedRow = clickedIndex => {
    return Math.floor(clickedIndex / 10);
  }

  const _getClickedColumn = clickedIndex => {
    return clickedIndex - (Math.floor(clickedIndex / 10) * 10);
  }

  const _handleSquareClick = e => {
    const clickedIndex = _getClickedIndex(e);
    const result = receiveAttack(`${rows[_getClickedRow(clickedIndex)]}${columns[_getClickedColumn(clickedIndex)]}`)
    result !== undefined ? console.log(result) : null;
    const gameOver = allShipsSunk();
    gameOver ? alert(`Game over!`) : null;
  }

  const addSquareEventListeners = (gameboardDOMElement) => {
    const boardsquares = gameboardDOMElement.querySelectorAll(".board-square");
    boardsquares.forEach(square => square.addEventListener("click", _handleSquareClick, false))
  }

  const receiveAttack = coords => {
    // Takes a pair of coordinates and checks if it's a repeat hit
    // If it is, just exit out of the function & return undefined
    if (shotsReceived.indexOf(coords) > -1) {
      return;
    }
    shotsReceived.push(coords);
    const wasHit = getShips().filter(ship => ship.coords.indexOf(coords) > -1)[0];
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

  return {placeShip, getShips, getMisses, prepopulateShips, addSquareEventListeners, receiveAttack, allShipsSunk};
};

export default Gameboard;