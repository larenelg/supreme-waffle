const Elevator = require('./elevator');
const Passenger = require('./passenger');

describe('elevator app', () => {
  var elevator;

  beforeEach(() => {
    elevator = new Elevator();
  });

  it('test case 0: initialisation', () => {
    var passenger = new Passenger('G', elevator);

    expect(passenger.hasReachedDestination).toBe(true); // not set until they press a button
    expect(passenger.currentFloor).toBe('G');
    expect(elevator.isWaiting).toBe(true);
  });

  it('test case 1: passenger travels from G to 5', () => {
    var passenger = new Passenger('G', elevator);

    passenger.presses('Up')
      .waitForDoorsToOpenAt('G')
      .enterElevator()
      .presses('5')
      .waitForDoorsToOpenAt('5')
      .exitElevator();

    expect(passenger.hasReachedDestination).toBe(true);
  });
});
