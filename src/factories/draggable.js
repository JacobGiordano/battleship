import ui from "../modules/ui";

const Draggable = (draggablesSelectors, containersSelectors) => {
  const draggables = document.querySelectorAll(draggablesSelectors);
  const containers = document.querySelectorAll(containersSelectors);

  // Draggables Functions
  const dragStart = (e) => {
    // console.log("drag start");
    e.target.classList.add("dragging");
    setTimeout(() => {
      e.target.classList.add("invisible");
    }, 0);
  }

  const dragEnd = (e) => {
    // console.log("drag end");
    e.target.classList.remove("dragging");
    e.target.classList.remove("invisible");

    const placementHoverEls = document.getElementById("player-1-board").querySelectorAll(".placement-hover");

    for(let el of placementHoverEls) {
      el.classList.remove("placement-hover");
    }
  }

  // Container Functions
  const dragOver = (e) => {
    // console.log("drag over");
    if (!e.target.classList.contains("no-drop")) {
      e.preventDefault();
    }
  }

  const dragEnter = (e) => {
    // console.log("drag enter");
    // e.preventDefault();
    const draggingEl = document.querySelector(".dragging");
    const thisGameboard = e.target.closest(".gameboard");
    const clickedIndex = ui.getSquareIndex(e.target, thisGameboard);
    const placementHoverEls = thisGameboard.querySelectorAll(".placement-hover");
    const shipLine = [];

    for(let el of placementHoverEls) {
      el.classList.remove("placement-hover");
    }

    for (let i = 0; i < draggingEl.children.length; i++) {
      if (draggingEl.classList.contains("vertical")) {
        const elIndex = clickedIndex + (i * 10);
        ui.getSquareAtIndex(thisGameboard, elIndex).classList.add("placement-hover");
        shipLine.push(ui.getColumnFromIndex(elIndex, thisGameboard));
      } else {
        const elIndex = clickedIndex + i;
        ui.getSquareAtIndex(thisGameboard, elIndex).classList.add("placement-hover");
        shipLine.push(ui.getRowFromIndex(elIndex, thisGameboard));
      }
    }

    console.log(shipLine);

    [...new Set(shipLine)].length > 1 ? ui.getSquareAtIndex(thisGameboard, clickedIndex).classList.add("no-drop") : ui.getSquareAtIndex(thisGameboard, clickedIndex).classList.remove("no-drop");

    console.log([...new Set(shipLine)].length);

    // console.log(ui.getSquareIndex(e.target, thisGameboard));
  }

  const dragLeave = (e) => {
    // console.log("drag leave");
    // const draggingEl = document.querySelector(".dragging");
    // const thisGameboard = e.target.closest(".gameboard");
    // const clickedIndex = ui.getSquareIndex(e.target, thisGameboard);
    
    // for (let i = 0; i < draggingEl.children.length; i++) {
    //   if (draggingEl.classList.contains("vertical")) {
    //     ui.getSquareAtIndex(thisGameboard, clickedIndex + (i * 10)).classList.remove("placement-hover");
    //   } else {
    //     ui.getSquareAtIndex(thisGameboard, clickedIndex + i).classList.remove("placement-hover");
    //   }
    // }
  }

  const dragDrop = (e) => {
    const draggingEl = document.querySelector(".dragging");
    const thisGameboard = e.target.closest(".gameboard");
    const clickedIndex = ui.getSquareIndex(e.target, thisGameboard);

    for (let i = 0; i < draggingEl.children.length; i++) {
      if (draggingEl.classList.contains("vertical")) {
        const selectedSquare = ui.getSquareAtIndex(thisGameboard, clickedIndex + (i * 10));
        selectedSquare.classList.remove("placement-hover");
        selectedSquare.classList.add("ship-part");
      } else {
        const selectedSquare = ui.getSquareAtIndex(thisGameboard, clickedIndex + i);
        selectedSquare.classList.remove("placement-hover");
        selectedSquare.classList.add("ship-part");
      }
    }
    
    draggingEl.remove();
    
    // console.log("drop");
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