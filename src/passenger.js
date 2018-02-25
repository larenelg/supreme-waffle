const ElevatorCommander = require('./elevatorCommander');
const SummonElevatorCommand = require('./commands/SummonElevatorCommand');
const {TIME_STEP} = require('./physics');

/* PASSENGER HELPERS -- extract later */

const poll = (fn, timeout, interval, time) => {
  var endTimeStep = time.currentTimeStep + timeout;
  console.log('finish polling at', endTimeStep);

  var checkCondition = (resolve, reject) => {
    var result = fn();

    if (result) {
      console.log('resolve');
      resolve(result)
    } 
    else if (time.currentTimeStep < endTimeStep) {
      console.log('go again');      
      time.subscribeOnce(checkCondition);
    }
    else {
      console.log('reject');
      reject(new Error('Timed out.'));
    }
  };

  return new Promise(checkCondition);
};

/* PASSENGER CLASS */

module.exports = class Passenger {
  constructor (elevator, startingFloor, time) {
    this.elevatorCommander = new ElevatorCommander();
    this._elevator = elevator;
    this._time = time;

    this.currentFloor = startingFloor;
    this.hasReachedDestination = false; // false until they reach their destination
    this.isInsideElevator = false;
  }

  presses (directionButton) {
    this.elevatorCommander.storeAndExecute(
      new SummonElevatorCommand(this._elevator, this.currentFloor)
    )
    return this;
  }

  waitAndEnterElevator () {
    // wait for doors to open
    poll(
      () => {
        return this._elevator.doorsOpen === this.currentFloor;
      }, 
      TIME_STEP * 10, 
      TIME_STEP, 
      this._time
    )
    .then(() => this.isInsideElevator = true)
    .catch(() => console.log('tired of waiting, gave up :('));
    return this;
  }

  exitElevator () { throw new Error('Not Implemented Yet'); }
}