import {game} from "../factories/game";
import ai from "../modules/ai";
import Draggable from "../factories/draggable";

const ui = {
  showCurrentPlayer: currentPlayer => {
    document.getElementById("current-player").textContent = currentPlayer;
  },

  updateBattleStatus: currentPlayer => {
    currentPlayer.toLowerCase() === "computer" ? document.getElementById("battle-status").textContent = "Awaiting attack…" : document.getElementById("battle-status").textContent = "Attack!";
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
    setTimeout(() => {
      squareEl.classList.remove("hit");
      squareEl.classList.add("smoke");
    }, 800);
  },

  addMissClass: squareEl => {
    squareEl.classList.add("miss");
  },

  rotateDraggableShip: e => {
    const clickedShip = e.target.closest(".ship");
    if (document.getElementById("player-fleet-wrapper").contains(clickedShip)) {
      if (clickedShip.classList.contains("vertical")) {
        clickedShip.classList.remove("vertical");
        for (let shipPart of clickedShip.children) {
          shipPart.classList.remove("vertical");
        }
      } else {
        clickedShip.classList.add("vertical");
        for (let shipPart of clickedShip.children) {
          shipPart.classList.add("vertical");
        }
      }
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

  hidePlayerShipEls: () => {
    document.getElementById("player-fleet-wrapper").classList.add("invisible");
  },

  handleRandomPlayerShips: () => {
    const draggableShips = document.getElementById("player-fleet-wrapper").querySelectorAll(".ship");
    const player1BoardShips = document.getElementById("player-1-board").querySelectorAll(".ship-part");

    if (draggableShips.length === 0 || player1BoardShips.length > 0) {
      return;
    }

    game.playerGameboard.prepopulateShips(game.playerGameboard, ai.createRandShipsArray());

    for (const ship of draggableShips) {
      ship.remove();
    }

    document.getElementById("random-player-ships-btn").classList.add("hidden");
    document.getElementById("start-game-btn").classList.remove("hidden");
  },

  populateDraggableShips: () => {
    const fleetWrapper = document.getElementById("ships-wrapper");
    const docFrag = new DocumentFragment();
    const ships = [
      {name: "Patrol Boat", numOfParts: 2}, 
      {name: "Destroyer", numOfParts: 3}, 
      {name: "Submarine", numOfParts: 3}, 
      {name: "Battleship", numOfParts: 4}, 
      {name: "Carrier", numOfParts: 5}
    ];

    for (let i = 0; i < ships.length; i++) {
      const newShip = ui.createDraggableShip(ships[i].name, ships[i].numOfParts);
      docFrag.appendChild(newShip);
    }

    fleetWrapper.appendChild(docFrag);
    ui.handleNewShipEventListeners();
  },

  handleNewShipEventListeners: () => {
    if (ui.draggableEls === undefined) {
      ui.draggableEls = Draggable(".ship", "#player-1-board");
      ui.draggableEls.addDraggablesEventListeners(ui.draggableEls.returnDraggables());
      ui.draggableEls.addContainersEventListeners(ui.draggableEls.returnContainers());
    } else {
      ui.draggableEls.removeDraggablesEventListeners(ui.draggableEls.returnDraggables());
      ui.draggableEls.removeContainersEventListeners(ui.draggableEls.returnContainers());
      ui.draggableEls.updateDraggables(".ship");
      ui.draggableEls.updateContainers("#player-1-board");
      ui.draggableEls.addDraggablesEventListeners(ui.draggableEls.returnDraggables());
      ui.draggableEls.addContainersEventListeners(ui.draggableEls.returnContainers());
    }
  },

  createDraggableShip: (shipName, numOfParts) => {
    const ship = document.createElement("div");
    const shipNameClass = shipName.toLowerCase().split(" ").join("-");
    ship.classList.add("ship");
    ship.draggable = true;
    ship.classList.add(shipNameClass);

    for (let i = 0; i < numOfParts; i++) {
      const shipPart = document.createElement("div");
      shipPart.classList.add("ship-part");
      shipPart.classList.add(shipNameClass);
      ship.appendChild(shipPart);
    }

    return ship;
  },

  deleteAllDraggableShips: () => {
    const draggableShips = document.getElementById("ships-wrapper").querySelectorAll(".ship");
    for (const ship of draggableShips) {
      ship.remove();
    }
  },

  handleNewGameClick: () => {
    const allShipSquares = document.querySelectorAll(".board-square");
    for (let square of allShipSquares) {
      square.classList = "board-square";
    }

    game.playerGameboard.resetBoard();
    game.computerGameboard.resetBoard();
    game.computerGameboard.prepopulateShips(game.computerGameboard, ai.createRandShipsArray());
    ui.deleteAllDraggableShips();
    ui.populateDraggableShips();
    document.getElementById("random-player-ships-btn").classList.remove("hidden");
    document.getElementById("player-fleet-wrapper").classList.remove("hidden");
    document.getElementById("computer-board-wrapper").classList.add("hidden");
    document.getElementById("start-game-btn").classList.add("hidden");
  },

  startGame: () => {
    document.getElementById("player-fleet-wrapper").classList.add("hidden");
    document.getElementById("computer-board-wrapper").classList.remove("hidden");
  }
}

document.getElementById("random-player-ships-btn").addEventListener("click", ui.handleRandomPlayerShips, false);
document.getElementById("new-game").addEventListener("click", ui.handleNewGameClick, false);
document.getElementById("start-game-btn").addEventListener("click", ui.startGame, false);

export default ui;