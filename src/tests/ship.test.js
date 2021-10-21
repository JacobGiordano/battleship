import Ship from "../factories/ship";

test("calling getLength() on a ship returns its starting length", () => {
  expect(Ship(3).getLength()).toBe(3);
});

test("calling hit([number]) on a ship adds the hit number to the hits array", () => {
  expect(Ship(3).hit(1)).toEqual([1]);
});

test("calling getHits() on a ship returns its hits array", () => {
  const testShip = Ship(5);
  testShip.hit(1);
  testShip.hit(2);
  testShip.hit(3);
  expect(testShip.getHits()).toEqual([1, 2, 3]);
});

test("calling isSunk() returns a boolean based on whether or not the length of the hits array is equal to the length of the ship", () => {
  const testShip = Ship(3);
  testShip.hit(1);
  testShip.hit(2);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(true);
});