"use strict";

const expect = require('chai').expect;

const Elevator = require('./elevator');
const ElevatorEvents = require('./elevatorEvents');
const Passenger = require('./passenger');
const Time = require('./time');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP } = require('./physics');

// timesteps helper

describe('elevator app', () => {
  var elevator;
  var elevatorEvents;
  var time;

  beforeEach(() => {
    elevatorEvents = new ElevatorEvents();
    elevator = new Elevator(elevatorEvents);
    time = new Time();
    time.subscribe(elevator);
  });

  it('test case 0: initialisation', () => {
    var passenger = new Passenger(elevator, 'G', elevatorEvents);

    expect(passenger.hasReachedDestination).to.equal(false); // not set until they go somewhere
    expect(passenger.currentFloor).to.equal('G');
    expect(elevator.currentFloor).to.equal('G');
    expect(elevator.isWaiting).to.equal(true);
  });

  it('test case 1: passenger travels from G to 5', () => {
    var passenger = new Passenger(elevator, 'G', elevatorEvents);
    var groundToFiveDistance = 5 * DISTANCE_BETWEEN_FLOORS * TIME_STEP;

    passenger.presses('Up').waitForElevatorAndEnter();

    expect(elevator.destinationFloor).to.equal('G');
    expect(elevator.currentFloor).to.equal('G');
    expect(passenger.isInsideElevator).to.be.false;
    
    time.advance();
    
    expect(passenger.isInsideElevator).to.be.true;

    passenger.presses('5').waitsForElevatorToReachFloorAndExits();

    time.advance(groundToFiveDistance);

    expect(elevator.currentFloor).to.equal('5');
    expect(passenger.currentFloor).to.equal('5');
    expect(passenger.isInsideElevator).to.be.false;
  });
});
