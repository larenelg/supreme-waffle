"use strict";

const expect = require('chai').expect;
const ElevatorRequestQueue = require('./elevatorRequestQueue');

const FLOORS = require('./floors');

describe('Elevator Request Queue', () => {
  let elevatorRequestQueue;

  beforeEach(() => {
    elevatorRequestQueue = new ElevatorRequestQueue(FLOORS);
  });

  it('should not allow a command to be queued more than once', () => {
    elevatorRequestQueue.addRequest('6', 'up');
    elevatorRequestQueue.addRequest('6', 'up');
    elevatorRequestQueue.addRequest('6', 'down');
    elevatorRequestQueue.addRequest('6', 'destination');
    elevatorRequestQueue.addRequest('6', 'destination');
    elevatorRequestQueue.addRequest('6', 'destination');

    expect(elevatorRequestQueue._queue['up'].length).to.equal(1);
    expect(elevatorRequestQueue._queue['down'].length).to.equal(1);
    expect(elevatorRequestQueue._queue['destination'].length).to.equal(1);
  });

  it('should pick the next closest floor going in the same direction', () => {
    elevatorRequestQueue.addRequest('6', 'up');
    elevatorRequestQueue.addRequest('4', 'up');
    elevatorRequestQueue.addRequest('5', 'destination');

    // starting from G, going up    
    var nextFloor = elevatorRequestQueue.getNextFloor('G', 'up');
    expect(nextFloor).to.equal('4');
    elevatorRequestQueue.removeRequest('4', 'up');
    
    var nextFloor = elevatorRequestQueue.getNextFloor('4', 'up');
    expect(nextFloor).to.equal('5');
    elevatorRequestQueue.removeRequest('5', 'up');
    
    var nextFloor = elevatorRequestQueue.getNextFloor('5', 'up');
    expect(nextFloor).to.equal('6');
    elevatorRequestQueue.removeRequest('6', 'up');
    expect(elevatorRequestQueue.noMoreRequests()).to.be.true;
  });

  it('should pick the next closest floor going in multiple directions', () => {
    elevatorRequestQueue.addRequest('G', 'up');
    elevatorRequestQueue.addRequest('6', 'up');
    elevatorRequestQueue.addRequest('4', 'down');
    elevatorRequestQueue.addRequest('5', 'destination');

    // starting from G, going up
    var nextFloor = elevatorRequestQueue.getNextFloor('G', 'up');
    expect(nextFloor).to.equal('G');
    elevatorRequestQueue.removeRequest('G', 'up');        
    
    var nextFloor = elevatorRequestQueue.getNextFloor('G', 'up');
    expect(nextFloor).to.equal('5');
    elevatorRequestQueue.removeRequest('5', 'up');            
    
    var nextFloor = elevatorRequestQueue.getNextFloor('5', 'up');
    expect(nextFloor).to.equal('6');
    elevatorRequestQueue.removeRequest('6', 'up');            
    expect(elevatorRequestQueue.noMoreRequests()).to.be.false;
    
    // going down now
    var nextFloor = elevatorRequestQueue.getNextFloor('4', 'down');
    expect(nextFloor).to.equal('4');
    elevatorRequestQueue.removeRequest('4', 'down');            
    expect(elevatorRequestQueue.noMoreRequests()).to.be.true;
  });

  it('should pick floors in opposite direction, if no floors in same direction left', () => {
    elevatorRequestQueue.addRequest('1', 'down');
    elevatorRequestQueue.addRequest('2', 'down');

    var nextFloor = elevatorRequestQueue.getNextFloor('G', 'up');
    expect(nextFloor).to.equal('2');

    var nextFloor = elevatorRequestQueue.getNextFloor('G', 'down');
    expect(nextFloor).to.equal('2');
    
  });
});