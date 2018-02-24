"use strict";

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');

module.exports = class Elevator {
  constructor() {
    this.isWaiting = true;
    this.currentFloor = FLOORS[0];
    this.currentHeight = 0;
    this.destinationFloor = null;
    this.destinationHeight = null;
    this.direction = null;
    this.currentTime = 0;
    this.doorsOpen = false;
    this.distanceToNextFloor = DISTANCE_BETWEEN_FLOORS;
  }

  goToFloor(floor) {
    this.isWaiting = false;
    this.destinationFloor = floor;
    
    this.destinationHeight = FLOORS.indexOf(floor) * DISTANCE_BETWEEN_FLOORS;
  
    if (this.destinationHeight > this.currentHeight) {
      this.direction = 'up';
    } else if (this.destinationHeight < this.currentHeight) {
      this.direction = 'down';
    } else { // already at destination
      this.direction = null;
    }
  }

  update() {
    this.currentTime += TIME_STEP;

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
    }
  }
}
