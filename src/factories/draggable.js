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
    // console.log("drag start");
  }

  const dragEnd = (e) => {
    e.target.classList.remove("dragging");
    e.target.classList.remove("invisible");
    // console.log("drag end");
  }

  // Container Functions
  const dragOver = (e) => {
    e.preventDefault();
    // console.log("drag over");
  }

  const dragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add("placement-hover");
    // console.log("drag enter");
    console.log(ui.getClickedIndex(e));
  }

  const dragLeave = (e) => {
    e.target.classList.remove("placement-hover");
    // console.log("drag leave");
  }

  const dragDrop = (e) => {
    const draggingEl = document.querySelector(".dragging");
    e.target.classList.remove("placement-hover");
    // e.target.appendChild(draggingEl);
    console.log(draggingEl.children.length);
    const clickedIndex = ui.getClickedIndex(e);
    const thisGameboard = e.target.closest(".gameboard");
    // console.log(ui.getSquareAtIndex(thisGameboard, clickedIndex));

    
    // console.log("Incoming!");
    for (let i = 0; i < draggingEl.children.length; i++) {
      if (draggingEl.classList.contains("vertical")) {
        // console.log(ui.getSquareAtIndex(thisGameboard, clickedIndex + (i * 10)));
        ui.getSquareAtIndex(thisGameboard, clickedIndex + (i * 10)).classList.add("ship-part");
      } else {
        // console.log(ui.getSquareAtIndex(thisGameboard, clickedIndex + i));
        ui.getSquareAtIndex(thisGameboard, clickedIndex + i).classList.add("ship-part");
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

const draggableEls = Draggable(".ship", ".board-square");
for (let element of draggableEls.returnDraggables()) {
  element.addEventListener("dblclick", ui.rotateDraggableShip, false);
};

// console.log(draggableEls.returnDraggables());
export default Draggable;