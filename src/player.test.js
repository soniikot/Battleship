const Player = require("./player");

beforeEach(() => {
  computerPlayer = new Player(null, true);
  humanPlayer = new Player("Sofia");
});

describe("Player Class", () => {
  test("players can place ships", () => {
    expect(computerPlayer.placeShipRandomly()).toBe("ship placed");
    expect(humanPlayer.gameBoard.placeShip(0, 0, 1, "horizontal")).toBe(
      "ship placed"
    );
  });
});
