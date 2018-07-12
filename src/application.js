import CommandParser from './command-parser';
import Command from './command';
import Robot from './robot';
import TableTop from './table-top';

export default class Application {

  static run(commandFile) {
    let parser = new CommandParser(commandFile);
    let robot = new Robot();
    let table = new TableTop();

    return parser.exists()
      .then(() => parser.read())
      .then(commands => {
        commands.forEach(command => {
          let operation = command.name.toLowerCase();
          let args = (!command.args) ? [] : command.args.split(",");
          args = args.map(arg => arg.trim());
          args.push(table);

          if(!robot[operation].call(robot, args)) {
            console.log(`Robot does not understand ${operation.toUpperCase()} command.`);
          }
        });
      })
      .catch(err => console.log(`An error occurred ${err.message}`));
  }
}