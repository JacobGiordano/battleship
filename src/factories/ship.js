const Ship = (coords) => {
  let hits = [];
  
  const getLength = () => coords.length;
  
  const getHits = () => hits;
  
  const getCoords = () => coords;
  
  const isSunk = () => hits.length === coords.length;
  
  const hit = num => {
    hits.push(num);
    return hits;
  };

  return {coords, getLength, getCoords, getHits, isSunk, hit};
}

export default Ship;