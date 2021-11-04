import "./css/styles.scss";
import Game from "./factories/game";

const initApp = () => {
  const game = Game();
  game.init();
};

document.addEventListener("DOMContentLoaded", initApp);
