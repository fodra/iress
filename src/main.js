import Application from './application';

const path = require("path");
const commandLineArgs = require("command-line-args");
const getUsage = require("command-line-usage");
const Package = require("./../package.json");

const optionDefinitions = [
  { name: "version", alias: "v", type: Boolean },
  { name: "commands", alias: "c", multiple: false, defaultOption: true }
];

const sections = [
  {
    header: "Toy Robot",
    content: "Your wish is my command."
  },
  {
    header: "Options",
    optionList: [
      {
        name: "commands",
        typeLabel: "[underline]{command_file}",
        description: "List of robot commands."
      },
      {
        name: "version",
        typeLabel: "or -v",
        description: "Shows the toy robot version."
      }
    ]
  }
];

const options = commandLineArgs(optionDefinitions);
const usage = getUsage(sections);

if (options.version) {
  console.log(`v${Package.version}`);
  return -1;
}

if (!options.commands) {
  console.log(usage);
  return -1;
}

Application.run(path.resolve(options.commands));

