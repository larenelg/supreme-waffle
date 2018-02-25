"use strict";

const expect = require('chai').expect;
const sinon = require('sinon');

const Time = require('./time');
const ElevatorEvents = require('./elevatorEvents')
const Elevator = require('./elevator');
const FLOORS = require('./floors');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');

describe('elevator', () => {
  var time;
  var elevatorEvents;
  var elevator;

  beforeEach(() => {
    time = new Time();
    elevatorEvents = new ElevatorEvents();    
    elevator = new Elevator(elevatorEvents);
    time.subscribe(elevator);
  });

  it('always begins at G', () => {
    expect(elevator.currentFloor).to.equal('G');
  });

  it('travels up to 2 from G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached', floorReachedHandler);

    elevator.goToFloor('2');

    time.advance();

    expect(elevator.distanceToNextFloor).to.equal(2.0);

    time.advance();

    expect(elevator.distanceToNextFloor).to.equal(1.0);

    time.advance();

    expect(elevator.distanceToNextFloor).to.equal(3.0);
    expect(elevator.currentFloor).to.equal('1');

    time.advance(3);
    
    expect(elevator.currentFloor).to.equal('2');
    expect(elevator.currentHeight).to.equal(2 * DISTANCE_BETWEEN_FLOORS)
    expect(floorReachedHandler.calledOnce).to.be.true;

    time.advance(3);

    expect(elevator.currentFloor).to.equal('2');
    expect(elevator.currentHeight).to.equal(2 * DISTANCE_BETWEEN_FLOORS)
  });

  it('travels down from 6 to G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached', floorReachedHandler);

    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS;
    
    // these shouldn't be exposed, and should be linked together with setters
    elevator.currentFloor = FLOORS[6]
    elevator.currentHeight = sixFloorDistance;

    elevator.goToFloor('G');
    
    time.advance(sixFloorDistance);

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledOnce).to.be.true;    
  });
});
