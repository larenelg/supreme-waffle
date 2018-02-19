"use strict";

const FLOORS = require('./floors');

module.exports = class Elevator {
  constructor() {
    this.isWaiting = true;
    this.currentFloor = FLOORS[0];
  }

  goToFloor(floor) {
    this.isWaiting = false;
    this.destinationFloor = floor;
  }

  update(timeStep) {
    
  }
}
