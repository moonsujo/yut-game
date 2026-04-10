command center
legal tiles
that should be on the client to offload calculation from the server.
client calculates all changes, and sends the new state to the server.
server back-checks the changes
1. if you moved from star-2 to star-5 with gul, was there a token at star-2 in the server?
2. server is the authority-state
3. did the player have 'gul' in his moves?

nope, in Chess.com, client calculates legal moves, shows highlights, and animates them.
the server revalidates it, updates the state and broadcasts the changes.
server recomputation is small. parsing request to broadcasting to client takes less than a millisecond.
if I had a 100 games running concurrently, it would use 20% of the heroku basic dynos CPU. that's far away.

option 1: two click
command center logic
state stores which token to select
home: select first token with lowest id
hover pin over token
button click: socket.emit('select')
second button click: socket.emit(token_action)

next step: "auto throw" toggle
if it's enabled, on record throw, throw yut again (socket.emit('throw'))
else, don't

regression test
with the timer

option 2: one click - select tile to move
logic
on record throw, 
if there is no bonus throw,
  legal tiles should show immediately.
  click on a tile.
  if there is multiple moves that can bring a token there,
    display the options.
  else, move there.
if there is a bonus throw,
  show the throw button.

keep original legalTiles function for fallback

form legalTiles into an array
elements: tile indexes
it's easier to iterate than a dictionary.
sort ascending

wherever you have selecting, or deselecting, you need to handle the command center selection
1. piece
2. tile
3. finish token
4. finish star

next step
cycle through choices

03/05/26
command center arrow shouldn't display when no move is available, or animation is playing
refactor: alert triggers, code, pieces on board, state management, selection and movement hooks

execute command on pointer down. 'no way back.' once you press, it's done.
on refactor: 'proudly present our code base' - on our front page.
be careful. not everyone on the internet is nice

on finish move, run "check moves" logic
check if game is over, or backdo should be removed

display pointer above finish tile
reset tokenChoice after clicking 'GO!'. 
if tokenChoices are empty, don't display pointer, and don't allow clicking 'GO!'
- this should never be a case in the first place

allow clicking 'GO!' on finish tile
allow clicking 'GO!' on multiple finish moves. else, display finish moves in the command center.

make command center into its own component
- display finish tokens
- handle setting tokenChoices with clicking on tile or token
- handle rules on selecting a token on board, and token at home
- left, right, go! buttons

make pointerCommand into its own component
- color of the team
- reuse in FinishTile marker, PiecesSection and Tile component

language modal
- one componenent used in different pages
- specify location of button and modal
- display modal conditionally

finish command center first
then refactor

don't show selection. don't save it in the server. tokenChoices should always start from picking ships when
UI is reloaded.

3/15/26
command center update published.
update panel published.
in landing page, display sections on the right using the scale animation.
this solves the problem of displaying one modal at a time.
pass the local useState function to the button, and conditionally render the display with the useSpring scale.
next: chat. (done)
1. it's covered by the iPhone keyboard
2. Korean typing is bugged
3. i want the text to fly through the board. add a component for this
another one: rules
1. make sure all rules function properly, like split paths from Mars
2. timer should be placed comfortably with the yut button and the command center.
next: blog
1. update log
2. various explanation of rules
3. link to physical copy
next: feedback
1. end of the game
2. thumb up or down
3. if down, open input box: 'what was wrong?'
4. if up, open input box: 'tell us more!'
next: shorter game
1. 1 horse v 1 horse: mini
2. 2 horses v 2 horses: quick
3. 3 teams
4. buttons - mini game, quick game, full game
next: team customization options
1. colors
2. accessories
3. team name
next: login
1. capture replays
next: num wins in lobby
1. display next to team name
next: language - chinese, spanish. use chat gpt. run it by noona and vania

3/24/26
1. we need to refactor the code so it's easier to edit, add to and understand.
refactor camera zoom and particle size. should scale with screen width. refer to evaporating stars
in 'update' button for example. it doesn't pause when you resize or switch device.

about page
add button to landing page
scene scale-reduces
reveal html
make sure it can be read in the browser 

2. HTML, blog, that can come after
3. how-to-play page should be in HTML so it can be queried by the search engine.
4. purpose of 3D is so that i can show skill and capabilities, and what it does for information display.
it should enhance text and 2D, not be the main.

pages
/ (home)
/how-to-play
/game/lobby
/game/game
/game/finished

