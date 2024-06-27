class Ship {
  hits = 0;
  isSunkStatus = false;

  constructor(length) {
    this.length = length;
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits === this.length) {
      this.isSunkStatus = true;
    }
  }
}

export default Ship;
