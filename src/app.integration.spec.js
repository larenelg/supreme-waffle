"use strict";

const Elevator = require('./elevator');
const Passenger = require('./passenger');

// timesteps helper

describe('elevator app', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('test case 0: initialisation', () => {
    var passenger = new Passenger(elevator, 'G');

    expect(passenger.hasReachedDestination).toBe(false); // not set until they go somewhere
    expect(passenger.currentFloor).toBe('G');
    expect(elevator.currentFloor).toBe('G');
    expect(elevator.isWaiting).toBe(true);
  });

  // TODO: failing test, make it green!
  it('test case 1: passenger travels from G to 5', () => {
    var passenger = new Passenger(elevator, 'G');

    // this is probably not the right design pattern, letting TDD sort it out later
    passenger.presses('Up')
      .waitForDoorsToOpenAt('G')
      .enterElevator()
      .presses('5')
      .waitForDoorsToOpenAt('5')
      .exitElevator();

    expect(passenger.hasReachedDestination).toBe(true); // not implemented
    expect(elevator.isWaiting).toBe(true);
  });
});
