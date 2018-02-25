"use strict";

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');
const ElevatorEvents = require('./elevatorEvents');

module.exports = class Elevator {
  constructor(elevatorEvents) {
    // constants
    this._elevatorEvents = elevatorEvents;
    this.availableFloors = FLOORS;

    // initial values
    this.currentFloor = FLOORS[0];
    this.currentHeight = 0.0;
    this._resetElevator();
  }

  goToFloor(floor) {
    this.isWaiting = false;
    this.destinationFloor = floor;
    this.destinationHeight = FLOORS.indexOf(floor) * DISTANCE_BETWEEN_FLOORS;
    this.velocity = Math.sign(this.destinationHeight - this.currentHeight) * VELOCITY;

    if (this.velocity > 0) {
      this.direction = 'up';
      console.info('going up');
    } else if (this.velocity < 0) {
      this.direction = 'down';
      console.info('going down');
    } else { 
      // already at destination
      this.direction = null;
    }
  }

  update() {
    if (this.destinationFloor === null) return;

    if (this.distanceToNextFloor !== 0) {
      this.distanceToNextFloor -= VELOCITY * TIME_STEP;
      this.currentHeight += TIME_STEP * this.velocity;
    }

    if (this.distanceToNextFloor === 0) {
      this.currentFloor = FLOORS[this.currentHeight / DISTANCE_BETWEEN_FLOORS]
      console.log(`${this.currentFloor}`);
      this.distanceToNextFloor = DISTANCE_BETWEEN_FLOORS;
    }

    if (this.currentFloor === this.destinationFloor) {
      this._resetElevator();
      console.info(`at floor ${this.currentFloor}`)
      this._elevatorEvents.emit('floorReached');
    }
  }

  _resetElevator() {
    // initial values
    this.isWaiting = true;
    this.direction = null;
    this.distanceToNextFloor = DISTANCE_BETWEEN_FLOORS;
    this.destinationFloor = null;
    this.destinationHeight = null;
    this.velocity = 0.0;
  }
}
