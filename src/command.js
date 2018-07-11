export default class Command {

  constructor(commandString) {
    this.name = "";
    this.args = "";
    this.VALID_COMMANDS = ["PLACE", "MOVE", "REPORT", "LEFT", "RIGHT"];
    this.parseCommand(commandString);
  }

  isValid() {
    return (this.VALID_COMMANDS.indexOf(this.name) !== -1);
  }

  parseCommand(commandString) {
    let spaceIndex = commandString.indexOf(" ");
    if (spaceIndex === -1) {
      this.name = commandString;
    } else {
      this.name = commandString.substr(0, spaceIndex);
      this.args = commandString.substr(spaceIndex+1, commandString.length - this.name.length);
    }
  }
}