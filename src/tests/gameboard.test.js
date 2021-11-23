/**
 * @jest-environment jsdom
 */

import Gameboard from "../factories/gameboard";
import Player from "../factories/player";

test("calling placeShip() on a gameboard creates a new ship with specific coordinates assigned to it", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  expect(gameboard.placeShip("Submarine", ["A4", "B4", "C4"]).getCoords()).toEqual(["A4", "B4", "C4"]);
});

test("calling getShips() returns all ships on a gameboard", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  gameboard.placeShip("Submarine", ["A4", "B4", "C4"]);
  gameboard.placeShip("Patrol Boat", ["F1", "F2"]);
  const ships = gameboard.getShips().map(ship => ship.getCoords());
  expect(ships).toEqual([["A4", "B4", "C4"], ["F1", "F2"]]);
});

test("calling receiveAttack() determines if a ship was hit or not. if it's a HIT, it records this on the ship that was hit.", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  const newShip = gameboard.placeShip("Patrol Boat", ["F1", "F2"]);
  gameboard.receiveAttack("F1");
  expect(newShip.getHits()).toEqual(["F1"]);
});

test("calling receiveAttack() determines if a ship was hit or not. if it's a MISS, it records this in the gameboard as a miss.", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  gameboard.receiveAttack("A1");
  gameboard.receiveAttack("A2");
  expect(gameboard.getMisses()).toEqual(["A1", "A2"]);
});

test("calling allShipsSunk() reports back if all ships have been sunk. if all are sunk, this returns true.", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  const newShip1 = gameboard.placeShip("Patrol Boat", ["D11", "D12"]);
  const newShip2 = gameboard.placeShip("Destroyer", ["F1", "F2", "F3"]);
  const newShip3 = gameboard.placeShip("Submarine", ["A1", "B1", "C1"]);
  gameboard.receiveAttack("D11");
  gameboard.receiveAttack("D12");
  gameboard.receiveAttack("F1");
  gameboard.receiveAttack("F2");
  gameboard.receiveAttack("F3");
  gameboard.receiveAttack("A1");
  gameboard.receiveAttack("B1");
  gameboard.receiveAttack("C1");
  expect(gameboard.allShipsSunk()).toEqual(true);
});

test("calling allShipsSunk() reports back if all ships have been sunk. if all are NOT sunk, this returns false.", () => {
  const player = Player("Test Player", false);
  const gameboard = Gameboard(player);
  const newShip1 = gameboard.placeShip("Patrol Boat", ["D1", "D12"]);
  const newShip2 = gameboard.placeShip("Destroyer", ["F1", "F2", "F3"]);
  const newShip3 = gameboard.placeShip("Submarine", ["A1", "B1", "C1"]);
  gameboard.receiveAttack("D11");
  gameboard.receiveAttack("D12");
  gameboard.receiveAttack("F1");
  gameboard.receiveAttack("F2");
  // gameboard.receiveAttack("F3");
  gameboard.receiveAttack("A1");
  gameboard.receiveAttack("B1");
  gameboard.receiveAttack("C1");
  expect(gameboard.allShipsSunk()).toEqual(false);
});