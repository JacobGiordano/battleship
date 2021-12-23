import {game} from "../factories/game";
import ui from "./ui";

const ai = {
  rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],

  columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],

  getRandInclusive: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },

  getRandCoords: () => {
    const letter = ai.rows[ai.getRandInclusive(0, ai.rows.length -1)];
    const number = ai.columns[ai.getRandInclusive(0, ai.columns.length -1)];
    return `${letter}${number}`;
  },

  getIndex: coords => {
    const letter = coords.slice(0, 1);
    const numbers = coords.slice(1, coords.length);
    return (ai.rows.indexOf(letter) * 10) + ai.columns.indexOf(numbers);
  },

  createRandShipsArray: () => {
    const shipsArray = [];
    const allShipCoords = [];
    const shipNames = ["Patrol Boat", "Destroyer", "Submarine", "Battleship", "Carrier"];
    const shipPartsCount = [2, 3, 3, 4, 5];

    for (let i = 0; i < shipNames.length; i++) {
      const randShipInfo = ai.createRandShipCoords(shipPartsCount[i]);
      const isVertical = randShipInfo.isVertical;
      const randCoords = randShipInfo.shipCoords;
      const containsDups =  allShipCoords.some(coord => randCoords.includes(coord));
      if (containsDups) {
        i -= 1;
      } else {
        allShipCoords.push(...randCoords);
        shipsArray.push({name: shipNames[i], isVertical, coordsArray: randCoords});
      }
    }

    return shipsArray;
  },

  createRandShipCoords: (shipLength) => {
    let row = ai.rows[ai.getRandInclusive(0, ai.rows.length - 1)];
    let rowIndex = ai.rows.indexOf(row);
    let column = parseInt(ai.columns[ai.getRandInclusive(0, ai.columns.length - 1)]);
    let isVertical;
    let verticalBinary = ai.getRandInclusive(0, 1);
    verticalBinary === 0 ? isVertical = false : isVertical = true;
    const shipCoords = [];

    if (isVertical && rowIndex + shipLength > 9) { // vertical
      rowIndex = rowIndex - shipLength;
      row = ai.rows[rowIndex];
    } else if (!isVertical && (column + shipLength > 10)) { // horizontal
      column = 10 - shipLength;
    }
    
    for (let i = 0; i < shipLength; i++) {
      if (isVertical) {
        shipCoords.push(`${ai.rows[rowIndex + i]}${column}`);
      } else {
        shipCoords.push(`${row}${column + i}`);
      }
    }

    return {"isVertical": isVertical, "shipCoords": shipCoords};
  },

  followUpAttack: (gameboard) => {
    return new Promise(resolve => {
      let nextAttack;
      let hitList = gameboard.getHitList();
      let clickedIndex = hitList[hitList.length - 1];
  
      if (hitList.length === 1) {
        nextAttack = ai.getFirstFollowUpCoord(clickedIndex);
      } else {
        nextAttack = ai.getNextAttack();
      }
  
      resolve(nextAttack);
    });
  },

  getSurroundingCoords: (clickedIndex) => {
    let surroundingCoords = {
      aboveAttack: undefined,
      belowAttack: undefined,
      leftAttack: undefined,
      rightAttack: undefined
    }

    if (clickedIndex - 10 > 0) {
      surroundingCoords.aboveAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex - 10)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`;
    }
    if (clickedIndex + 10 < 99) {
      surroundingCoords.belowAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex + 10)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`;
    }
    if (clickedIndex - 1 > 0) {
      surroundingCoords.leftAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex - 1)]}`;
    }
    if (clickedIndex + 1 < 99) {
      surroundingCoords.rightAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex + 1)]}`;
    }

    return surroundingCoords;
  },

  getFirstFollowUpCoord: (clickedIndex) => {
    let nextAttack;
    const shotsReceived = game.playerGameboard.getShotsReceived();
    const surroundingCoords = ai.getSurroundingCoords(clickedIndex);
    let aboveAttack = surroundingCoords.aboveAttack;
    let belowAttack = surroundingCoords.belowAttack;
    let leftAttack = surroundingCoords.leftAttack;
    let rightAttack = surroundingCoords.rightAttack;

    switch (true) {
      case (aboveAttack !== undefined && shotsReceived.indexOf(aboveAttack) === -1):
        nextAttack = aboveAttack;
        break;
      case (belowAttack !== undefined && shotsReceived.indexOf(belowAttack) === -1):
        nextAttack = belowAttack;
        break;
      case (leftAttack !== undefined && shotsReceived.indexOf(leftAttack) === -1):
        nextAttack = leftAttack;
        break;
      case (rightAttack !== undefined && shotsReceived.indexOf(rightAttack) === -1):
        nextAttack = rightAttack;
        break;
    }

    return nextAttack;
  },

  getNextAttack: () => {
    let nextAttack;
    const shotsReceived = game.playerGameboard.getShotsReceived();
    const huntedShips = game.playerGameboard.getHuntedShips();
    const firstHuntedShip = huntedShips[0];
    const availableShots = firstHuntedShip.getCoords().filter(coords => {
      return shotsReceived.indexOf(coords) === -1;
    });

    nextAttack = availableShots[ai.getRandInclusive(0, availableShots.length - 1)];

    return nextAttack;
  },

  playComputerTurn: async (forcedCoords) => {
    let coords = "";
    let shotsFired = game.computer.getShotsFired();

    if (forcedCoords !== undefined) {
      coords = forcedCoords;
    } else if (game.playerGameboard.getHitList().length > 0){
      coords = await ai.followUpAttack(game.playerGameboard);
    } else {
      coords = ai.getRandCoords();
    }

    if (shotsFired.indexOf(coords) > -1) {
      ai.playComputerTurn();
      return;
    } else {
      setTimeout(() => {
        game.computer.recordShotFired(coords);
        const squareIndex = ai.getIndex(coords);
        const square = [...document.querySelectorAll(".board-square")][squareIndex];
        square.click();
      }, game.turnDelay);
    }
  }
}

export default ai;