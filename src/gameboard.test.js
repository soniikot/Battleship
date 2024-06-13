const Gameboard = require("./gameboard");

beforeEach(() => {
  board = new Gameboard();
});
describe("Gameboard class", () => {
  test(" place ships grid correctly", () => {
    expect(board.placeShip(0, 0, 2, "horizontal")).toBe("ship placed");
    expect(board.placeShip(3, 2, 3, "vertical")).toBe("ship placed");
    expect(board.placeShip(2, 3, 2, "horizontal")).toBe("error");
    expect(board.displayGrid()).toEqual([
      ["S", "S", "X", " ", " ", " ", " ", " ", " ", " "],
      ["X", "X", "X", " ", " ", " ", " ", " ", " ", " "],
      [" ", "X", "X", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "X", "X", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });

  test("reveiveAttack hit the target", () => {
    expect(board.placeShip(0, 0, 2, "horizontal")).toBe("ship placed");
    expect(board.receiveAttack(0, 0)).toBe("hit");
    expect(board.receiveAttack(8, 7)).toBe("missed");
  });
});
