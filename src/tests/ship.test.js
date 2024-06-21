import Ship from "../ship.js";
let ship;
beforeEach(() => {
  ship = new Ship(3);
});
describe("Ship", () => {
  test("initial state", () => {
    expect(ship.hits).toBe(0);
    expect(ship.isSunkStatus).toBe(false);
  });

  test("hit method increments hits correctly", () => {
    ship.hit();

    expect(ship.hits).toBe(1);
    expect(ship.isSunkStatus).toBe(false);

    ship.hit();
    expect(ship.hits).toBe(2);
    expect(ship.isSunkStatus).toBe(false);
  });

  test("ship sinks after enough hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(3);
    expect(ship.isSunkStatus).toBe(true);
  });

  test("isSunk method works correctly", () => {
    expect(ship.isSunkStatus).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunkStatus).toBe(false);
    ship.hit();
    expect(ship.isSunkStatus).toBe(true);
  });
});
