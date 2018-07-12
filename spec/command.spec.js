import Command from './../src/command';

describe('Command', () => {
  let cmd;

  describe('constructor', () => {
    it("should not change the internals when given an empty string", () => {
      cmd = new Command("");
      expect(cmd.name).toBe("");
      expect(cmd.args).toBe("");
    });

    it("should return the command without arguments", () => {
      cmd = new Command("MOVE");
      expect(cmd.name).toBe("MOVE");
      expect(cmd.args).toBe("");
    });

    it("should return the command arguments", () => {
      cmd = new Command("PLACE 1,2,NORTH");
      expect(cmd.name).toBe("PLACE");
      expect(cmd.args).toBe("1,2,NORTH");
    });
  });
});