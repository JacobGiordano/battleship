import ai from "../modules/ai";

test("Calling ai.createRandShipCoords() it returns a set of coords based on the passed length", () => {
  ai.createRandShipCoords(2);
  ai.createRandShipCoords(3);
  ai.createRandShipCoords(3);
  ai.createRandShipCoords(4);
  ai.createRandShipCoords(5);
});