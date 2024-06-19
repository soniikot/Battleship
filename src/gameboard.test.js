const Gameboard = require("./Gameboard");

beforeEach(() => {
  board = new Gameboard();
});
describe("Gameboard class", () => {
  test(" place ships  correctly", () => {
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
    expect(board.placeShip(3, 2, 3, "vertical")).toBe("ship placed");
    expect(board.receiveAttack(0, 0)).toBe("hit");
    expect(board.receiveAttack(8, 7)).toBe("missed");
    expect(board.displayGrid()).toEqual([
      ["H", "S", "X", " ", " ", " ", " ", " ", " ", " "],
      ["X", "X", "X", " ", " ", " ", " ", " ", " ", " "],
      [" ", "X", "X", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "S", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "X", "X", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", "M", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ]);
  });

  test("report whether or not all of their ships have been sunk.", () => {
    expect(board.placeShip(0, 0, 2, "horizontal")).toBe("ship placed");
    expect(board.placeShip(3, 2, 3, "vertical")).toBe("ship placed");
    expect(board.placeShip(5, 9, 5, "vertical")).toBe("ship placed");
    expect(board.placeShip(6, 4, 4, "horizontal")).toBe("ship placed");
    expect(board.placeShip(9, 0, 3, "horizontal")).toBe("ship placed");
    expect(board.receiveAttack(0, 0)).toBe("hit");
    expect(board.receiveAttack(8, 7)).toBe("missed");
    expect(board.receiveAttack(0, 1)).toBe("hit");
    expect(board.receiveAttack(3, 2)).toBe("hit");
    expect(board.receiveAttack(4, 2)).toBe("hit");
    expect(board.receiveAttack(5, 2)).toBe("hit");
    expect(board.receiveAttack(5, 9)).toBe("hit");
    expect(board.receiveAttack(6, 9)).toBe("hit");
    expect(board.receiveAttack(7, 9)).toBe("hit");
    expect(board.receiveAttack(8, 9)).toBe("hit");
    expect(board.receiveAttack(9, 9)).toBe("hit");
    expect(board.receiveAttack(6, 4)).toBe("hit");
    expect(board.receiveAttack(6, 5)).toBe("hit");
    expect(board.receiveAttack(6, 6)).toBe("hit");
    expect(board.receiveAttack(6, 7)).toBe("hit");
    expect(board.receiveAttack(9, 0)).toBe("hit");
    expect(board.receiveAttack(9, 1)).toBe("hit");
    expect(board.receiveAttack(9, 2)).toBe("hit");

    expect(expect(board.checkWinners()).toBe("game over"));
    expect(board.displayGrid()).toEqual([
      ["H", "H", "X", " ", " ", " ", " ", " ", " ", " "],
      ["X", "X", "X", " ", " ", " ", " ", " ", " ", " "],
      [" ", "X", "X", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "H", "X", " ", " ", " ", " ", " ", " "],
      [" ", "X", "H", "X", " ", " ", " ", " ", "X", "X"],
      [" ", "X", "H", "X", "X", "X", "X", "X", "X", "H"],
      [" ", "X", "X", "X", "H", "H", "H", "H", "X", "H"],
      [" ", " ", " ", "X", "X", "X", "X", "X", "X", "H"],
      ["X", "X", "X", "X", " ", " ", " ", "M", "X", "H"],
      ["H", "H", "H", "X", " ", " ", " ", " ", "X", "H"],
    ]);
  });
});
