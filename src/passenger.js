const ElevatorCommander = require('./elevatorCommander');
const SummonElevatorCommand = require('./elevatorCommands/SummonElevatorCommand');

module.exports = class Passenger {
  constructor (elevator, startingFloor) {
    this.currentFloor = startingFloor;
    this.hasReachedDestination = false; // false until they reach their destination
    this.elevator = elevator;

    this.elevatorCommander = new ElevatorCommander();
  }

  presses (directionButton) {
    this.elevatorCommander.storeAndExecute(
      new SummonElevatorCommand(this.elevator, this.currentFloor)
    )
  }
  waitForDoorsToOpenAt (floor) { throw new Error('Not Implemented Yet'); }
  enterElevator () { throw new Error('Not Implemented Yet'); }
  exitElevator () { throw new Error('Not Implemented Yet'); }
}

