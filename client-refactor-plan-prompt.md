i want to refactor the client.
4. piecesOnBoard. there's a ton of repetition because i thought each piece on both teams had to have its own state to be able to be animated. it's complicated and deterring me from enhancing it. i want this to be simplified.
6. screen responsiveness and camera zoom. when the screen turns orientation in mobile, tokens don't return to their original position. there should be one scale for both orientations.

goal of the client refactor is to simplify adding new features and being able to easily find where code goes wrong.

server refactor
1. adding and leaving player handling can be refactored. i didn't know which cases can happen in production. now that i know that, repeated code can be put into functions and called in appropriate situations. the number of events that the server handles should be minimized.
2. there's lots of deep-copying JSON objects of pieces to check game rules. it's making code hard to read - for example, when moving or scoring. also, there's repeated code for movement or removing ships from tiles. these can be refactored.
3. unity also depends on it, so this should be done after the unity app is finished.

what do the users want?
what do i need?
1. feedback
2. blog
3. ads
4. metrics