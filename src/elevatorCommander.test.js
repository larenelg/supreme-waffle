"use strict";

const expect = require('chai').expect;
const sinon = require('sinon');

const ElevatorCommander = require('./elevatorCommander');

describe('Elevator Commander', () => {
  let elevatorCommander;

  beforeEach(() => {
    elevatorCommander = new ElevatorCommander();
  });

  it('should run the execute function in an object', () => {
    var someObject = {
      execute: sinon.spy()
    };

    elevatorCommander.storeAndExecute(someObject);

    expect(elevatorCommander._commands.length).to.equal(1);
    expect(someObject.execute.called).to.be.true;

    elevatorCommander.storeAndExecute(someObject);

    expect(elevatorCommander._commands.length).to.equal(2);
    expect(someObject.execute.calledTwice).to.be.true;
  });
});