import Command from './command';

const fs = require('fs');

export default class CommandParser {

  constructor(fullPath) {
    this.fullPath = fullPath;
    this.commands = [];
  }

  exists() {
    return new Promise((resolve, reject) => {
      fs.access(this.fullPath, fs.constants.R_OK, err => {
        if (err) {
          console.log(`File does not exist ${this.fullPath}`);
          reject(`File does not exist ${this.fullPath}`);
        }
        resolve(true);
      });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      let options = {
        input: fs.createReadStream(this.fullPath),
        crlfDelay: Infinity
      };

      let fileReader = readline.createInterface(options);
      fileReader.on('line', line => {
        let commandLine = line.trim().toUpperCase();
        let command = new Command(commandLine);
        if (command.isValid()) {
          this.commands.push(command);
        }
      });

      fileReader.on('close', () => {
        resolve(this.commands);
      });
    });
  }
}