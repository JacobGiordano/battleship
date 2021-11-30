import {game} from "../factories/game";
import ui from "../modules/ui";
import ai from "../modules/ai";

const Draggable = (draggablesSelectors, containersSelectors) => {
  let draggables = document.querySelectorAll(draggablesSelectors);
  let containers = document.querySelectorAll(containersSelectors);

  // Draggables Functions
  const dragStart = (e) => {
    e.target.classList.add("dragging");
    setTimeout(() => {
      e.target.classList.add("opacity-0");
    }, 0);
  }

  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    e.target.classList.remove("opacity-0");
    const thisGameboard = document.getElementById("player-1-board");
    ui.removeHoverPlacementClass(thisGameboard);
    ui.removeNoDropClass(thisGameboard);
  }

  // Container Functions
  const dragOver = (e) => {
    if (!e.target.classList.contains("no-drop")) {
      e.preventDefault();
    }
  }

  const dragEnter = (e) => {
    const draggingEl = document.querySelector(".dragging");
    const thisGameboard = e.target.closest(".gameboard");
    const clickedIndex = ui.getSquareIndex(e.target, thisGameboard);
    const shipLine = [];
    const indecies = [];
    let elIndex;

    ui.removeHoverPlacementClass(thisGameboard);
    ui.removeNoDropClass(thisGameboard);

    for (let i = 0; i < draggingEl.children.length; i++) {
      draggingEl.classList.contains("vertical") ? elIndex = clickedIndex + (i * 10) : elIndex = clickedIndex + i;
      const squareEl = ui.getSquareAtIndex(thisGameboard, elIndex);
      
      if (elIndex > 99 || (squareEl !== undefined && squareEl.classList.contains("ship-part"))) {
        e.target.classList.add("no-drop");
        return;
      }
      
      indecies.push(elIndex);
      draggingEl.classList.contains("vertical") ? shipLine.push(ui.getColumnFromIndex(elIndex, thisGameboard)) : shipLine.push(ui.getRowFromIndex(elIndex, thisGameboard));
    }

    if ([...new Set(shipLine)].length > 1) {
      e.target.classList.add("no-drop");
      return;
    }

    for (let j = 0; j < indecies.length; j++ ) {
      ui.getSquareAtIndex(thisGameboard, indecies[j]) !== undefined ? ui.getSquareAtIndex(thisGameboard, indecies[j]).classList.add("placement-hover") : null;
    }
  }

  const dragLeave = (e) => {
    // console.log("drag leave");
  }

  const dragDrop = (e) => {
    const draggingEl = document.querySelector(".dragging");
    const thisGameboardEl = e.target.closest(".gameboard");
    const thisGameboardObj = game.playerGameboard;
    const clickedIndex = ui.getSquareIndex(e.target, thisGameboardEl);
    let selectedSquare;
    let squareIndex;
    let coords = [];

    console.log(draggingEl);
    for (let i = 0; i < draggingEl.children.length; i++) {
      draggingEl.classList.contains("vertical") ? squareIndex = clickedIndex + (i * 10) : squareIndex = clickedIndex + i;
      draggingEl.classList.contains("vertical") ? selectedSquare = ui.getSquareAtIndex(thisGameboardEl, squareIndex) : selectedSquare = ui.getSquareAtIndex(thisGameboardEl, squareIndex);

      selectedSquare.classList.remove("placement-hover");
      selectedSquare.classList.remove("no-drop");
      selectedSquare.classList.add("ship-part");
      draggingEl.classList.contains("vertical") ? selectedSquare.classList.add("vertical") : null;

      switch(true){
        case draggingEl.classList.contains("partol-boat"):
          selectedSquare.classList.add("partol-boat");
          break;
        case draggingEl.classList.contains("destroyer"):
          selectedSquare.classList.add("destroyer");
          break;
        case draggingEl.classList.contains("submarine"):
          selectedSquare.classList.add("submarine");
          break;
        case draggingEl.classList.contains("battleship"):
          selectedSquare.classList.add("battleship");
          break;
        case draggingEl.classList.contains("carrier"):
          selectedSquare.classList.add("carrier");
          break;      
      }


      if (i == 0) {
        selectedSquare.classList.add("first");
      } else if (i == draggingEl.children.length - 1) {
        selectedSquare.classList.add("last");
      }
      coords.push(`${ai.rows[ui.getRowFromIndex(squareIndex)]}${ai.columns[ui.getColumnFromIndex(squareIndex)]}`);
    }

    thisGameboardObj.placeShip(draggingEl.dataset.shipName, coords);
    
    draggingEl.remove();
  }

  const returnDraggables = () => {
    return draggables;
  }

  const returnContainers = () => {
    return containers;
  }

  const updateDraggables = (draggablesSelectors) => {
    draggables = document.querySelectorAll(draggablesSelectors);
  }

  const updateContainers = (containersSelectors) => {
    containers = document.querySelectorAll(containersSelectors);
  }

  const addDraggablesEventListeners = (draggables) => {
    for (const draggableEl of draggables) {
      draggableEl.addEventListener("dragstart", dragStart, false);
      draggableEl.addEventListener("dragend", dragEnd, false);
      draggableEl.addEventListener("dblclick", ui.rotateDraggableShip, false);
    };
  }

  const removeDraggablesEventListeners = (draggables) => {
    for (const draggableEl of draggables) {
      draggableEl.removeEventListener("dragstart", dragStart, false);
      draggableEl.removeEventListener("dragend", dragEnd, false);
      draggableEl.removeEventListener("dblclick", ui.rotateDraggableShip, false);
    };
  }
  
  const addContainersEventListeners = (containers) => {
    for (const containerEl of containers) {
      containerEl.addEventListener("dragover", dragOver, false);
      containerEl.addEventListener("dragenter", dragEnter, false);
      containerEl.addEventListener("dragleave", dragLeave, false);
      containerEl.addEventListener("drop", dragDrop, false);
    };
  }

  const removeContainersEventListeners = (containers) => {
    for (const containerEl of containers) {
      containerEl.removeEventListener("dragover", dragOver, false);
      containerEl.removeEventListener("dragenter", dragEnter, false);
      containerEl.removeEventListener("dragleave", dragLeave, false);
      containerEl.removeEventListener("drop", dragDrop, false);
    };
  }

  return {returnDraggables, returnContainers, updateDraggables,
    updateContainers, addDraggablesEventListeners, removeDraggablesEventListeners, addContainersEventListeners, removeContainersEventListeners};
}

export default Draggable;