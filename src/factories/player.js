const Player = (name, isComputerBool, isPlayerTurn) => {
  let shotsFired = [];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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

  const getRandInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const getRandCoords = () => {
    const letter = rows[getRandInclusive(0, rows.length -1)];
    const number = columns[getRandInclusive(0, columns.length -1)];
    return `${letter}${number}`;
  }

  const getIndex = coords => {
    const letter = coords.slice(0, 1);
    const numbers = coords.slice(1, coords.length);
    return (rows.indexOf(letter) * 10) + columns.indexOf(numbers);
  }

  const computerTurn = (forcedCoords) => {
    let coords = "";

    if (forcedCoords !== undefined) {
      coords = forcedCoords;
      recordShotFired(coords);
    } else {
      coords = getRandCoords();
    }

    if (getShotsFired().indexOf(coords) > -1) {
      computerTurn();
    } else {
      setTimeout(() => {
        recordShotFired(coords);
        const squareIndex = getIndex(coords);
        const square = Array.from(document.querySelectorAll(".board-square"))[squareIndex];
        square.click();
      }, 500);
    }
  }

  return {isPlayerTurn, getName, isComputer, attackOpponent, recordShotFired, getShotsFired, getRandCoords, computerTurn};
}

export default Player;