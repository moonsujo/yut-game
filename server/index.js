import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import mongoose from 'mongoose';
import { makeId } from './helpers.js';
import initialState from './initialState.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   "https://master.dh445c3qmwe4t.amplifyapp.com",
    // ],
    origin: "*"
  },
});

const PORT = process.env.PORT || 5000

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))

async function connectMongo() {
  await mongoose.connect("mongodb+srv://beatrhino:databaseAdmin@yootgamecluster.fgzfv9h.mongodb.net/yootGameDb")
}

const userSchema = new mongoose.Schema(
  {
    socketId: String,
    roomId: String, // shortId
    name: String,
    team: Number,
    connectedToRoom: Boolean,
    createdTime: Date,
    status: String // playing, away
  },
  {
    versionKey: false,
  }
)

const roomSchema = new mongoose.Schema(
  {
    shortId: String,
    createdTime: Date,
    spectators: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    }],
    teams: [{
      _id: Number,
      players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
      }],
      pieces: [{
        tile: Number, // Home: -1, Scored: 29
        team: Number,
        id: Number,
        history: [Number],
        lastPath: [Number],
        _id: false
      }],
      throws: Number,
      moves: {
        '0': Number,
        '1': Number,
        '2': Number,
        '3': Number,
        '4': Number,
        '5': Number,
        '-1': Number
      },
      pregameRoll: Number
    }],
    turn: {
      team: Number,
      players: [Number]
    },
    messages: [{
      _id: false,
      name: String,
      text: String
    }],
    gameLogs: [{
      _id: false,
      logType: String,
      content: Object
    }],
    host: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
    gamePhase: String,
    yootOutcome: Number,
    yootAnimation: Number,
    pregameOutcome: String,
    selection: {
      tile: Number,
      pieces: [{
        tile: Number,
        team: Number,
        id: Number,
        history: [Number],
        lastPath: [Number],
        _id: false
      }],
    },
    legalTiles: Object,
    tiles: [
      [
        {
          tile: Number,
          team: Number,
          id: Number,
          history: [Number],
          lastPath: [Number],
          _id: false
        }
      ]
    ],
    results: [Number],
    serverEvent: {
      name: String,
      content: Object
    },
    lastJoinedUser: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
    paused: Boolean,
    rules: {
      backdo: Boolean,
      timer: Boolean
    }
  },
  {
    versionKey: false,
    minimize: false
  }
)

const User = mongoose.model('users', userSchema)
const Room = mongoose.model('rooms', roomSchema)

async function addUser(socket, name) {
  try {
    let user;
    if (socket.handshake.query.client === "null") { // Use saved client
      user = new User({
        socketId: socket.id,
        name,
        team: -1,
        roomId: null,
        connectedToRoom: false,
        createdTime: new Date(),
        status: 'playing'
      })
      await user.save()
    } else {
      const savedClient = JSON.parse(socket.handshake.query.client)
      // in mongodb, when client leaves, the roomId and name haven't changed
      // room refers to player by _id
      // room[team].players array has objectIds, and that object's team hasn't been updated, which is why the host.team is -1 and 'players' is null
      user = await User.findOneAndUpdate({ roomId: savedClient.roomId, name: savedClient.name }, { socketId: socket.id, connectedToRoom: false })
      console.log('user after findOneAndUpdate', user)
      if (!user) {
        user = new User({
          socketId: socket.id,
          name,
          team: -1,
          roomId: null,
          connectedToRoom: false,
          createdTime: new Date(),
          status: 'playing'
        })
        console.log('user from scratch', user)
        await user.save()
      }
    }
    console.log('[addUser] user', user)
    socket.user = user;
  } catch (err) {
    console.log('[addUser]', err)
    return null
  }
}

