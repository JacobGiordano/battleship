import Player from "../factories/player";

test("calling getRandCoord() returns a random coordinate", () => {
  expect(Player("computer", true).getRandCoord()).toMatch(new RegExp(/\w\d/i));
});

test("when computerTurn() is called, if the selected coord has already been fired upon, computerTurn() calls itself", () => {
  expect(Player("computer", true).computerTurn("A1")).not.toBe("A1");
});