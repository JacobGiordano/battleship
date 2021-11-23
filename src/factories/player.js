import ai from "../modules/ai";

const Player = (name, isComputerBool) => {
  let shotsFired = [];

  const getName = () => {
    return name;
  }

  const isComputer = () => {
    return isComputerBool;
  }

  const attackOpponent = (coords, opponentGameboard) => {
    recordShotFired(coords);
    return opponentGameboard.receiveAttack(coords);
  }

  const recordShotFired = coords => {
    shotsFired.push(coords);
  }

  const getShotsFired = () => {
    return shotsFired;
  }

  const computerTurn = (forcedCoords) => {
    let coords = "";

    if (forcedCoords !== undefined) {
      coords = forcedCoords;
      recordShotFired(coords);
    } else {
      coords = ai.getRandCoords();
    }
    console.log(coords);
    if (shotsFired.indexOf(coords) > -1) {
      console.log(`WAIT! shotsFired.indexOf(${coords}) > -1. trying again`);
      computerTurn();
    } else {
      console.log(`All clear! Firing on ${coords}!`);
      setTimeout(() => {
        recordShotFired(coords);
        const squareIndex = ai.getIndex(coords);
        const square = [...document.querySelectorAll(".board-square")][squareIndex];
        square.click();
      }, 750);
    }
  }

  return {getName, isComputer, attackOpponent, recordShotFired, getShotsFired, computerTurn};
}

export default Player;