// Room stream listener
Room.watch([], { fullDocument: 'updateLookup' }).on('change', async (data) => {
  console.log(`[Room.watch]`)
  // console.log(`[Room.watch] data`, data)
  if (data.operationType === 'insert' || data.operationType === 'update') {
    // Emit document to all clients in the room
    let users = data.fullDocument.spectators.concat(data.fullDocument.teams[0].players.concat(data.fullDocument.teams[1].players))
    // console.log(`[Room.watch] users`, users)
    // bottleneck. how can i grab documents from within the room?
    let roomPopulated = await Room.findOne({ shortId: data.fullDocument.shortId })
    .populate('spectators')
    .populate('host')
    .populate('teams.players')
    .exec()
    for (const user of users) {
      try {
        let userFound = await User.findById(user, 'socketId connectedToRoom roomId name').exec()
        // console.log(`[Room.watch] single user`, userFound)
        if (userFound.roomId === data.fullDocument.shortId && userFound.connectedToRoom) {
          let userSocketId = userFound.socketId
          const serverEvent = data.fullDocument.serverEvent
          if (serverEvent === "gameStart") {
            io.to(userSocketId).emit("gameStart", {
              teams: roomPopulated.teams,
              gamePhase: data.fullDocument.gamePhase,
              turn: data.fullDocument.turn,
              gameLogs: data.fullDocument.gameLogs
            })
          } else if (serverEvent === "recordThrow") {
            io.to(userSocketId).emit("recordThrow", {
              teams: roomPopulated.teams,
              gamePhaseUpdate: data.fullDocument.gamePhase,
              turnUpdate: data.fullDocument.turn,
              pregameOutcome: data.fullDocument.pregameOutcome,
              yootOutcome: data.fullDocument.yootOutcome,
              gameLogs: data.fullDocument.gameLogs
            })
          } else if (serverEvent === "move") {
            io.to(userSocketId).emit("move", {
              teamsUpdate: roomPopulated.teams,
              turnUpdate: data.fullDocument.turn,
              legalTiles: data.fullDocument.legalTiles,
              tiles: data.fullDocument.tiles,
              gameLogs: data.fullDocument.gameLogs,
              selection: data.fullDocument.selection
            })
          } else if (serverEvent === "select") {
            io.to(userSocketId).emit("select", {
              selection: data.fullDocument.selection,
              legalTiles: data.fullDocument.legalTiles
            })
          } else if (serverEvent === "throwYoot") {
            io.to(userSocketId).emit('throwYoot', { 
              yootOutcome: data.fullDocument.yootOutcome, 
              yootAnimation: data.fullDocument.yootAnimation, 
              teams: roomPopulated.teams, 
              turn: data.fullDocument.turn
            })
          } else if (serverEvent === "score") {
            io.to(userSocketId).emit('score', { 
              teamsUpdate: roomPopulated.teams, 
              turnUpdate: data.fullDocument.turn,
              legalTiles: data.fullDocument.legalTiles,
              tiles: data.fullDocument.tiles,
              gameLogs: data.fullDocument.gameLogs,
              selection: data.fullDocument.selection,
              results: data.fullDocument.results,
              gamePhase: data.fullDocument.gamePhase
            })
          } else if (serverEvent === "joinRoom") {
            if (user._id.valueOf() === data.fullDocument.lastJoinedUser.valueOf()) {
              io.to(userSocketId).emit('room', roomPopulated)
            } else {
              io.to(userSocketId).emit('joinRoom', { 
                spectators: roomPopulated.spectators,
                teams: roomPopulated.teams,
                host: roomPopulated.host,
                gamePhase: roomPopulated.gamePhase
              })
            }
          } else if (serverEvent === "joinTeam") {
            io.to(userSocketId).emit("joinTeam", { 
              spectators: roomPopulated.spectators,
              teams: roomPopulated.teams,
              gamePhase: roomPopulated.gamePhase,
              host: roomPopulated.host,
              turn: roomPopulated.turn // to set the throw count for the current team
            })
          } else if (serverEvent === "reset") {
            // io.to(userSocketId).emit("reset", {
            //   gamePhase: roomPopulated.gamePhase,
            //   tiles: roomPopulated.tiles,
            //   turn: roomPopulated.turn,
            //   teams: roomPopulated.teams,
            // })
            io.to(userSocketId).emit("reset");
          } else if (serverEvent === "userDisconnect") {
            io.to(userSocketId).emit("userDisconnect", { 
              spectators: roomPopulated.spectators,
              teams: roomPopulated.teams,
              gamePhase: roomPopulated.gamePhase,
              host: roomPopulated.host
            })
          } else if (serverEvent.name === "setAway") {
            io.to(userSocketId).emit("setAway", { 
              player: serverEvent.content
            })
          } else if (serverEvent.name === "setTeam") {
            console.log('[change stream][setTeam]')
            io.to(userSocketId).emit("setTeam", { 
              user: serverEvent.content.user,
              prevTeam: serverEvent.content.prevTeam
            })
          } else {
            io.to(userSocketId).emit('room', roomPopulated)
          }
        }
      } catch (err) {
        console.log(`[Room.watch] error getting user's socket id`, err)
      }
    }
  }
})

async function createUniqueRoomId() {
  let roomId;
  let exists = true;
  let idLength = 4;
  while (exists) {
    roomId = makeId(idLength);
    exists = await Room.findOne({ shortId: roomId }).exec(); // Check for collisions
  }
  console.log('[createUniqueRoomId] roomId', roomId)
  return roomId;
}

