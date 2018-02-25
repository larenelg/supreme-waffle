const ElevatorCommander = require('./elevatorCommander');
const ElevatorEvents = require('./elevatorEvents');
const SummonElevatorCommand = require('./commands/SummonElevatorCommand');
const { TIME_STEP } = require('./physics');

module.exports = class Passenger {
  constructor (elevator, startingFloor, elevatorEvents) {
    this.elevatorCommander = new ElevatorCommander();
    this._elevatorEvents = elevatorEvents;

    this._elevator = elevator;

    this.currentFloor = startingFloor;
    this.hasReachedDestination = false; // false until they reach their destination
    this.isInsideElevator = false;
  }

  presses (button) {
    if (button === 'Up' || button === 'Down') {
      // assume person is outside the elevator and waiting
      this.elevatorCommander.storeAndExecute(
        new SummonElevatorCommand(this._elevator, this.currentFloor)
      )
    } else if (this._elevator.availableFloors.includes(button)) {
      var destination = button;
      this.elevatorCommander.storeAndExecute(
        new SummonElevatorCommand(this._elevator, destination)
      )
    } else {
      throw new Error('Not a valid Elevator command.');
    }
    
    return this;
  }

  waitForElevatorAndEnter () {
    // wait for doors to open
    this._elevatorEvents
      .once('floorReached', () => { 
        this.isInsideElevator = true;
        console.log('entering elevator!');
      })

    return this;
  }

  waitsForElevatorToReachFloorAndExits () { 
    this._elevatorEvents
      .once('floorReached', () => { 
        this.isInsideElevator = false;
        console.log('exiting elevator!');
      }) 
  } 
}