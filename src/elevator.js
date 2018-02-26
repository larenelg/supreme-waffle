"use strict";

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');
const ElevatorEvents = require('./elevatorEvents');
const ElevatorRequestQueue = require('./elevatorRequestQueue');

module.exports = class Elevator {
  constructor(elevatorEvents) {
    // constants
    this.availableFloors = FLOORS;
    this.maxHeight = (FLOORS.length - 1) * DISTANCE_BETWEEN_FLOORS;
    this.minHeight = 0.0;

    // services
    this._elevatorEvents = elevatorEvents;    

    // initial values
    this.requestQueue = new ElevatorRequestQueue(this.availableFloors);
    this.currentFloor = FLOORS[0];
    this.currentHeight = 0.0;
    this._resetElevator();
  }
  
  _resetElevator() {
    // initial values
    this.isWaiting = true;
    this.direction = 'up';
    this.destinationHeight = null;
    this.velocity = 0.0;
  }

  _goToFloor(floor) {
    if (this.availableFloors.indexOf(floor) === -1) {
      console.error(`Floor ${floor} isn\'t available`);
      //return;
    }

    this.isWaiting = false;
    this.destinationHeight = this.availableFloors.indexOf(floor) * DISTANCE_BETWEEN_FLOORS;
    this.velocity = Math.sign(this.destinationHeight - this.currentHeight) * VELOCITY;

    if (this.velocity === 0) {
      // floor reached
      this.currentFloor = this.availableFloors[this.currentHeight / DISTANCE_BETWEEN_FLOORS];
      this._elevatorEvents.emit(`floorReached:${this.currentFloor}`);
      if (!this.requestQueue.removeRequest(this.currentFloor, this.direction)) {
        // top or bottom floor has been reached, change direction and remove request
        this._toggleDirection();
        this.requestQueue.removeRequest(this.currentFloor, this.direction)
      }
    } else if (this.velocity > 0) {
      this.direction = 'up';
      this.currentHeight += TIME_STEP * this.velocity;
      this.currentFloor = null;
    } else {
      // this.velocity is -ve
      this.direction = 'down';
      this.currentHeight += TIME_STEP * this.velocity;
      this.currentFloor = null;
      
    }
  }

  _toggleDirection () {
    if (this.direction === 'up') {
      this.direction = 'down';
    } else {
      this.direction = 'up';
    }
  }

  receivesRequest(floor, command) {
    this.requestQueue.addRequest(floor, command);
  }

  update() {
    if (this.requestQueue.noMoreRequests()) {
      this._resetElevator();
      return;
    }

    // console.info(`travelling to ${this.requestQueue.getNextFloor(this.currentFloor, this.direction)}`)

    var nextFloor = this.requestQueue.getNextFloor(this.currentFloor, this.direction);

    if (!nextFloor) {
      // there are still floors left, change direction!
      this._toggleDirection();
      nextFloor = this.requestQueue.getNextFloor(this.currentFloor, this.direction);
    }

    this._goToFloor(nextFloor);
  }
}
