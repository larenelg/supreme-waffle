"use strict";

const Elevator = require('./elevator');
const Passenger = require('./passenger');

describe('elevator', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('always begins at G', () => {
    expect(elevator.currentFloor).toEqual('G');
  });

  describe('one passenger', () => {
    var passenger;

    beforeEach(() => {
      passenger = new Passenger();
    });

    it('summons elevator to G', () => {
      passenger.summons(elevator).to('G');

      //expect(elevator.destinationList).toEqual(['G']);
      //elevator.travel();
      //expect(elevator.currentFloor).toEqual('G');
    });
  });
});
