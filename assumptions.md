Assumptions

* The software is for soley _one_ elevator in a _10_ storey building
* The elevator can be _summoned_ from any floor, a passenger cannot _unsummon_ the lift, once _unsummoned_
* The floor numbers are: G, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
* An elevator can have the following states:
  - travelling,
  - stopped,
  - doors opening,
  - doors closing
* The elevator always starts at G, and remains on last level it travelled to
* A passenger can indicate they want to go up or down(?) on levels 1 to 9; can only indicate up from G, and down from 10
* It takes 5 seconds to travel between floors
* It takes 5 seconds to stop and open doors, 10 seconds to wait for passengers to board, 5 seconds to close doors
  - extra homework, what accel/decel is comfortable for hoomans?

* The definition of *optimal* instructions (biggest assumption):
  - does this mean anything with _one_ elevator?
  - what are we optimising for?

* Future work: elevator gathers data over time and predicts where it should wait between trips, optimising for lowest cumulative wait time >:) also contains sensors to measure cortisol levels, and announce conversation starters to minimise awkward silences.

