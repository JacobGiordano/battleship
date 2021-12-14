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
      let shotsReceived = gameboard.getShotsReceived();
      let hitList = gameboard.getHitList();
      let clickedIndex = hitList[hitList.length - 1];
      
      console.log(`HIT at ${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`);
      // console.log(shotsReceived)
      console.log(hitList)
      // console.log(`hitList.length = ${hitList.length}`)
  
      if (hitList.length === 1) {
        console.log("Next attack:")
        nextAttack = ai.getFirstFollowUpCoord(clickedIndex, shotsReceived);
      } else {
        // check for a pattern in the hitList vals
        let hitListRows = [];
        let hitListColumns = [];

        for (let index of hitList) {
          console.log(ai.rows[ui.getRowFromIndex(index)]);
          hitListRows.push(ai.rows[ui.getRowFromIndex(index)]);
          console.log(ai.columns[ui.getColumnFromIndex(index)]);
          hitListColumns.push(ai.columns[ui.getColumnFromIndex(index)]);
        }

        console.log([...new Set(hitListRows)]);
        console.log([...new Set(hitListColumns)]);

        if ([...new Set(hitListRows)].length > 1) {
          nextAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex + 10)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`;
        } else if ([...new Set(hitListColumns)].length > 1) {
          nextAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex + 1)]}`;
        }
      }
  
      resolve(nextAttack);
    });
  },

  getFirstFollowUpCoord: (clickedIndex, shotsReceived) => {
    let nextAttack;
    let aboveAttack;
    let belowAttack;
    let leftAttack;
    let rightAttack;
    if (clickedIndex - 10 > 0) {
      aboveAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex - 10)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`;
    }
    if (clickedIndex + 10 < 99) {
      belowAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex + 10)]}${ai.columns[ui.getColumnFromIndex(clickedIndex)]}`;
    }
    if (clickedIndex - 1 < 0) {
      leftAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex - 1)]}`;
    }
    if (clickedIndex + 1 < 99) {
      rightAttack = `${ai.rows[ui.getRowFromIndex(clickedIndex)]}${ai.columns[ui.getColumnFromIndex(clickedIndex + 1)]}`;
    }
    console.log(nextAttack);
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
      default:
    }

    return nextAttack;
  },

  playComputerTurn: (forcedCoords) => {
    let coords = "";
    let shotsFired = game.computer.getShotsFired();

    console.log(`RECEIVED forced coords: ${forcedCoords}`);
    if (forcedCoords !== undefined) {
      coords = forcedCoords;
    } else {
      coords = ai.getRandCoords();
    }

    if (shotsFired.indexOf(coords) > -1) {
      console.log("RERUNNING COMPUTER TURN!");
      ai.playComputerTurn();
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