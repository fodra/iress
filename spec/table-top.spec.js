import TableTop from './../src/table-top';

describe('TableTop', ()=> {
  let table;

  describe("constructor", () => {

    it("should return 5s for row and column if not provided", () => {
      table = new TableTop();
      expect(table.rows).toBe(5);
      expect(table.columns).toBe(5);
    });

    it("should return 5s for row and column is negative or zero", () => {
      table = new TableTop(-1, 0);
      expect(table.rows).toBe(5);
      expect(table.columns).toBe(5);
    });

    it("should return r x w for row and column if provided positive values", () => {
      table = new TableTop(8, 8);
      expect(table.rows).toBe(8);
      expect(table.columns).toBe(8);
    });

  });

  describe("convertX", () => {

    beforeEach(() => {
      table = new TableTop(5, 5);
    });

    it("should convertX relative to quadrant 1", () => {
      expect(table.convertX(4)).toBe(0);
      expect(table.convertX(0)).toBe(4);
      expect(table.convertX(1)).toBe(3);
    });
  });

  describe("isPointInside", () => {

    beforeEach(() => {
      table = new TableTop(5, 5);
    });

    it("test different points with the table", () => {
      expect(table.isPointInside(0, 0)).toBe(true);
      expect(table.isPointInside(5, 5)).toBe(false);
      expect(table.isPointInside(3, 3)).toBe(true);
      expect(table.isPointInside(4, 0)).toBe(true);
      expect(table.isPointInside(-1, 0)).toBe(false);
    });
  });
});