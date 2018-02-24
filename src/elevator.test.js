"use strict";

const expect = require('chai').expect;
const _ = require('lodash');
const Elevator = require('./elevator');

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');

const update = (elevator, numTimes) => {
  _.times(numTimes, () => elevator.update());
}

describe('elevator', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('always begins at G', () => {
    expect(elevator.currentFloor).to.equal('G');
  });

  it('travels up to 2 from G', () => {
    elevator.goToFloor('2');

    elevator.update();

    expect(elevator.distanceToNextFloor).to.equal(2.0);

    elevator.update();

    expect(elevator.distanceToNextFloor).to.equal(1.0);

    elevator.update();

    expect(elevator.distanceToNextFloor).to.equal(3.0);
    expect(elevator.currentFloor).to.equal('1');

    update(elevator, 3);
    
    expect(elevator.currentFloor).to.equal('2');
    expect(elevator.currentHeight).to.equal(2 * DISTANCE_BETWEEN_FLOORS)
  });

  it('travels down from 6 to G', () => {
    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS;
    
    // these shouldn't be exposed, and should be linked together with setters
    elevator.currentFloor = FLOORS[6]
    elevator.currentHeight = sixFloorDistance;

    elevator.goToFloor('G');
    
    update(elevator, sixFloorDistance);

    expect(elevator.currentFloor).to.equal('G');
  });
});
