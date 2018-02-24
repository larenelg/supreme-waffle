module.exports = class SummonElevatorCommand {
  constructor(elevator, floor, direction) {
    this._elevator = elevator;
    this._floor = floor;
    this._direction = direction;
  }

  execute() {
    this._elevator.destinationFloor = this._floor;
  }
};