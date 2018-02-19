module.exports = class Passenger {
  constructor (startingFloor, elevator) {
    this.currentFloor = startingFloor;
    this.hasReachedDestination = true; // true until passenger summons elevator
    this.elevator = elevator;
  }
}
