import Robot from './../src/robot';
import TableTop from './../src/table-top';

describe('Robot', () => {
  let robot;

  beforeEach(() => {
    robot = new Robot();
  });

  describe("constructor", () => {

    it("initialise member variables", () => {
      expect(robot.x).toBe(-1);
      expect(robot.y).toBe(-1);
      expect(robot.DIRECTIONS.length).toBe(4);
      expect(robot.OFFSET["NORTH"]).toEqual({x: 0, y: 1});
      expect(robot.OFFSET["EAST"]).toEqual({x: 1, y: 0});
      expect(robot.OFFSET["SOUTH"]).toEqual({x: 0, y: -1});
      expect(robot.OFFSET["WEST"]).toEqual({x: -1, y: 0});
      expect(robot.facing).toBe(-1);
    });
  });

  describe("getDirection", () => {

    it("should return NOWHERE initially", () => {
      expect(robot.getDirection()).toBe("NOWHERE");
    });

    it("should return NORTH, EAST, SOUTH, then WEST", () => {
      robot.facing = 0;
      expect(robot.getDirection()).toBe("NORTH");
      robot.facing = 1;
      expect(robot.getDirection()).toBe("EAST");
      robot.facing = 2;
      expect(robot.getDirection()).toBe("SOUTH");
      robot.facing = 3;
      expect(robot.getDirection()).toBe("WEST");
    });

  });

  describe("getOffset", () => {

    it("should return {0, 0} initially", () => {
      expect(robot.getOffset()).toEqual({x: 0, y: 0});
    });

    it("should return offsets for NORTH, EAST, SOUTH, then WEST", () => {
      robot.facing = 0;
      expect(robot.getOffset()).toEqual({x: 0, y: 1});
      robot.facing = 1;
      expect(robot.getOffset()).toEqual({x: 1, y: 0});
      robot.facing = 2;
      expect(robot.getOffset()).toEqual({x: 0, y: -1});
      robot.facing = 3;
      expect(robot.getOffset()).toEqual({x: -1, y: 0});
    });

  });

  describe("isOnTable", () => {

    it("should return true when x, y, and facing are valid", () => {
      robot.facing = 0;
      robot.x = 0;
      robot.y = 0;
      expect(robot.isOnTable()).toBe(true);
    });

    it("should return false initially", () => {
      expect(robot.isOnTable()).toBe(false);
    });
  });

  describe("report", () => {

    it("should return false if not on the table", () => {
      expect(robot.report()).toBe(false);
    });

    it("should return true, if on the table", () => {
      robot.x = 0;
      robot.y = 0;
      robot.facing = 0;
      expect(robot.report()).toBe(true);
    });
  });

  describe("right", () => {

    it("should return false if not on the table", () => {
      expect(robot.right()).toBe(false);
    });

    it("should return true, if on the table", () => {
      robot.x = 0;
      robot.y = 0;
      robot.facing = 0;
      expect(robot.right()).toBe(true);
      expect(robot.facing).toBe(1);
      expect(robot.right()).toBe(true);
      expect(robot.facing).toBe(2);
      expect(robot.right()).toBe(true);
      expect(robot.facing).toBe(3);
      expect(robot.right()).toBe(true);
      expect(robot.facing).toBe(0);
    });
  });

  describe("left", () => {

    it("should return false if not on the table", () => {
      expect(robot.left()).toBe(false);
    });

    it("should return true, if on the table", () => {
      robot.x = 0;
      robot.y = 0;
      robot.facing = 0;
      expect(robot.left()).toBe(true);
      expect(robot.facing).toBe(3);
      expect(robot.left()).toBe(true);
      expect(robot.facing).toBe(2);
      expect(robot.left()).toBe(true);
      expect(robot.facing).toBe(1);
      expect(robot.left()).toBe(true);
      expect(robot.facing).toBe(0);
    });
  });

  describe("place", () => {

    let table;

    beforeEach(() => {
      table = new TableTop();
    });

    it("should return false if point is not on the table", () => {
      let args = [-1, -1, "NORTH", table];
      expect(robot.place(args)).toBe(false);
    });

    it("should return true if point is not on the table", () => {
      let args = [1, 1, "NORTH", table];
      expect(robot.place(args)).toBe(true);
      expect(robot.x).toBe(1);
      expect(robot.y).toBe(1);
      expect(robot.facing).toBe(0);
    });
  });

  describe("move", () => {

    let table;

    beforeEach(() => {
      table = new TableTop();
    });

    it("should return false if not on the table", () => {
      let args = [table];
      expect(robot.move(args)).toBe(false);
    });

    it("should return false if new point is not in the table", () => {
      let args = [table];
      robot.x = 0;
      robot.y = 0;
      robot.facing = 2;
      expect(robot.move(args)).toBe(false);
    });

    it("should return true if new point is in the table", () => {
      let args = [table];
      robot.x = 4;
      robot.y = 4;
      robot.facing = 2;
      expect(robot.move(args)).toBe(true);
      expect(robot.x).toBe(4);
      expect(robot.y).toBe(3);
      expect(robot.facing).toBe(2);
    });
  });
});