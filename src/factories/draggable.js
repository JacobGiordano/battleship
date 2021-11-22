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
    let elIndex;

    ui.removeHoverPlacementClass(thisGameboard);

    for (let i = 0; i < draggingEl.children.length; i++) {
      draggingEl.classList.contains("vertical") ? elIndex = clickedIndex + (i * 10) : elIndex = clickedIndex + i;
      if (elIndex > 99) {
        e.target.classList.add("no-drop");
        return;
      }
      ui.getSquareAtIndex(thisGameboard, elIndex).classList.add("placement-hover");
      draggingEl.classList.contains("vertical") ? shipLine.push(ui.getColumnFromIndex(elIndex, thisGameboard)) : shipLine.push(ui.getRowFromIndex(elIndex, thisGameboard));
    }

    [...new Set(shipLine)].length > 1 ? ui.getSquareAtIndex(thisGameboard, clickedIndex).classList.add("no-drop") : ui.getSquareAtIndex(thisGameboard, clickedIndex).classList.remove("no-drop");
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