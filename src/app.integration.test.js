"use strict";

const expect = require('chai').expect;

const Elevator = require('./elevator');
const Passenger = require('./passenger');
const Time = require('./time');

// timesteps helper

describe('elevator app', () => {
  var elevator;
  var time;

  beforeEach(() => {
    elevator = new Elevator();
    time = new Time();
  });

  it('test case 0: initialisation', () => {
    var passenger = new Passenger(elevator, 'G', time);

    expect(passenger.hasReachedDestination).to.equal(false); // not set until they go somewhere
    expect(passenger.currentFloor).to.equal('G');
    expect(elevator.currentFloor).to.equal('G');
    expect(elevator.isWaiting).to.equal(true);
  });

  it('test case 1: passenger travels from G to 5', () => {
    var passenger = new Passenger(elevator, 'G', time);

    // this is probably not the right design pattern, letting TDD sort it out later
    passenger.presses('Up')

    expect(elevator.destinationFloor).to.equal('G');
       
    passenger.waitAndEnterElevator()
      .then(expect(passenger.isInsideElevator).to.equal(true));
    
    // expect(elevator.currentFloor).to.equal('G');
    // expect(elevator.doorsOpen).to.equal(true);
      // .presses('5')
      // .waitForDoorsToOpenAt('5')
      // .exitElevator();

  });
});
