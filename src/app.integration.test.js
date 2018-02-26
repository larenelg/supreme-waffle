"use strict";

const expect = require('chai').expect;

const Elevator = require('./elevator');
const ElevatorEvents = require('./elevatorEvents');
const Passenger = require('./passenger');
const Time = require('./time');
const { DISTANCE_BETWEEN_FLOORS, TIME_STEP, VELOCITY } = require('./physics');

describe('elevator app', () => {
  var elevator;
  var elevatorEvents;
  var time;

  beforeEach(() => {
    elevatorEvents = new ElevatorEvents();
    elevator = new Elevator(elevatorEvents);
    time = new Time();
    time.subscribe(elevator);
  });

  it('test case 0: initialisation', () => {
    var passenger = new Passenger(elevator, 'G', elevatorEvents);

    expect(passenger.hasReachedDestination).to.be.false; // not set until they go somewhere
    expect(passenger.currentFloor).to.equal('G');
    expect(elevator.currentFloor).to.equal('G');
    expect(elevator.isWaiting).to.be.true;
  });

  it('test case 1: passenger travels from G to 5', () => {
    var passenger = new Passenger(elevator, 'G', elevatorEvents);
    var fiveFloorDistance = 5 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;

    passenger.presses('up').waitsForElevatorAndEnters();

    expect(passenger.isInsideElevator).to.be.false;
    
    time.advance();
    // time.advance();
    
    expect(passenger.isInsideElevator).to.be.true;

    passenger.presses('5').waitsForElevatorToReachFloorAndExits();

    time.advance(fiveFloorDistance);
    time.advance();

    expect(elevator.currentFloor).to.equal('5');
    expect(passenger.currentFloor).to.equal('5');
    expect(passenger.isInsideElevator).to.be.false;
    expect(passenger.hasReachedDestination).to.be.true;
  });

  /* 
  Passenger summons lift on level 6 to go down. 
  Passenger on level 4 summons the lift to go down. 
  They both choose L1.
  */
  it('test case 2', () => {
    var rey = new Passenger(elevator, '6', elevatorEvents);
    var kylo = new Passenger(elevator, '4', elevatorEvents);

    rey.presses('down').waitsForElevatorAndEnters(); // .presses(1);
    kylo.presses('down').waitsForElevatorAndEnters();  // .presses(1);

    var sixFloorTimeSteps = 6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY;

    // go and pickup Rey first
    time.advance(sixFloorTimeSteps);
    time.advance();

    expect(elevator.currentFloor).to.equal('6');
    expect(rey.isInsideElevator).to.be.true;
    expect(kylo.isInsideElevator).to.be.false;

    // then get Kylo on the way down
    time.advance(2 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('4');
    expect(rey.isInsideElevator).to.be.true;
    expect(kylo.isInsideElevator).to.be.true;

    rey.presses('1').waitsForElevatorToReachFloorAndExits();
    // kylo.waitsForElevatorToReachFloorAndExits(); // TODO: refactor so that kylo doesn't need to press any button
    kylo.presses('1').waitsForElevatorToReachFloorAndExits();

    time.advance(4 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);

    expect(elevator.currentFloor).to.equal('1');
    expect(rey.isInsideElevator).to.be.false;
    expect(kylo.isInsideElevator).to.be.false;
  });

  /*
  Passenger 1 summons lift to go up from L2. 
  Passenger 2 summons lift to go down from L4. 
  Passenger 1 chooses to go to L6. 
  Passenger 2 chooses to go to Ground Floor
  */
 it('test case 3', () => {
    var chewie = new Passenger(elevator, '2', elevatorEvents);
    var solo = new Passenger(elevator, '4', elevatorEvents);

    chewie
        .presses('up')
        .waitsForElevatorAndEnters() 

    solo
        .presses('down')
        .waitsForElevatorAndEnters()

    // elevator starts at G
    // should go pick up Chewie first
    time.advance(2 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('2');
    expect(chewie.isInsideElevator).to.be.true;
    chewie.presses('6').waitsForElevatorToReachFloorAndExits();

    // should drop Chewie off at 6
    time.advance(4 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('6');
    expect(chewie.isInsideElevator).to.be.false;
    
    // should now go get Han
    time.advance(2 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY)
    time.advance();

    expect(elevator.currentFloor).to.equal('4');
    expect(solo.isInsideElevator).to.be.true;
    solo.presses('G').waitsForElevatorToReachFloorAndExits();

    // now dropping Han off at G
    time.advance(4 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY)
    time.advance();
    
    expect(elevator.currentFloor).to.equal('G');
    expect(solo.isInsideElevator).to.be.false;
  });

  /*
  Passenger 1 summons lift to go up from Ground. They choose L5. 
  Passenger 2 summons lift to go down from L4. 
  Passenger 3 summons lift to go down from L10. 
  Passengers 2 and 3 choose to travel to Ground.
  */
  it('test case 4', () => {
    var r2d2 = new Passenger(elevator, 'G', elevatorEvents);
    var c3p0 = new Passenger(elevator, '4', elevatorEvents);
    var bb8 = new Passenger(elevator, '10', elevatorEvents);

    r2d2.presses('up').waitsForElevatorAndEnters();
    c3p0.presses('down').waitsForElevatorAndEnters();
    bb8.presses('down').waitsForElevatorAndEnters();
    
    // picks up R2D2 from G first
    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(r2d2.isInsideElevator).to.be.true;

    r2d2.presses('5').waitsForElevatorToReachFloorAndExits();

    // then takes R2D2 up to level 5
    time.advance(5 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('5');
    expect(r2d2.isInsideElevator).to.be.false;

    // go pick up BB8 at 10
    time.advance(5 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('10');
    expect(bb8.isInsideElevator).to.be.true;

    bb8.presses('G').waitsForElevatorToReachFloorAndExits();    

    // go pickup C3P0 last, at 4
    time.advance(6 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('4');
    expect(bb8.isInsideElevator).to.be.true;
    expect(c3p0.isInsideElevator).to.be.true;

    c3p0.presses('G').waitsForElevatorToReachFloorAndExits();    
    
    // let everyone out at G
    time.advance(4 * DISTANCE_BETWEEN_FLOORS * TIME_STEP / VELOCITY);
    time.advance();

    expect(elevator.currentFloor).to.equal('G');
    expect(bb8.isInsideElevator).to.be.false;
    expect(c3p0.isInsideElevator).to.be.false;
    expect(r2d2.isInsideElevator).to.be.false;    
  })
});
