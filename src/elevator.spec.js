"use strict";

const Elevator = require('./elevator');

describe('elevator', function() {
  var elevator;

  beforeEach(function () {
    elevator = new Elevator();
  });

  it('always begins at G', function () {
    expect(elevator.currentFloor).toEqual('G');
  });
});
