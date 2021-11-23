/**
 * @jest-environment jsdom
 */

import Player from "../factories/player";
import Gameboard from "../factories/gameboard";
import ai from "../modules/ai";

test("calling ai.getRandCoords() returns a random coordinate", () => {
  expect(ai.getRandCoords()).toMatch(new RegExp(/\w\d/i));
});

test("when computerTurn() is called, if the selected coord has already been fired upon, computerTurn() will continually call itself until it can fire at a new coord", () => {
  expect(Player("computer", true).computerTurn("A1")).not.toBe("A1");
});

test("when one player attacks the other's gameboard, the shot is recorded in the receiving gameboard", () => {
  const player1 = Player("Player 1", false);
  const player2 = Player("Computer", true);
  const player2Gameboard = Gameboard(player2);
  player2Gameboard.placeShip("Patrol Boat", ["A1", "A2"]);

  expect(player1.attackOpponent("A1", player2Gameboard)).toEqual({ shot: "hit", coords: "A1" });
});