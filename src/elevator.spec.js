"use strict";

const Elevator = require('./elevator');

describe('elevator', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('always begins at G', () => {
    expect(elevator.currentFloor).toEqual('G');
  });

  it('goes to each floor', () => {
    elevator.goToFloor('1');
    elevator.update(0.5);
    expect(elevator.currentFloor).toBe('between G and 1')
    elevator.update(1);
    expect(elevator.currentFloor).toBe('1');
  });
});
