import Player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";

const Game = () => {
  const players = [];

  const init = () => {
    const player = Player("Player 1", false);
    const computer = Player("Computer", true);
    players.push(player);
    players.push(computer);
    const playerGameboard = Gameboard();
    const computerGameboard = Gameboard();
    playerGameboard.prepopulateShips(player, playerGameboard, [
      ["A1"],
      ["B1", "B2"],
      ["C3", "D3", "E3"],
      ["J1", "J2", "J3", "J4"],
      ["F8", "G8", "H8", "I8", "J8"]
    ]);
    computerGameboard.prepopulateShips(computer, computerGameboard, [
      ["C1"],
      ["F3", "F4"],
      ["A1", "B1", "C1"],
      ["G5", "G6", "G7", "G8"],
      ["I1", "I2", "I3", "I4", "I5"]
    ]);
  }

  const getPlayers = () => {
    return players;
  }

  return {init, getPlayers};
}

export default Game;