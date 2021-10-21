const Ship = (length) => {
  let hits = [];
  const getLength = () => length;
  const getHits = () => hits;
  const isSunk = () => hits.length === length;
  const hit = num => {
    hits.push(num);
    return hits;
  };

  return {getLength, getHits, isSunk, hit};
}

export default Ship;