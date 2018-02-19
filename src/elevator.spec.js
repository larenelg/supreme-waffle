"use strict";

const Elevator = require('./elevator');

const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');


describe('elevator', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('always begins at G', () => {
    expect(elevator.currentFloor).toEqual('G');
  });

  it('travels up to 2 from G', () => {
    elevator.goToFloor('2');
    elevator.update();
    expect(elevator.distanceToNextFloor).toBe(2.0);
    elevator.update();
    expect(elevator.distanceToNextFloor).toBe(1.0);
    elevator.update();
    expect(elevator.distanceToNextFloor).toBe(3.0);
    expect(elevator.currentFloor).toBe('1');
    elevator.update();
    elevator.update();
    elevator.update();
    expect(elevator.currentFloor).toBe('2');
    expect(elevator.currentHeight).toBe(2 * DISTANCE_BETWEEN_FLOORS)
  });

  it('travels down from 6 to G', () => {
    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS;
    
    // these shouldn't be exposed, and should be linked together with setters
    elevator.currentFloor = FLOORS[6]
    elevator.currentHeight = sixFloorDistance;

    elevator.goToFloor('G');
    
    for (var i = 0; i < sixFloorDistance; i++) {
      // sixFloorDistance also happens to be the same number of required timeSteps to reach G floor
      elevator.update();
    }

    expect(elevator.currentFloor).toBe('G');
  });
});