io.on("connect", async (socket) => {

  connectMongo().catch(err => console.log('mongo connect error', err))
  socket.user = null;
  socket.room = {};

  socket.on("addUser", async ({}, callback) => {
    console.log('[addUser]')
    let name = makeId(5)
    addUser(socket, name)
    return callback()
  })

  socket.on("createRoom", async ({}, callback) => {
    console.log('[createRoom]')
    let objectId = new mongoose.Types.ObjectId()
    const shortRoomId = await createUniqueRoomId()

    // Get user by socket id
    let user;
    try {
      user = await User.findOne({ socketId: socket.id }).exec()
    } catch (err) {
      console.log(`[createRoom] user with socket id ${socket.id} not found`)
    }

    // Create room with socket id owner as host
    try {
      const room = new Room({
        _id: objectId,
        shortId: shortRoomId,
        createdTime: new Date(),
        spectators: [],
        teams: [
          {
            _id: 0,
            players: [],
            pieces: JSON.parse(JSON.stringify(initialState.initialPiecesTeam0)),
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          },
          {
            _id: 1,
            players: [],
            pieces: JSON.parse(JSON.stringify(initialState.initialPiecesTeam1)),
            moves: JSON.parse(JSON.stringify(initialState.initialMoves)),
            throws: 0,
            pregameRoll: null
          }
        ],
        messages: [],
        gameLogs: [],
        host: null,
        gamePhase: 'lobby',
        turn: {
          team: -1,
          players: [0, 0]
        },
        yootOutcome: null,
        yootAnimation: null,
        pregameOutcome: null,
        selection: null,
        legalTiles: {},
        tiles: JSON.parse(JSON.stringify(initialState.initialTiles)),
        results: [],
        moveResult: {
          type: '',
          team: -1,
          amount: 0,
          tile: -1
        },
        throwResult: {
          type: '',
          num: -2,
          time: Date.now()
        },
        serverEvent: '',
        paused: false,
        rules: {
          backdo: false,
          timer: false
        }
      })
      console.log('[createRoom] shortRoomId', shortRoomId)
      await room.save();
      return callback({ shortId: shortRoomId })
    } catch (err) {
      return callback({ error: err.message })
    }
  })

  async function removeUser(user) {        
    let operation;
    if (user.team === -1) {
      operation = {
        $pullAll: { 
          'spectators': [
            { _id: user._id }
          ],
        },
        $set: {
          'serverEvent': 'userDisconnect'
        }
      }
    } else if (user.team === 0) {
      operation = {
        $pullAll: { 
          'teams.0.players': [
            { _id: user._id }
          ],
        },
        $set: {
          'serverEvent': 'userDisconnect'
        }
      }
    } else if (user.team === 1) {
      operation = {
        $pullAll: { 
          'teams.1.players': [
            { _id: user._id }
          ],
        },
        $set: {
          'serverEvent': 'userDisconnect'
        }
      }
    }
    
    await Room.updateOne(
      { 
        _id: user.roomId
      }, 
      operation
    ).exec()
  }

  socket.on("checkRoomExists", async ({ roomId }, callback) => {
    // enhancement: return a string
    // if 'findOne' fails, display 'failed to call database' error
    // this way, user knows to return after a certain time
    let exists;
    try {
      let room = await Room.findOne({ shortId: roomId })
      if (!room) {
        exists = false
      } else {
        exists = true
      }
      callback({ exists })
    } catch (err) {
      console.log(`[checkRoomExists] error checking if room exists`, err)
    }
  })

  socket.on("joinRoom", async ({ roomId }) => {
    console.log('[joinRoom] roomId', roomId)
    try {
      let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { roomId, connectedToRoom: true })
      console.log('[joinRoom] user', user)

      let operation = {}
      if (user && user.roomId && user.roomId.valueOf() === roomId) { // Use value saved in local storage
        if (user.team === -1) { // if spectator
          operation['$addToSet'] = { "spectators": user._id }
          operation['$set'] = { 
            "serverEvent": 'joinRoom',
            "lastJoinedUser": user._id
          }
        } else {
          operation['$addToSet'] = { [`teams.${user.team}.players`]: user._id }
          operation['$set'] = { 
            "serverEvent": 'joinRoom',
            "lastJoinedUser": user._id
          }
        }
      } else { // Use default values (add as spectator)
        operation['$addToSet'] = { "spectators": user._id }
        operation['$set'] = { 
          "serverEvent": 'joinRoom',
          "lastJoinedUser": user._id
        }
        user.name = makeId(5);
        user.team = -1
        user.save();
      }
      await Room.findOneAndUpdate( { shortId: roomId }, operation )
    } catch (err) {
      console.log(`[joinRoom] error adding user to room`, err)
    }

    // Add user as host if room is empty
    try {
      let user = await User.findOne({ 'socketId': socket.id })
      let room = await Room.findOne({ shortId: roomId })
      if (!room) {
        throw new Error(`room with id ${roomId} not found`)
      }
      if (!user) {
        throw new Error(`user with socket id ${socket.id} not found`)
      }
      if (room.host === null) {
        room.host = user._id
        room.save()
      }
      socket.user = user;
      socket.room.host = room.host;
      socket.room.players = []
      socket.room.players.push(JSON.parse(JSON.stringify(room.teams[0].players)))
      socket.room.players.push(JSON.parse(JSON.stringify(room.teams[1].players)))
      socket.room.spectators = JSON.parse(JSON.stringify(room.spectators))
    } catch (err) {
      console.log(`[joinRoom] error adding user as host`, err)
    }
  })
  
  socket.on("joinTeam", async ({ team, name }, callback) => {
    console.log(`[joinTeam]`)
    let player;
    try {
      player = await User.findOneAndUpdate({ 'socketId': socket.id }, { team, name }).exec()
      player.save()
      console.log('[joinTeam] player', player)

      let operation = {}
      operation['$pullAll'] = { 
        'spectators': [{ _id: player._id }], // Remove the user from the spectator list
        [`teams.${team === 0 ? 1 : 0}.players`]: [{ _id: player._id }] 
      }
      operation['$addToSet'] = { [`teams.${team}.players`]: player._id }
      operation['$set'] = { 'serverEvent': 'joinTeam' }
      
      // Add to the team's players array
      await Room.findOneAndUpdate(
        { shortId: player.roomId }, 
        operation
      ).exec()
    } catch (err) {
      console.log(`[joinTeam] error joining team`, err)
      return callback()
    }

    return callback({ player })
  })

  function getHostTurn(room) {
    const host = room.host
    console.log('[getHostTurn] host', host)
    let turn;
    room.teams[host.team].players.forEach(function (player, i) {
      if (player._id.valueOf() === host._id.valueOf()) {
        let playerIndices = [0, 0]
        playerIndices[host.team] = i
        turn = {
          team: host.team,
          players: playerIndices
        }
      }
    })
    return turn
  }

  socket.on("startGame", async ({ roomId }) => {
    console.log(`[startGame]`)
    try {

      const room = await Room.findOne({ shortId: roomId }).populate('host')

      let newTurn;
      if (room.results.length > 0) {
        newTurn = {
          team: room.results[room.results.length-1],
          players: [0, 0]
        }
      } else {
        newTurn = getHostTurn(room)
      }
      
      await Room.findOneAndUpdate({ shortId: roomId }, {
        $set: {
          [`teams.${newTurn.team}.throws`]: 1,
          gamePhase: "pregame",
          turn: newTurn,
          serverEvent: "gameStart"
        },
        $push: {
          gameLogs: {
            logType: 'gameStart',
            content: {
              text: `Match ${room.results.length+1} started`
            }
          }
        }
      })
    } catch (err) {
      console.log(`[startGame] error starting game`, err)
    }
  })

  socket.on("sendMessage", async ({ message, roomId }, callback) => {
    try {
      let room = await Room.findOne({ shortId: roomId });
      message = {
        name: room.users.get(socket.id).name,
        text: message
      }
      room.messages.push(message)
      await room.save();
      return callback({ joinRoomId: roomId })
    } catch (err) {
      return callback({ joinRoomId: roomId, error: err.message })
    }
  })

  function sumArray(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  function pickOutcome() {
    // return outcome
    // front end maps outcome to an animation
    const doProb = 0.21
    const backdoProb = 0.07
    const geProb = 0.3
    const gulProb = 0.27
    const yootProb = 0.1
    const moProb = 0.03
    const nakProb = 0.02
    const probs = [doProb, backdoProb, geProb, gulProb, yootProb, moProb, nakProb]
    const randomNum = Math.random()
    if (randomNum < sumArray(probs.slice(0, 1))) {
      return 1
    } else if (randomNum >= sumArray(probs.slice(0, 1)) && randomNum < sumArray(probs.slice(0, 2))) {
      return -1
    } else if (randomNum >= sumArray(probs.slice(0, 2)) && randomNum < sumArray(probs.slice(0, 3))) {
      return 2
    } else if (randomNum >= sumArray(probs.slice(0, 3)) && randomNum < sumArray(probs.slice(0, 4))) {
      return 3
    } else if (randomNum >= sumArray(probs.slice(0, 4)) && randomNum < sumArray(probs.slice(0, 5))) {
      return 4
    } else if (randomNum >= sumArray(probs.slice(0, 5)) && randomNum < sumArray(probs.slice(0, 6))) {
      return 5
    } else if (randomNum >= sumArray(probs.slice(0, 6)) && randomNum < sumArray(probs.slice(0, 7))) {
      return 0
    }
  }

  function pickAnimation(outcome) {
    const outcomeToPseudoIndex = {
      '1': [14, 22, 25, 42],
      '-1': [59, 60],
      '2': [8, 13, 15, 16, 23, 28, 30, 31, 32, 35, 38, 39, 40, 48, 49, 50, 52, 54, 57, 58],
      '3': [2, 17, 21, 24, 29, 34, 36, 37, 41, 46, 47, 51, 53, 55, 56],
      '4': [19, 20, 26, 27, 33, 44, 45],
      '5': [43],
      '0': [1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 18],
    }
    const listOfAnimations = outcomeToPseudoIndex[outcome]
    let pseudoIndex = listOfAnimations[Math.floor(Math.random() * listOfAnimations.length)]
    return pseudoIndex
  }

  socket.on("throwYoot", async ({ roomId }) => {
    let user;
    
    // Find user who made the request
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[throwYoot] error getting user with socket id ${socket.id}`, err)
    }

    try {
      let room = await Room.findOne({ shortId: roomId })

      if (room.teams[user.team].throws > 0) {

        const outcome = pickOutcome()
        // for testing
        // let outcome;
        // if (room.gamePhase === 'pregame') {
        //   if (room.turn.team === 1) {
        //     outcome = 5
        //   } else {
        //     outcome = 4
        //   }
        // } else if (room.gamePhase === 'game') {
        //   // outcome = 4
        //   if (room.turn.team === 0) {
        //     outcome = Math.random() > 0.5 ? 5 : 4
        //   } else {
        //     outcome = 1
        //   }
        // }
        const animation = pickAnimation(outcome)
        await Room.findOneAndUpdate( // consolidate into one call with the 'findOne' call from above
          { 
            shortId: roomId
          }, 
          { 
            $set: { 
              yootOutcome: outcome,
              yootAnimation: animation,
              serverEvent: 'throwYoot'
            },
            $inc: {
              [`teams.${user.team}.throws`]: -1
            }
          }
        )

        // record throw
        setTimeout(async () => {

          let operation = {}
          operation['$set'] = {}
          operation['$inc'] = {}
          operation['$push'] = {}
          try {
            let room = await Room.findOne({ shortId: roomId })  

            // on yoot or mo, if gamePhase is 'game', add 'bonus: true' to 'content'.
            // else, add 'bonus: false'
            let gameLogs = [] 

            // Add move to team
            if (room.gamePhase === "pregame") {
              room.teams[user.team].pregameRoll = outcome // to pass into 'comparePregameRolls'
              operation['$set'][`teams.${user.team}.pregameRoll`] = outcome

              gameLogs.push(
                {
                  logType: 'throw',
                  content: {
                    playerName: user.name,
                    team: user.team,
                    move: outcome,
                    bonus: false
                  }
                }
              )
              
              const outcomePregame = comparePregameRolls(room.teams[0].pregameRoll, room.teams[1].pregameRoll)
              if (outcomePregame === "pass") {
                const newTurn = passTurn(room.turn, room.teams)
                operation['$set']['turn'] = newTurn
                operation['$set']['pregameOutcome'] = outcomePregame
                operation['$inc'][`teams.${newTurn.team}.throws`] = 1
              } else if (outcomePregame === "tie") {
                const newTurn = passTurn(room.turn, room.teams)
                operation['$set']['turn'] = newTurn
                operation['$set']['pregameOutcome'] = outcomePregame
                operation['$set']['teams.0.pregameRoll'] = null
                operation['$set']['teams.1.pregameRoll'] = null
                operation['$inc'][`teams.${newTurn.team}.throws`] = 1
                gameLogs.push(
                  {
                    logType: 'pregameResult',
                    content: {
                      team: -1
                    }
                  }
                )
              } else {
                // 'outcomePregame' is the winning team index
                const newTurn = setTurn(room.turn, outcomePregame)
                operation['$set']['turn'] = newTurn
                operation['$set']['pregameOutcome'] = outcomePregame.toString()
                operation['$set']['gamePhase'] = 'game'
                operation['$inc'][`teams.${outcomePregame}.throws`] = 1
                gameLogs.push(
                  {
                    logType: 'pregameResult',
                    content: {
                      team: outcomePregame
                    }
                  }
                )
              }
            } else if (room.gamePhase === "game") {
              room.teams[user.team].moves[outcome]++;

              // Add bonus throw on Yoot and Mo
              if (room.yootOutcome === 4 || room.yootOutcome === 5) {
                operation['$inc'][`teams.${user.team}.throws`] = 1
                room.teams[user.team].throws++;
                
                gameLogs.push({
                  logType: 'throw',
                  content: {
                    playerName: user.name,
                    team: user.team,
                    move: outcome,
                    bonus: true
                  }
                })
              } else {
                gameLogs.push({
                  logType: 'throw',
                  content: {
                    playerName: user.name,
                    team: user.team,
                    move: outcome,
                    bonus: false
                  }
                })
              }

              // Call .toObject() on moves to leave out the mongoose methods
              if (room.teams[user.team].throws === 0 && 
              isEmptyMoves(room.teams[user.team].moves.toObject())) {
                const newTurn = passTurn(room.turn, room.teams)
                operation['$set']['turn'] = newTurn
                operation['$set'][`teams.${user.team}.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
                operation['$inc'][`teams.${newTurn.team}.throws`] = 1
              } else {
                operation['$inc'][`teams.${user.team}.moves.${outcome}`] = 1
              }
            }

            operation['$push']['gameLogs'] = { '$each': gameLogs }
            
            operation['$set']['serverEvent'] = 'recordThrow'

            await Room.findOneAndUpdate(
              { 
                shortId: roomId, 
              }, 
              operation
            )
          } catch (err) {
            console.log(`[throwYoot] error recording throw`, err)
          }
        }, 5000)
      }
    } catch (err) {
      console.log(`[throwYoot] error on throw yoot`, err)
    }
  })

  function passTurn(currentTurn, teams) {
    const currentTeam = currentTurn.team

    if (currentTurn.team == teams.length - 1) {
      currentTurn.team = 0
    } else {
      currentTurn.team++
    }
  
    if (currentTurn.players[currentTeam] == teams[currentTeam].players.length - 1) {
      currentTurn.players[currentTeam] = 0
    } else {
      currentTurn.players[currentTeam]++
    }

    return currentTurn
  }

  function setTurn(currentTurn, team) {
    return {
      team: team,
      players: currentTurn.players
    }
  }

  // Return the result
  function comparePregameRolls(team0Roll, team1Roll) {
    if ((team0Roll !== null) && (team1Roll !== null)) {
      if (team0Roll === team1Roll) {
        // Clear pregame rolls
        // return passTurn(currentTurn, teams)
        return "tie"
      } else if (team0Roll > team1Roll || team1Roll === 0) {
        // Proceed to the game phase
        // return setTurn(currentTurn, 0)
        return 0
      } else if (team1Roll > team0Roll || team0Roll === 0) {
        // Proceed to the game phase
        // return setTurn(currentTurn, 1)
        return 1
      }
    } else {
      // return passTurn(currentTurn, teams)
      return "pass"
    }
  }

  function isEmptyMoves(moves) {
    for (const move in moves) {
      if (parseInt(move) !== 0 && moves[move] > 0) {
        return false;
      }
    }
    return true;
  }

  // Client only emits this event if it has the turn
  socket.on("select", async ({ roomId, selection, legalTiles }) => {
    // emit server event "select"
    // disable yoot button
    try {
      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
        }, 
        { 
          $set: { 
            'selection': selection === 'null' ? null : selection,
            'legalTiles': legalTiles,
            'serverEvent': 'select'
          }
        }
      )
    } catch (err) {
      console.log(`[select] error making selection`, err)
    }
  });

  // Client only emits this event if it has the turn
  socket.on("legalTiles", async ({ roomId, legalTiles }) => {
    try {
      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
        }, 
        { 
          $set: { 
            'legalTiles': legalTiles
          }
        }
      )
    } catch (err) {
      console.log(`[legalTiles] error making selection`, err)
    }
  });

  socket.on("move", async ({ roomId, tile }) => {
    try {
      const room = await Room.findOne({ shortId: roomId })
      let user;
      try {
        user = await User.findOne({ socketId: socket.id })
      } catch (err) {
        console.log(`[move] error getting user with socket id ${socket.id}`, err)
      }
  
      let moveInfo = room.legalTiles[tile]
      let tiles = room.tiles
      let from = room.selection.tile
      let to = tile
      let moveUsed = moveInfo.move
      let path = moveInfo.path
      let history = moveInfo.history
      let pieces = room.selection.pieces
      let starting = pieces[0].tile === -1
      let movingTeam = pieces[0].team;

      let moves = room.teams[movingTeam].moves;
      let throws = room.teams[movingTeam].throws;

      let operation = {};
      operation['$set'] = {}
      operation['$inc'] = {}
      operation['$push'] = {}

      let gameLogs = [];
      gameLogs.push({
        logType: "move",
        content: {
          playerName: user.name,
          team: movingTeam,
          tile,
          numPieces: pieces.length,
          starting
        }
      })

      for (const piece of pieces) {
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.tile`] = to
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.history`] = history
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.lastPath`] = path
      }

      // Clear pieces from the 'from' tile if they were on the board
      if (!starting) {
        operation['$set'][`tiles.${from}`] = []
      }

      pieces.forEach(function(_item, index, array) {
        array[index].tile = to
        array[index].history = history
        array[index].lastPath = path
      })

      if (tiles[to].length > 0) {
        let occupyingTeam = tiles[to][0].team

        // Catch
        if (occupyingTeam != movingTeam) {
          for (let piece of tiles[to]) {
            piece.tile = -1
            piece.history = []
            operation['$set'][`teams.${occupyingTeam}.pieces.${piece.id}`] = piece
          }
          
          operation['$set'][`tiles.${to}`] = pieces
          throws++;

          gameLogs.push({
            logType: "catch",
            content: {
              playerName: user.name,
              team: movingTeam,
              caughtTeam: occupyingTeam,
              numPiecesCaught: tiles[to].length,
              path
            }
          })
        } else { // Join pieces
          operation['$push'][`tiles.${to}`] = { '$each': pieces }
          
          gameLogs.push({
            logType: "join",
            content: {
              playerName: user.name,
              team: movingTeam,
              numPiecesCombined: pieces.length + tiles[to].length,
            }
          })
        }
      } else {
        operation['$push'][`tiles.${to}`] = { '$each': pieces }
      }

      // Clear legal tiles and selection
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null

      moves[moveUsed]--;

      if (throws === 0 && isEmptyMoves(moves.toObject())) {
        const newTurn = passTurn(room.turn, room.teams)
        operation['$set']['turn'] = newTurn
        operation['$set'][`teams.${movingTeam}.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
        operation['$inc'][`teams.${newTurn.team}.throws`] = 1
      } else {
        operation['$set'][`teams.${movingTeam}.throws`] = throws
        operation['$set'][`teams.${movingTeam}.moves`] = moves
      }
      
      operation['$push']['gameLogs'] = { '$each': gameLogs }
      operation['$set']['serverEvent'] = 'move'

      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
        }, 
        operation
      )
      
    } catch (err) {
      console.log(`[move] error making move`, err)
    }
  })

  socket.on("score", async ({ roomId, selectedMove }) => {
    // score
    try {
      const room = await Room.findOne({ shortId: roomId })

      let operation = {};
      operation['$set'] = {}
      operation['$inc'] = {}
      operation['$push'] = {}

      let gameLogs = [];
      
      // update pieces
      const pieces = room.selection.pieces
      const movingTeam = pieces[0].team;
      const history = selectedMove.history
      const path = selectedMove.path
      for (const piece of room.selection.pieces) {
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.tile`] = 29
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.history`] = history
        operation['$set'][`teams.${movingTeam}.pieces.${piece.id}.lastPath`] = path

        // set state within the scope of this function for win check
        room.teams[movingTeam].pieces[piece.id].tile = 29
      }

      let user;
      try {
        user = await User.findOne({ socketId: socket.id })
      } catch (err) {
        console.log(`[score] error getting user with socket id ${socket.id}`, err)
      }

      gameLogs.push({
        logType: 'score',
        content: {
          playerName: user.name,
          team: movingTeam,
          numPiecesScored: room.selection.pieces.length
        }
      })

      // update tiles
      const from = room.selection.tile
      operation['$set'][`tiles.${from}`] = []
      
      // update moves
      let moves = room.teams[movingTeam].moves;
      operation['$set'][`teams.${movingTeam}.moves`] = moves

      // update selection and legal tiles
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null

      function winCheck(team) {
        for (const piece of team.pieces) {
          if (piece.tile !== 29) {
            return false
          }
        }
        return true;
      }

      if (winCheck(room.teams[movingTeam])) {
        operation['$push'][`results`] = movingTeam
        operation['$set']['gamePhase'] = 'finished'

        gameLogs.push({
          logType: 'finish',
          content: {
            winningTeam: movingTeam,
            matchNum: room.results.length+1
          }
        })
      } else {
        // pass check
        let throws = room.teams[movingTeam].throws;
        moves[selectedMove.move]--;
        if (throws === 0 && isEmptyMoves(moves.toObject())) {
          const newTurn = passTurn(room.turn, room.teams)
          await Room.findOneAndUpdate(
            { 
              shortId: roomId, 
            }, 
            { 
              $set: { 
                turn: newTurn,
                // Empty the team's moves
                [`teams.${movingTeam}.moves`]: JSON.parse(JSON.stringify(initialState.initialMoves)),
              },
              $inc: { [`teams.${newTurn.team}.throws`]: 1 } 
            }
          )
        }
      }

      operation['$push']['gameLogs'] = { '$each' : gameLogs }
      operation['$set']['serverEvent'] = 'score'

      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
        }, 
        operation
      )
    } catch (err) {
      console.log(`[move] error scoring piece`, err)
    }
  })

  socket.on("reset", async ({ roomId }) => {
    // moves in each team
    // tiles
    try {
      let operation = {};
      operation['$set'] = {}
      operation['$set']['gamePhase'] = 'lobby'
      operation['$set']['tiles'] = [
        [], // { [ { team: Number, id: Number, tile: Number, history: [Number], status: String } ] }
        [],
        [],
        [],
        [],
        [], // 5
        [],
        [],
        [],
        [],
        [], // 10
        [],
        [],
        [],
        [],
        [], // 15
        [],
        [],
        [],
        [],
        [], // 20
        [],
        [],
        [],
        [],
        [], // 25
        [],
        [],
        [],
      ]
      operation['$set']['legalTiles'] = {}
      operation['$set']['selection'] = null
      operation['$set']['pregameOutcome'] = null
      operation['$set']['turn'] = {
        team: -1,
        players: [0, 0]
      }
      operation['$set'][`teams.0.pieces`] = JSON.parse(JSON.stringify(
        // initialState.initialPiecesTeam0
        [
          { tile: -1, team: 0, id: 0, history: [], lastPath: [] },
          { tile: -1, team: 0, id: 1, history: [], lastPath: [] },
          { tile: -1, team: 0, id: 2, history: [], lastPath: [] },
          { tile: -1, team: 0, id: 3, history: [], lastPath: [] },
        ]
      ))
      operation['$set'][`teams.0.throws`] = 0
      operation['$set'][`teams.0.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
      operation['$set'][`teams.0.pregameRoll`] = null
      operation['$set'][`teams.1.pieces`] = JSON.parse(JSON.stringify(
        // initialState.initialPiecesTeam1
        [
          { tile: -1, team: 1, id: 0, history: [], lastPath: [] },
          { tile: -1, team: 1, id: 1, history: [], lastPath: [] },
          { tile: -1, team: 1, id: 2, history: [], lastPath: [] },
          { tile: -1, team: 1, id: 3, history: [], lastPath: [] },
        ]
      ))
      operation['$set'][`teams.1.throws`] = 0
      operation['$set'][`teams.1.moves`] = JSON.parse(JSON.stringify(initialState.initialMoves))
      operation['$set'][`teams.1.pregameRoll`] = null

      operation['$set']['serverEvent'] = 'reset'

      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
        }, 
        operation
      )

      console.log(`[reset] success`)
    } catch (err) {
      console.log(`[reset] error resetting game`, err)
    }
  })

  socket.on("disconnectFromRoom", async ({ roomId }) => {
    console.log(`[disconnectFromRoom] ${socket.id} disconnectFromRoom`)
    try {

      let user = await User.findOneAndUpdate({ 'roomId': roomId, 'socketId': socket.id }, { '$set': { 'connectedToRoom': false }})

      await Room.updateOne(
        { 
          shortId: roomId
        }, 
        {
          $set: {
            'serverEvent': 'userDisconnect'
          } 
        }
      )

      console.log(`[disconnectFromRoom] user to disconnect from room`, user)
      socket.room = null;
    } catch (err) {
      console.log(`[disconnectFromRoom] error disconnecting user from room`, err)
    }
  })

  socket.on("disconnect", async () => {
    console.log(`[disconnect] ${socket.id} disconnect`)
    try {

      let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { '$set': { 'connectedToRoom': false }})

      if (!user) {
        throw new Error(`user with socket id ${socket.id} not found`)
      }
      await Room.updateOne(
        { 
          shortId: user.roomId
        }, 
        {
          $set: {
            'serverEvent': 'userDisconnect'
          } 
        }
      )

      console.log(`[disconnect] user to disconnect from room`, user)
    } catch (err) {
      console.log(`[disconnect] error deleting user`, err)
    }
  });

  // doubles as 'returned' toggle
  // status: string
  socket.on('setAwayHost', async ({ roomId, hostId, name: username, team, status }) => {
    // check if hostId matches the one from the room
    // set away for given userId
    console.log('[setAwayHost] status', status)
    console.log(`[setAwayHost] hostId from event ${hostId}, hostId from socket ${socket.room.host._id}`)
    try {
      if (hostId !== socket.room.host._id.valueOf()) {
        throw new Error('host id from event does not match the host id from the room')
      }
      else if (team !== 0 || team !== 1) {
        throw new Error('cannot set away for spectator')
      }

      await User.findOneAndUpdate({ name: username, roomId: roomId }, { status })
      // set event in room
      // emit player that changed in change stream

      await Room.updateOne(
        { 
          shortId: roomId
        }, 
        {
          $set: {
            'serverEvent': {
              'name': 'setAway',
              'content': {
                'team': team, // 0 or 1, can only be a player
                'name': username,
                'status': status // playing, or away
              }
            }
          } 
        }
      )
    } catch (err) {
      console.log(`[setAwayHost] error setting away for player from host`, err)
    }
  })

  socket.on('setAway', async ({ roomId, userId }) => {
    // set away for user matching socket id (not using hostId or userId)
  })

  // teamId: -1 for spectator, 0 for rockets, 1 for ufo
  socket.on('setTeam', async ({ roomId, hostId, name, currTeamId, newTeamId }) => {
    console.log('[setTeam]')
    try {
      if (hostId !== socket.room.host._id.valueOf()) {
        throw new Error('host id from event does not match the host id from the room')
      }
      else if (newTeamId !== -1 && newTeamId !== 0 && newTeamId !== 1) {
        throw new Error('unexpected teamId')
      } else if (newTeamId === -1) {
        console.log('[setTeam] player to spectator, roomId', roomId, 'hostId', hostId, 'name', name, 'currTeamId', currTeamId, 'newTeamId', newTeamId)
        // switching into spectator
        const user = await User.findOneAndUpdate({ name, roomId }, { team: newTeamId }, { new: true })
        console.log('[setTeam] user assigned on update', user)

        let operation = {}
        operation['$pullAll'] = { 
          [`teams.${currTeamId}.players`]: [{ _id: user._id }] 
        }
        operation['$addToSet'] = { [`spectators`]: user._id }
        operation['$set'] = { 
          'serverEvent': {
            'name': 'setTeam',
            'content': {
              user,
              prevTeam: currTeamId
            }
          }
        }
        
        await Room.findOneAndUpdate({ shortId: roomId }, operation )
      } else if (newTeamId === 0 || newTeamId === 1) {
        console.log('[setTeam] spectator to player')
        // switching to a team
        const user = await User.findOneAndUpdate({ name, roomId }, { team: newTeamId }, { new: true })
  
        let operation = {}
        operation['$pullAll'] = { 
          [`spectators`]: [{ _id: user._id }] 
        }
        operation['$addToSet'] = { [`teams.${newTeamId}.players`]: user._id }
        operation['$set'] = { 
          'serverEvent': {
            'name': 'setTeam',
            'content': {
              user,
              prevTeam: currTeamId
            }
          }
        }
        
        await Room.findOneAndUpdate({ shortId: roomId }, operation )
      }
    } catch (err) {
      console.log(`[setTeam] error setting away for player from host`, err)
    }
  })

  socket.on('assignHost', async ({ roomId, hostId, userId }) => {
    // check client is the host of the room // findOneAndUpdate (roomId, newValues)
    // check user is not the host of the room
    // set user as the host
      // this removes client from the host
  })

  socket.on('kick', async ({ roomId, hostId, userId }) => {
    // check if client is the host of the room // findOneAndUpdate (roomId, newValues)
    // check if user is connected to the room
    // remove player from player list (team0, team1 or spectators)
    // set player's room to null
    // set 'connectedToRoom' to 'false' on player
  })

  socket.on('pauseGame', async ({ roomId, hostId }) => {
    // check if client is the host of the room // findOneAndUpdate (roomId, newValues)
    // pause game in room
  })

  // rules: 'backdo', 'timer'
  socket.on('setGameRules', async ({ roomId, hostId, rule }) => {
    // check if client is the host of the room // findOneAndUpdate (roomId, newValues)
    // flip boolean switch by rule (key of rule dictionary)
  })
})