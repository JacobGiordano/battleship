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
    console.log(clickedShip);
    if (document.getElementById("player-fleet-wrapper").contains(clickedShip)) {
      clickedShip.classList.contains("vertical") ? clickedShip.classList.remove("vertical") : clickedShip.classList.add("vertical");
    }
  }
}

export default ui;