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
    this.destinationFloor = null;    
    this.hasReachedDestination = false; // false until they reach their destination
    this.isInsideElevator = false;
  }

  presses (button) {
    if ((!this.isInsideElevator) && (button === 'up' || button === 'down')) {
      // assume person is outside the elevator and waiting
      this.elevatorCommander.storeAndExecute(
        new SummonElevatorCommand(this._elevator, this.currentFloor, button)
      )
    } else if (this.isInsideElevator && this._elevator.availableFloors.includes(button)) {
      // has pushed a button inside the elevator
      this.destinationFloor = button;

      this.elevatorCommander.storeAndExecute(
        new SummonElevatorCommand(this._elevator, this.destinationFloor, 'destination')
      )
    } else {
      throw new Error('Not a valid Elevator command.');
    }

    return this;
  }

  waitsForElevatorAndEnters () {
    // wait for doors to open
    this._elevatorEvents
      .once(`floorReached:${this.currentFloor}`, () => { 
        this.isInsideElevator = true;
        console.info(`enterting elevator at ${this.currentFloor}`);
      })

    return this;
  }

  waitsForElevatorToReachFloorAndExits () { 
    this._elevatorEvents
      .once(`floorReached:${this.destinationFloor}`, () => {
        this.isInsideElevator = false;
        this.currentFloor = this._elevator.currentFloor;
        this.hasReachedDestination = true;
        console.info(`exiting elevator at ${this.currentFloor}`);
      });

    return this;
  } 
}