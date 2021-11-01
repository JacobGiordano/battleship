import Player from "./player";
import Gameboard from "./gameboard";

const Game = () => {
  const init = () => {
    const player = Player("Player 1", false);
    const computer = Player("Computer", true);
    const playerGameboard = Gameboard();
    const computerGameboard = Gameboard();
  }

  return {init};
}

export default Game;