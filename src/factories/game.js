import Player from "./player";
import Gameboard from "./gameboard";
import ui from "../modules/ui";

const Game = () => {
  const init = () => {
    const player = Player("Player 1", false);
    const computer = Player("Computer", true);
    const playerGameboard = Gameboard(player);
    const computerGameboard = Gameboard(computer);
    ui.showCurrentPlayer(player.getName());
    // playerGameboard.prepopulateShips(playerGameboard, [
    //   ["A1"],
    //   ["B1", "B2"],
    //   ["C3", "D3", "E3"],
    //   ["J1", "J2", "J3", "J4"],
    //   ["F8", "G8", "H8", "I8", "J8"]
    // ]);
    computerGameboard.prepopulateShips(computerGameboard, [
      ["D6"],
      ["F3", "F4"],
      ["A3", "B3", "C3"],
      ["G5", "G6", "G7", "G8"],
      ["I1", "I2", "I3", "I4", "I5"]
    ]);
    playerGameboard.addSquareEventListeners(document.getElementById("player-1-board"));
    computerGameboard.addSquareEventListeners(document.getElementById("computer-board"));
  }

  return {init};
}

export default Game;