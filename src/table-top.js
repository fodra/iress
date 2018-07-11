export default class TableTop {

  constructor(rows, columns) {
    this.rows = (!rows || rows <= 0) ? 5 : rows;
    this.columns = (!columns || rows <=0 ) ? 5: columns;
  }

  convertX(xpos) {
    return this.columns - (xpos + 1);
  }

  isPointInside(x, y) {
    let newX = this.convertX(x);
    return (newX >= 0 && newX < this.columns) && (y >= 0 && y < this.rows );
  }

}