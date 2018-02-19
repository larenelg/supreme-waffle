module.exports = class Passenger {
  constructor (startingFloor, elevator) {
    this.currentFloor = startingFloor;
    this.hasReachedDestination = true; // true until passenger summons elevator
    this.elevator = elevator;
  }

  presses (directionButton) { return this; }
  waitForDoorsToOpenAt (floor) { return this; }
  enterElevator () { return this; }
  presses (destinationButton) { return this; }
  exitElevator () { return this; }
}

