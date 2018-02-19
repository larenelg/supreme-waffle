 --------------------------------------------------------------------------------------------------------------------
|                                 |                                           |                                      |
|  PASSENGERS                     |      LIFT                                 |   LIFT COMMAND QUEUE                 |
|                                 |                                           |                                      |
 --------------------------------------------------------------------------------------------------------------------

Scenario 1:
Passenger @ G                       Lift @ G -- waiting
Passenger presses "up" button       Lift receives 'pickup @ G' command
(wait)                              //Lift starts moving
                                    //Lift stops at G
                                    Lift doors open
Passenger walks into lift           (wait)
                                    Lift doors close (?)
Passenger presses "5"               Lift receives 'go to 5' command
(wait)                              Lift starts moving up
                                    Lift stops at 5
                                    Lift doors open
Passenger exits lift                (wait)
                                    Lift doors close
                                    Lift @ 5 -- waiting

Scenario 2:
P6 @ 6                              Lift @ G -- waiting
P6 presses "down" button            Lift receives 'go to 6, down' command
                                    Lift starts moving up
P4 presses "down" button              Lift receives 'go to 4, down' command
                                    Lift stops at 6
                                    Lift doors open
P6 walks into lift                  (wait)
                                    Lift doors close
P6 presses "1"                      Lift receives 'go to 1' command
                                    Lift starts moving down
                                    Lift stops at 4
                                    Lift doors open
P4 walks into lift                  (wait)
                                    Lift doors close
P4 presses "1"                      Lift receives 'go to 1' command
                                    Lift starts moving down
                                    Lift stops at 1
                                    Lift doors open
P6 leaves lift
P4 leaves lift
                                    Lift doors close
                                    Lift @ 1 -- waiting

Scenario 3:
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
