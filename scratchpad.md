Scenario 1:
```
Time | Passenger Event                   | Elevator event
 0:    Passenger @ G                       Lift @ G -- waiting
 1:    Passenger presses "up" button       Lift receives 'pickup @ G' command
       (wait)                              __Lift starts moving__
                                           __Lift stops at G__
 2:                                        Lift doors open
 3:    Passenger walks into lift           (wait)
 4:                                        Lift doors close (?)
 5:    Passenger presses "5"               Lift receives 'go to 5' command
 6:    (wait)                              Lift starts moving up
11:                                        Lift stops at 5
12:                                        Lift doors open
13:    Passenger exits lift                (wait)
14:                                        Lift doors close
15:                                        Lift @ 5 -- waiting
```

Scenario 2:
```
Time | Passenger Event                   | Elevator event
 0:    P6 @ 6                              Lift @ G -- waiting
 1:    P6 presses "down" button            Lift receives 'go to 6, down' command
 3:                                        Lift starts moving up
 0:    P4 presses "down" button            Lift receives 'go to 4, down'  0:    command
 0:                                        Lift stops at 6
 0:                                        Lift doors open
 0:    P6 walks into lift                  (wait)
 0:                                        Lift doors close
 0:    P6 presses "1"                      Lift receives 'go to 1' command
 0:                                        Lift starts moving down
 0:                                        Lift stops at 4
 0:                                        Lift doors open
 0:    P4 walks into lift                  (wait)
 0:                                        Lift doors close
 0:    P4 presses "1"                      Lift receives 'go to 1' command
 0:                                        Lift starts moving down
 0:                                        Lift stops at 1
 0:                                        Lift doors open
 0:    P6 leaves lift
 0:    P4 leaves lift
 0:                                        Lift doors close
 0:                                        Lift @ 1 -- waiting
```

Scenario 3:
```
P2 @ 4                              Lift @ G -- waiting
P2 presses "down" button            Lift receives 'pickup @ 4, down'
P1 @ 2                              Lift starts moving up
P1 presses "up" button              Lift receives 'pickup @ 2, up'
(wait)                              Lift stops at 2
                                    Lift doors open
P1 walks into lift                  (waits)
P1 presses "6"                      Lift receives 'dropoff @ 6' command
                                    Lift doors close
                                    Lift starts moving up
                                    Lift stops at 6
                                    Lift doors open
P1 exits lift                       (wait)
                                    Lift doors close
                                    Lift starts moving down
                                    Lift stops at 4
                                    Lift doors open
P2 enters lift                      (wait)
                                    Lift doors close
                                    Lift @ 4 -- waiting
P2 presses "G"                      Lift recieves 'dropoff @ G' command
                                    Lift starts moving down
                                    Lift stops at G
                                    Lift doors open
P2 exits lift                       (wait)
                                    Lift doors close
                                    Lift @ G -- waiting
```