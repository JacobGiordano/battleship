import Player from "./player";
import Gameboard from "./gameboard";
import ui from "../modules/ui";
import ai from "../modules/ai";

const Game = () => {
  const player = Player("You", false);
  const computer = Player("Computer", true);
  const playerGameboard = Gameboard(player);
  const computerGameboard = Gameboard(computer);
  
  ui.showCurrentPlayer(player.getName());
  computerGameboard.prepopulateShips(computerGameboard, ai.createRandShipsArray());
  playerGameboard.addSquareEventListeners(document.getElementById("player-1-board"));
  computerGameboard.addSquareEventListeners(document.getElementById("computer-board"));
  ui.populateDraggableShips();

  return {player, computer, playerGameboard, computerGameboard};
}

let game = Game();

export {Game as default, game};