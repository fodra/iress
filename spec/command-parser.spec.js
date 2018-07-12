import CommandParser from './../src/command-parser';

describe('CommandParser', () => {
  let cmdFile;
  describe("constructor", () => {

    it("should initialise to the member variables", () => {
      cmdFile = new CommandParser("somefile.txt");
      expect(cmdFile.fullPath).toBe("somefile.txt");
      expect(cmdFile.commands.length).toBe(0);
    });

  });

  describe("exists", () => {

    it("should reject with a file does not exist message", () => {
      cmdFile = new CommandParser("somefile.txt");
      let pExist = cmdFile.exists();
      expect(pExist).toEqual(jasmine.any(Promise));
      pExist.catch((reason) => {
        expect(reason).toBe("File does not exist somefile.txt");
      });
    });

    it("when the file exists, should resolve to true", () => {
      cmdFile = new CommandParser("./spec/data/test.1.txt");
      let pExist = cmdFile.exists();
      expect(pExist).toEqual(jasmine.any(Promise));
      pExist.then(result => {
        expect(result).toBe(true);
      });
    });

  });

  describe("read", () => {

    it("should read the contents of the file into the command array", () => {
      cmdFile = new CommandParser("./spec/data/test.1.txt");
      let pRead = cmdFile.read();
      expect(pRead).toEqual(jasmine.any(Promise));
      pRead.then(result => {
        expect(result).toEqual(jasmine.any(Array));
        expect(result.length).toBe(3);
      });
    });
  });
});