"use strict";

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');
const ElevatorEvents = require('./elevatorEvents');

module.exports = class Elevator {
  constructor(elevatorEvents) {
    this.isWaiting = true;
    this.currentFloor = FLOORS[0];
    this.currentHeight = 0;
    this.destinationFloor = null;
    this.destinationHeight = null;
    this.direction = null;
    this.doorsOpen = false;
    this.distanceToNextFloor = DISTANCE_BETWEEN_FLOORS;
    this._elevatorEvents = elevatorEvents;
    this.availableFloors = FLOORS;
  }

  goToFloor(floor) {
    this.isWaiting = false;
    this.destinationFloor = floor;
    
    this.destinationHeight = FLOORS.indexOf(floor) * DISTANCE_BETWEEN_FLOORS;
  
    if (this.destinationHeight > this.currentHeight) {
      this.direction = 'up';
      console.info('going up');
    } else if (this.destinationHeight < this.currentHeight) {
      this.direction = 'down';
      console.info('going down');
    } else { // already at destination
      this.direction = null;
    }
  }

  update() {
    if (this.direction === null) return;

    var directionalVelocity = this.direction === 'up' ? VELOCITY : -1 * VELOCITY;

    if (this.distanceToNextFloor !== 0) {
      this.distanceToNextFloor -= VELOCITY * TIME_STEP;
      this.currentHeight += TIME_STEP * directionalVelocity;
    }

    if (this.distanceToNextFloor === 0) {
      this.currentFloor = FLOORS[this.currentHeight / DISTANCE_BETWEEN_FLOORS]
      this.distanceToNextFloor = DISTANCE_BETWEEN_FLOORS;
    }

    if (this.currentFloor === this.destinationFloor) {
      this.destinationFloor = null;
      this.destinationHeight = null;
      this.direction = null;
      console.info(`at floor ${this.currentFloor}`)
      this._elevatorEvents.emit('floorReached');
    }
  }
}
