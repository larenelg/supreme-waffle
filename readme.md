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

```
yarn test --watch
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
* All floors have both up and down buttons outside the elevator, these _summon_ the elevator
* The elevator can be _summoned_ from any floor, a passenger cannot _unsummon_ the lift, once _summoned_
* The floor numbers are: G, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
* A passenger can only request a floor, once inside the elevator
* A passenger must press request a floor as their destination, or they cannot leave the elevator
* Velocity, distance, time are all unitless values, there's no acceleration / decceleration

* The definition of *optimal* instructions (biggest assumption):
  - does this mean anything with _one_ elevator?
  - what are we optimising for?

# Future Work
* Allow passenger to exit elevator without pressing the destination floor when inside (create more events to emit and subscribe to)
* Extra homework: Ideal elevator kinematics for hoomans?
  https://www.peters-research.com/images/stories/papers/idealliftkinematics/kinematicsexample.jpg

# Future Future Work
Elevator gathers data over time and predicts where it should wait between trips, optimising for lowest cumulative wait time >:) also contains sensors to measure cortisol levels, and randomly deliver conversation starters to minimise awkward silences.

