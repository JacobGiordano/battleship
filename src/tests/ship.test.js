import Ship from "../factories/ship";

test("calling getName() on a ship returns its name", () => {
  expect(Ship("Submarine", ["A4", "B4", "C4"]).getName()).toBe("Submarine");
});

test("calling getLength() on a ship returns its starting length", () => {
  expect(Ship("Submarine", ["A4", "B4", "C4"]).getLength()).toBe(3);
});

test("calling getCoords() on a ship returns its gameboard coordinates", () => {
  expect(Ship("Submarine", ["A4", "B4", "C4"]).getCoords()).toEqual(["A4", "B4", "C4"]);
});

test("calling hit([number]) on a ship adds the hit number to the hits array", () => {
  expect(Ship("Patrol Boat", ["A1", "A2"]).hit(1)).toEqual([1]);
});

test("calling getHits() on a ship returns its hits array", () => {
  const testShip = Ship("Submarine", ["A4", "B4", "C4"]);
  testShip.hit("A1");
  testShip.hit("A2");
  testShip.hit("A3");
  expect(testShip.getHits()).toEqual(["A1", "A2", "A3"]);
});

test("calling isSunk() returns a boolean based on whether or not the length of the hits array is equal to the length of the ship", () => {
  const testShip = Ship("Submarine", ["A4", "B4", "C4"]);
  testShip.hit(1);
  testShip.hit(2);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(true);
});