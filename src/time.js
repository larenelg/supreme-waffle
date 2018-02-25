const _ = require('lodash');

module.exports = class Time {
  constructor() {
    this.observers = []
    this._currentTimeStep = 0;
    this.oneTimeFunctions = [];
  }

  get currentTimeStep() {
    return this._currentTimeStep;
  }

  set currentTimeStep(timeStep) {
    this._currentTimeStep = timeStep;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  subscribeOnce(fn) {
    this.oneTimeFunctions.push(fn);
  }

  unsubscribe(observer) {
    throw new Error('Not yet implemented.');
  }

  // what happens if an observer is subscribed between these updates?
  // need to write a test...
  advance(numTimes) {
    var _numTimes = numTimes || 1;

    _.times(_numTimes, () => {
      // update one time observers
      this.oneTimeFunctions.forEach(fn => fn());
      this.oneTimeFunctions = [];

      // update continue observers
      this.observers.forEach(observer => {
        observer.update();
      });

      this.currentTimeStep++; // should this go before or after updates? test!
    });
  }
}