"use strict";

const expect = require('chai').expect;
const sinon = require('sinon');

const Time = require ('./time');

describe('time', () => {
  let time;

  beforeEach(() => {
    time = new Time();
  });

  it('should update subscribed events on advance', () => {
    var observer = {
      update() { return null; }
    }
    sinon.spy(observer, 'update');
    time.subscribe(observer);

    time.advance();

    expect(observer.update.called).to.be.true;
    expect(time.currentTimeStep).to.equal(1);
  });

  it('should not update subscribed events on advance', () => {
    var observer = {
      update() { return null; }
    }
    sinon.spy(observer, 'update');

    time.advance();

    expect(observer.update.notCalled).to.be.true;
    expect(time.currentTimeStep).to.equal(1);
  });

  it('should call one-time observer functions once', () => {
    var oneTimeThing = sinon.spy();

    time.subscribeOnce(oneTimeThing);

    time.advance(10);
    expect(oneTimeThing.calledOnce).to.be.true;
    expect(time.currentTimeStep).to.equal(10);
  });

  it('should update subscribed events on advance', () => {
    var firstObserver = {
      update() { return null; }
    }

    var secondObserver = {
      update() { return null; }
    }
    sinon.spy(firstObserver, 'update');
    sinon.spy(secondObserver, 'update');
    time.subscribe(firstObserver);
    time.subscribe(secondObserver);

    time.advance(3);

    expect(firstObserver.update.calledThrice).to.be.true;
    expect(secondObserver.update.calledThrice).to.be.true;
    expect(time.currentTimeStep).to.equal(3);
  });
});