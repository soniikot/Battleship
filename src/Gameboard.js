class GameBoard {
  constructor() {
    this.size = 10;
    this.grid = this.createGrid(size);
  }
  createGrid(size) {
    const grid = [];
    for (let row = 0; row < size; row++) {
      const rowArray = [];
      for (let col = 0; col < size; col++) {
        rowArray.push(null); 
      grid.push(rowArray);
    }
    return grid;
  }
}
