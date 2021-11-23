const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const ai = {
  getRandInclusive: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },

  getRandCoords: () => {
    const letter = rows[ai.getRandInclusive(0, rows.length -1)];
    const number = columns[ai.getRandInclusive(0, columns.length -1)];
    return `${letter}${number}`;
  },

  getIndex: coords => {
    const letter = coords.slice(0, 1);
    const numbers = coords.slice(1, coords.length);
    return (rows.indexOf(letter) * 10) + columns.indexOf(numbers);
  }
}

export default ai;