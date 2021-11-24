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
    ai.playComputerTurn(forcedCoords);
  }

  return {getName, isComputer, attackOpponent, recordShotFired, getShotsFired, computerTurn};
}

export default Player;