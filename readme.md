# How to run

## Install deps

You can choose `npm` or `yarn` as your package manager wrapper of choice. I prefer `yarn`, but I've been meaning to go back to `npm` since v3 came out.

```
yarn install
```

## Run tests

```
yarn test
```

## Run app (doesn't do much)

```
yarn start
```

# Dev specs

//TODO: Create an .npmrc to freeze the versions, anyway, FYI below

```
$ node -v
v7.4.0

$ npm -v
4.0.5

$ yarn -v
1.0.1
```

# Assumptions

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
* A passenger enters the destination when they enter the lift (only once)
* Elevator does not need to indicate which buttons are pressed
* It takes 3 time-steps to travel between floors
* It takes 3 time-step to open doors, 3 time-step to wait for passengers to board, 3 time-steps to close doors
  - extra homework, ideal elevator kinematics for hoomans?
  https://www.peters-research.com/images/stories/papers/idealliftkinematics/kinematicsexample.jpg

* The definition of *optimal* instructions (biggest assumption):
  - does this mean anything with _one_ elevator?
  - what are we optimising for?

# Future Work
Elevator gathers data over time and predicts where it should wait between trips, optimising for lowest cumulative wait time >:) also contains sensors to measure cortisol levels, and randomly deliver conversation starters to minimise awkward silences.

