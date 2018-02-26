module.exports = class SummonElevatorCommand {
  constructor(elevator, floor, direction) {
    this._elevator = elevator;
    this._floor = floor;
    this._direction = direction;
  }

  execute() {
    this._elevator.receivesRequest(this._floor, this._direction);
  }
};