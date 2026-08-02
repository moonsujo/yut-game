start game
click on button
start game
end game
return

button
on click, display mini game scene
display rules and sample scene
anyone can click on the stars
(respawn each after a few seconds)
display start button
count down - function: counts down and starts game via server and socketManager
game loop: 3 seconds count down - 60 seconds game play - restart or exit
15 seconds warning, 5 seconds warning
referee: keep scores, determine winner
storage: seconds remaining, team scores, star locations
(check 8 neighboring stars)
(same for bomb. destroy 8 neighboring stars)
click star, click bomb, detonate bomb, server send update, client apply update
server end game. client display end with team scores and return-to-game button.

game phase: intro, game, finish


iteration 1
make 2D array when minigame button is clicked. on room initialize, it should be empty.
make a new Star component for the minigame. it should still use the model from Star.
initialize a random set of stars. each array item should be one of the following:
1. turquoise star (team 1)
2. red star (team 0)
3. bomb (no team)

iteration 2
on minigame button click, it should load 'demo test stars'.
configuration should look like this
[
  [0, turq-star, 0, 0, 0],
  [turq-star, 0, turq-star, 0, 0],
  [0, turq-star, 0, red-star, 0],
  [0, 0, red-star, 0, red-star],
  [0, 0, 0, red-star, 0],
  [0, 0, turq-star, 0, 0],
  [0, turq-star, bomb, red-star, 0],
]
turq-star: ufo star (team 1), red-star: rocket star (team 0)
server should broadcast this when minigame button is clicked from a client.
stars in client need to be synced with server. when one client presses a star,
other clients should see it disappeared too.
save the randomized initialization for the real game.

iteration 3
delay in star click response
1. star disappears later: what about bomb?
bomb is about to blow. you click the star. bomb blows up. even though star 
should have been blown, it registers as collected.







constraints on star spawn
1. do not spawn a star in the spot it was collected.
2. when you spawn after a bomb explode, do not spawn where a star was destroyed.

stage
expand the column by 1 on each side. expand the row below the current rows