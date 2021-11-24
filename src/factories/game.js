import Player from "./player";
import Gameboard from "./gameboard";
import ui from "../modules/ui";
import ai from "../modules/ai";

const Game = () => {
  const init = () => {
    const player = Player("Player 1", false);
    const computer = Player("Computer", true);
    const playerGameboard = Gameboard(player);
    const computerGameboard = Gameboard(computer);
    ui.showCurrentPlayer(player.getName());
    playerGameboard.prepopulateShips(playerGameboard, ai.createRandShipsArray());
    computerGameboard.prepopulateShips(computerGameboard, ai.createRandShipsArray());
    playerGameboard.addSquareEventListeners(document.getElementById("player-1-board"));
    computerGameboard.addSquareEventListeners(document.getElementById("computer-board"));
  }

  return {init};
}

export default Game;