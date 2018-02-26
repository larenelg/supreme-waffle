module.exports = class ElevatorRequestQueue {
  constructor(floors) {
    this._floors = floors
    this._availableDirections = ['up', 'down'];
    this._queue = {
      'up': [],
      'down': [],
      'destination': []
    }
  }

  addRequest(floor, command) {
    if (this._queue[command].includes(floor)) {
      console.info('Floor already queued, not added to queue.');
      return false;
    }

    if (this._floors.includes(floor)  
        && ( this._availableDirections.includes(command) || command === 'destination')) {
      this._queue[command].push(floor);
    } else {
      console.error('Request not valid, not added to queue.');
      return false;
    }

    return true;
  }

  getNextFloor(currentFloor, direction) {
    if (!this._availableDirections.includes(direction)) {
      console.error('Not a valid direction, cannot get floor.');
      return;
    }

    if (this.noMoreRequests()) {
      console.error('No more floors queued.');
      return;
    }

    var currentFloorIndex = this._floors.indexOf(currentFloor);

    //if higher than current floor (if dir is up), if lower than current floor (if dir is down)
    var nextFloorsInSameDirection = [...this._queue[direction], ...this._queue['destination']]
        .sort((a, b) => {
          return direction === 'up' ? this._floors.indexOf(a) - this._floors.indexOf(b) : this._floors.indexOf(b) - this._floors.indexOf(a)
        });
        
        
    if (nextFloorsInSameDirection.length > 0) {
      return nextFloorsInSameDirection[0];
    } else {
      var otherDirection = [...this._availableDirections.filter(dirn => dirn !== direction)]
      
      var floorsInOtherDirection = [...this._queue[otherDirection], ...this._queue['destination']]
          .sort((a, b) => {
            return direction === 'down' ? this._floors.indexOf(a) - this._floors.indexOf(b) : this._floors.indexOf(b) - this._floors.indexOf(a)
          });

      return floorsInOtherDirection[0];
    }

    return; 
  }

  // TODO: ugly - refactor
  removeRequest(floor, direction) {
    if (!this._queue[direction].includes(floor) && !this._queue['destination'].includes(floor)) {
      return false;
    }

    if (this._queue[direction].includes(floor)) {
      this._queue[direction].splice(this._queue[direction].indexOf(floor), 1)
    };

    if (this._queue['destination'].includes(floor)) {
      this._queue['destination'].splice(this._queue['destination'].indexOf(floor), 1);
    };

    return true;
  }

  noMoreRequests() {
    if (this._queue['up'].length === 0
        && this._queue['down'].length === 0
        && this._queue['destination'].length === 0) {
      return true;
    } else { 
      return false; 
    }
  }
}
