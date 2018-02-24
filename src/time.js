const _ = require('lodash');

module.exports = class Time {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    throw new Error('Not yet implemented.');
  }

  advance(numTimes) {
    var _numTimes = numTimes || 1;

    _.times(_numTimes, () => {
      this.observers.forEach((observer) => {
        observer.update();
      })
    });
  }
}