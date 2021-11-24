import {game} from "../factories/game";
import ai from "../modules/ai";

const ui = {
  showCurrentPlayer: currentPlayer => {
    document.getElementById("current-player").textContent = currentPlayer;
  },

  getSquareIndex: (element, parentEl) => {
    return [...parentEl.children].indexOf(element);
  },

  getSquareAtIndex: (gameboard, index) => {
    return [...gameboard.querySelectorAll(".board-square")][index];
  },

  getRowFromIndex: clickedIndex => {
    return Math.floor(clickedIndex / 10);
  },

  getColumnFromIndex: clickedIndex => {
    return clickedIndex - (Math.floor(clickedIndex / 10) * 10);
  },

  addHitClass: squareEl => {
    squareEl.classList.add("hit");
  },

  addMissClass: squareEl => {
    squareEl.classList.add("miss");
  },

  rotateDraggableShip: e => {
    const clickedShip = e.target.closest(".ship");
    if (document.getElementById("player-fleet-wrapper").contains(clickedShip)) {
      clickedShip.classList.contains("vertical") ? clickedShip.classList.remove("vertical") : clickedShip.classList.add("vertical");
    }
  },

  removeHoverPlacementClass: (gameBoardEl) => {
    const placementHoverEls = gameBoardEl.querySelectorAll(".placement-hover");
    for(let el of placementHoverEls) {
      el.classList.remove("placement-hover");
    }
  },

  removeNoDropClass: (gameBoardEl) => {
    const noDropEls = gameBoardEl.querySelectorAll(".no-drop");
    for(let el of noDropEls) {
      el.classList.remove("no-drop");
    }
  },

  disableDraggableShips: () => {
    const draggableShips = document.getElementById("player-fleet-wrapper").querySelectorAll(".ship");

    for (const ship of draggableShips) {
      ship.draggable = false;
    }
  },

  enableDraggableShips: () => {
    const draggableShips = document.getElementById("player-fleet-wrapper").querySelectorAll(".ship");

    for (const ship of draggableShips) {
      ship.draggable = true;
    }
  },

  hideDraggableShips: () => {
    const draggableShips = document.getElementById("player-fleet-wrapper").querySelectorAll(".ship");

    for (const ship of draggableShips) {
      ship.classList.add("invisible");
    }
  },

  showDraggableShips: () => {
    const draggableShips = document.getElementById("player-fleet-wrapper").querySelectorAll(".ship");

    for (const ship of draggableShips) {
      ship.classList.remove("invisible");
    }
  },

  handleRandomPlayerShips: () => {
    game.playerGameboard.prepopulateShips(game.playerGameboard, ai.createRandShipsArray());
    ui.hideDraggableShips();
    ui.disableDraggableShips();
  }
}

document.getElementById("random-player-ships-btn").addEventListener("click", ui.handleRandomPlayerShips, false)

export default ui;