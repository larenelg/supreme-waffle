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

  it('travels from G from 2', () => {
    const oneFloorDistance = 1 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;
    
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached', floorReachedHandler);

    elevator.goToFloor('2');

    expect(elevator.isWaiting).to.be.false;

    time.advance(oneFloorDistance);
    console.log(`****** ${elevator.currentFloor}`);

    expect(elevator.currentFloor).to.equal('1');

    time.advance(oneFloorDistance);
    
    expect(elevator.currentFloor).to.equal('2');
    expect(elevator.currentHeight).to.equal(2 * DISTANCE_BETWEEN_FLOORS);
    expect(elevator.isWaiting).to.be.true;

    time.advance(oneFloorDistance); // doesn't go past second

    expect(elevator.currentFloor).to.equal('2');
    expect(elevator.currentHeight).to.equal(2 * DISTANCE_BETWEEN_FLOORS)
    expect(floorReachedHandler.calledOnce).to.be.true;
  });

  it('travels down from 6 to G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached', floorReachedHandler);

    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;
    
    // these shouldn't be exposed, and should be linked together with setters
    elevator.currentFloor = FLOORS[6]
    elevator.currentHeight = sixFloorDistance;

    elevator.goToFloor('G');
    
    time.advance(sixFloorDistance);

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledOnce).to.be.true;    

    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledOnce).to.be.true; 
  });

  it('travels from G to 6 to G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached', floorReachedHandler);

    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;

    elevator.goToFloor('6');
    
    time.advance(sixFloorDistance);

    expect(elevator.currentFloor).to.equal('6');
    expect(floorReachedHandler.calledOnce).to.be.true;    

    elevator.goToFloor('G');

    time.advance(sixFloorDistance);

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledTwice).to.be.true; 
  });
});
