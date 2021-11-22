import ui from "../modules/ui";

const Draggable = (draggablesSelectors, containersSelectors) => {
  const draggables = document.querySelectorAll(draggablesSelectors);
  const containers = document.querySelectorAll(containersSelectors);

  // Draggables Functions
  const dragStart = (e) => {
    e.target.classList.add("dragging");
    setTimeout(() => {
      e.target.classList.add("invisible");
    }, 0);
  }

  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    e.target.classList.remove("invisible");
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
    const thisGameboard = e.target.closest(".gameboard");
    const clickedIndex = ui.getSquareIndex(e.target, thisGameboard);
    let selectedSquare;

    for (let i = 0; i < draggingEl.children.length; i++) {
      draggingEl.classList.contains("vertical") ? selectedSquare = ui.getSquareAtIndex(thisGameboard, clickedIndex + (i * 10)) : selectedSquare = ui.getSquareAtIndex(thisGameboard, clickedIndex + i);
      selectedSquare.classList.remove("placement-hover");
      selectedSquare.classList.remove("no-drop");
      selectedSquare.classList.add("ship-part");
    }
    
    draggingEl.remove();
  }

  const returnDraggables = () => {
    return draggables;
  }

  const returnContainers = () => {
    return containers;
  }

  for(const draggableEl of draggables) {
    draggableEl.addEventListener("dragstart", dragStart, false);
    draggableEl.addEventListener("dragend", dragEnd, false);
  };

  for(const containerEl of containers) {
    containerEl.addEventListener("dragover", dragOver, false);
    containerEl.addEventListener("dragenter", dragEnter, false);
    containerEl.addEventListener("dragleave", dragLeave, false);
    containerEl.addEventListener("drop", dragDrop, false);
  };

  return {returnDraggables, returnContainers};
}

const draggableEls = Draggable(".ship", "#player-1-board");
for (let element of draggableEls.returnDraggables()) {
  element.addEventListener("dblclick", ui.rotateDraggableShip, false);
};

// console.log(draggableEls.returnDraggables());
export default Draggable;