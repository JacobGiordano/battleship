import Ship from "../factories/ship";

const Gameboard = () => {
  let misses = [];
  let ships = [];

  const placeShip = (coords) => {
    const newShip = Ship(coords);
    ships.push(newShip);
    return newShip;
  };

  const getShips = () => {
    return ships;
  }

  const getMisses = () => {
    return misses;
  }

  const receiveAttack = coords => {
    // Takes a pair of coordinates
    const wasHit = getShips().filter(ship => ship.coords.indexOf(coords) > -1)[0];
    // Determines if the attack was a hit or a miss
      // If a hit, record it as a hit for the correct ship
      if (wasHit !== null & wasHit !== undefined) {
        wasHit.hit(coords); // 1.
        return {shot: "hit", coords: coords};
        // 2. Trigger showing a *hit* on the gameboard
      } else {
        // If a miss, record it in the misses array of the Gameboard
        misses.push(coords); // 1.
        // 2. Trigger showing a *miss* on the gameboard
        return {shot: "miss", coords: coords};
      }
  };

  const allShipsSunk = () => {
    // The gameboard should be able to report if all ships have been sunk or not
    return ships.length === ships.filter(ship => ship.isSunk()).length;
  };

  return {placeShip, getShips, getMisses, receiveAttack, allShipsSunk};
};

export default Gameboard;