export default class Robot {

  constructor() {
    this.SENTINEL = -1;
    this.x = this.SENTINEL;
    this.y = this.SENTINEL;
    this.DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
    this.OFFSET = {
      "NORTH": {x: 0, y: 1},
      "EAST": {x: 1, y: 0},
      "SOUTH": {x: 0, y: -1},
      "WEST": {x: -1, y: 0}
    };
    this.facing = this.SENTINEL;
  }

  getDirection() {
    return (this.facing >= 0 && this.facing < this.DIRECTIONS.length) ? this.DIRECTIONS[this.facing] : "NOWHERE";
  }

  getOffset() {
    let direction = this.getDirection();
    return (direction !== "NOWHERE") ? this.OFFSET[direction] : {x: 0, y: 0};
  }

  isOnTable() {
    return (this.x !== this.SENTINEL && this.y !== this.SENTINEL && this.facing !== this.SENTINEL );
  }

  place(args) {
    let xArg = parseInt(args[0]);
    let yArg = parseInt(args[1]);
    let directionArg = args[2];
    let table = args[3];

    if (this.isPointInside(xArg, yArg)) {
      this.x = xArg;
      this.y = yArg;
      this.facing = this.DIRECTIONS.indexOf(directionArg);
      return this.report();
    }
    return false;
  }

  right(args) {
    if (!this.isOnTable()) {
      return false;
    }
    this.facing = (this.facing + 1) % this.DIRECTIONS.length;
  }

  left(args) {
    if (!this.isOnTable()) {
      return false;
    }
    this.facing = (this.facing === 0) ? this.DIRECTIONS.length - 1 : this.facing - 1;
    return true;
  }

  move(args) {
    if (!this.isOnTable()) {
      return false;
    }

    let table = args[args.length - 1];
    let offset = this.getOffset();
    let x = this.x + offset.x;
    let y = this.y + offset.y;

    if (table.isPointInside(x, y)) {
      this.x = x;
      this.y = y;
      return true;
    }

    return false;
  }

  report(args) {
    if (!this.isOnTable()) {
      return false;
    }
    console.log(`Robot is at (${this.x}, ${this.y}) facing ${this.getDirection()}`);
    return true;
  }

}