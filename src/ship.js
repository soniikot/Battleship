class Ship {
  constructor(length) {
    (this.length = length), (this.hits = 0), (this.isSunkStatus = false);
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

module.exports = Ship;
