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

  const getRandInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  const getRandCoord = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const letter = rows[getRandInclusive(0, rows.length)];
    const number = columns[getRandInclusive(0, columns.length)];
    return `${letter}${number}`;
  }

  const computerTurn = (forcedCoord) => {
    let coord = "";

    if (forcedCoord !== undefined) {
      coord = forcedCoord;
      recordShotFired(coord);
    } else {
      coord = getRandCoord();
    }

    if (getShotsFired().indexOf(coord) > -1) {
      computerTurn();
    } else {
      recordShotFired(coord);
    }
  }

  return {getName, isComputer, attackOpponent, recordShotFired, getShotsFired, getRandCoord, computerTurn};
}

export default Player;