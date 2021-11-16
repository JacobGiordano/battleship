const ui = {
  showCurrentPlayer: currentPlayer => {
    document.getElementById("current-player").textContent = currentPlayer;
  },

  getClickedIndex: (e) => {
    return [...e.target.parentNode.children].indexOf(e.target);
  },

  getClickedRow: clickedIndex => {
    return Math.floor(clickedIndex / 10);
  },

  getClickedColumn: clickedIndex => {
    return clickedIndex - (Math.floor(clickedIndex / 10) * 10);
  },

  addHitClass: squareEl => {
    squareEl.classList.add("hit");
  },

  addMissClass: squareEl => {
    squareEl.classList.add("miss");
  }
}

export default ui;