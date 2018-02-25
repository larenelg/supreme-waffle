const EventEmitter = require('events');

module.exports = class ElevatorEvents extends EventEmitter {
  constructor() {
    super();
  }
}