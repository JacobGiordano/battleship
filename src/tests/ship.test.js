import Ship from "../factories/ship";

test("something", () => {
  expect(Ship(3).getLength()).toBe(3);
});