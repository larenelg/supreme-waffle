module.exports = class ElevatorCommander {
  constructor() {
    this._commands = [];
  }

  storeAndExecute(command) {
    this._commands.push(command);
    command.execute();
  }
};