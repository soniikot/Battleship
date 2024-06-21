import Player from "../player.js";

describe("Player Class", () => {
  const computerPlayer = new Player(null, true);
  const humanPlayer = new Player("Sofia");
  test("players can place ships", () => {
    expect(computerPlayer.placeShipRandomly()).toBe("ship placed");
    expect(humanPlayer.gameBoard.placeShip(0, 0, 1, "horizontal")).toBe(
      "ship placed"
    );
  });
});
