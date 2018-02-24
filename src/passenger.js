const ElevatorCommander = require('./elevatorCommander');
const SummonElevatorCommand = require('./commands/SummonElevatorCommand');

const {TIME_STEP, Time} = require('./physics');
module.exports = class Passenger {
  constructor (elevator, startingFloor) {
    this.elevatorCommander = new ElevatorCommander();
    this.elevator = elevator;

    this.currentFloor = startingFloor;
    this.hasReachedDestination = false; // false until they reach their destination
    this.isInsideElevator = false;
  }

  presses (directionButton) {
    this.elevatorCommander.storeAndExecute(
      new SummonElevatorCommand(this.elevator, this.currentFloor)
    )
    return this;
  }

  waitForDoorsToOpenAt (floor) {
    var doorsOpen = poll(() => {
        return this.elevator.doorsOpen === true;
      }, TIME_STEP * 10, TIME_STEP);
    return this;
  }

  enterElevator () {
    this.isInsideElevator = true;
    return this;
  }

  exitElevator () { throw new Error('Not Implemented Yet'); }
}

const poll = (fn, timeout, interval) => {
  var endTimeStep = Time.currentTimeStep() + timeout;

  let checkCondition = (resolve, reject) => {
    var result = fn();

    if (result) {
      resolve(result)
    } else if (Time.currentTimeStep() < endTimeStep) {
      
    }
  }
};