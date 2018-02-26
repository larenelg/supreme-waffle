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

  it('travels from G from G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached:G', floorReachedHandler);
    expect(elevator.requestQueue.noMoreRequests()).to.be.true;
    

    elevator.receivesRequest('G', 'up');
    expect(elevator.requestQueue.noMoreRequests()).to.be.false;

    time.advance();
    
    expect(floorReachedHandler.calledOnce).to.be.true;
    expect(elevator.requestQueue.noMoreRequests()).to.be.true;
  });

  it ('travels from G to 2', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached:2', floorReachedHandler);
    expect(elevator.requestQueue.noMoreRequests()).to.be.true;

    // someone is inside the elevator and presses '2'
    elevator.receivesRequest('2', 'destination');
    expect(elevator.requestQueue.noMoreRequests()).to.be.false;

    time.advance(2 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();
    
    expect(floorReachedHandler.calledOnce).to.be.true;
    expect(elevator.requestQueue.noMoreRequests()).to.be.true;    
  })

  it('travels down from 6 to G', () => {
    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;
    elevator.currentFloor = FLOORS[6]
    elevator.currentHeight = sixFloorDistance; // TODO: these shouldn't be exposed, and should be linked together with setters

    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached:G', floorReachedHandler);

    elevator.receivesRequest('G', 'destination');
    
    time.advance(sixFloorDistance);
    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledOnce).to.be.true;    

    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledOnce).to.be.true;
  });

  it('travels from G to 6 to G', () => {
    var floorReachedHandler = sinon.spy();
    elevatorEvents.on('floorReached:G', floorReachedHandler);
    elevatorEvents.on('floorReached:6', floorReachedHandler);

    const sixFloorDistance = 6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;

    elevator.receivesRequest('G', 'up');
    elevator.receivesRequest('6', 'destination');
  
    time.advance(); // open/close at G

    time.advance(sixFloorDistance); // travels 6 floors
    time.advance(); // open/close at 6

    expect(elevator.currentFloor).to.equal('6');
    expect(floorReachedHandler.calledTwice).to.be.true;

    elevator.receivesRequest('G', 'down');

    time.advance(sixFloorDistance);
    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(floorReachedHandler.calledThrice).to.be.true;
  });
});
