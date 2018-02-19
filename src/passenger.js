module.exports = class Passenger {
  constructor (elevator, startingFloor) {
    this.currentFloor = startingFloor;
    this.hasReachedDestination = false; // false until they reach their destination
    this.elevator = elevator;
  }

  presses (directionButton) { return this; }
  waitForDoorsToOpenAt (floor) { return this; }
  enterElevator () { return this; }
  presses (destinationButton) { return this; }
  exitElevator () { return this; }
}

