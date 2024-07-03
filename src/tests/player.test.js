import Player from "../models/player.js";

describe("Player Class", () => {
  const computerPlayer = new Player(null, true);
  const humanPlayer = new Player("Sofia");
  test("players can place ships", () => {
    expect(humanPlayer.gameBoard.placeShip(0, 0, 1, "horizontal")).toBe(
      "ship placed"
    );
  });
});
