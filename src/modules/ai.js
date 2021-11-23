

const ai = {
  rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],

  columns: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],

  getRandInclusive: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },

  getRandCoords: () => {
    const letter = ai.rows[ai.getRandInclusive(0, ai.rows.length -1)];
    const number = ai.columns[ai.getRandInclusive(0, ai.columns.length -1)];
    return `${letter}${number}`;
  },

  getIndex: coords => {
    const letter = coords.slice(0, 1);
    const numbers = coords.slice(1, coords.length);
    return (ai.rows.indexOf(letter) * 10) + ai.columns.indexOf(numbers);
  },

  createRandShipCoords: (shipLength) => {
    let row = ai.rows[ai.getRandInclusive(0, ai.rows.length - 1)];
    let rowIndex = ai.rows.indexOf(row);
    let column = parseInt(ai.columns[ai.getRandInclusive(0, ai.columns.length - 1)]);
    let isVertical;
    let verticalBinary = ai.getRandInclusive(0, 1);
    verticalBinary === 0 ? isVertical = false : isVertical = true;
    const shipCoords = [];

    isVertical ? console.log("Vertical ship") : console.log("Horizontal ship");

    if (isVertical && rowIndex + shipLength > 9) { // vertical
      rowIndex = rowIndex - shipLength;
      row = ai.rows[rowIndex];
    } else if (!isVertical && (column + shipLength > 10)) { // horizontal
      column = 10 - shipLength;
    }
    
    for (let i = 0; i < shipLength; i++) {
      if (isVertical) {
        shipCoords.push(`${ai.rows[rowIndex + i]}${column}`);
      } else {
        shipCoords.push(`${row}${column + i}`);
      }
    }

    // const ships = [
    //   {
    //     name: "Patrol Boat",
    //     coords: ai.XXX()
    //   }
    // ]
  }
}

export default ai;