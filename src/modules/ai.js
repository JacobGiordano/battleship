

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
    let verticalBinary = ai.getRandInclusive(0, 1);
    let isVertical;
    verticalBinary === 0 ? isVertical = false : isVertical = true;

    isVertical ? console.log(`isVertical: ${isVertical} | Ship length = ${shipLength} | ${row}${column} — ${ai.rows[parseInt(ai.rows.indexOf(row)) + shipLength]}${column}`) : console.log(`isVertical: ${isVertical} | Ship length = ${shipLength} | ${row}${column} — ${row}${column + shipLength}`);

    if (isVertical && rowIndex + shipLength > 9) { // vertical
      console.log(`Yikes! Trying to find index of ${rowIndex + shipLength} which would be -1!`);
      row = ai.rows[rowIndex - shipLength];
      console.log(`isVertical: ${isVertical} | UPDATED TO ${row}${column} — ${ai.rows[parseInt(ai.rows.indexOf(row)) + shipLength]}${column}`)
    } else if (!isVertical && (column + shipLength > 10)) { // horizontal
      console.log(`Would have gone up to ${column + shipLength}!`);
      column = 10 - shipLength;
      console.log(`isVertical: ${isVertical} | UPDATED TO ${row}${column} — ${row}${column + shipLength}`)
    }
    
    for (let i = 0; i < shipLength; i++) {

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