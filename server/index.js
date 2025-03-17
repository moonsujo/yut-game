import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import mongoose from 'mongoose';
import { makeId } from './helpers.js';
import initialState from './initialState.js';
import { getLegalTiles } from './rules/legalTiles.js'
import { tileType } from './rules/rulesHelpers.js'

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
      content: Object,
      gameLogs: [Object]
    },
    lastJoinedUser: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users'
    },
    paused: Boolean,
    rules: {
      backdoLaunch: Boolean,
      timer: Boolean,
      nak: Boolean,
      yutMoCatch: Boolean
    },
    turnStartTime: Number,
    turnExpireTime: Number,
    timerId: Number,
    turnsSkipped: Number,
    pauseTime: Number,
    pauseTimerReset: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const User = mongoose.model('users', userSchema)
const Room = mongoose.model('rooms', roomSchema)

async function addUser(socket, name, roomId, savedClient) {
  console.log('[addUser] name', name, 'savedClient', savedClient)
  savedClient = JSON.parse(savedClient)
  try {
    // Input validation
    if (socket.length > 20) {
      throw new Error('socket id is too long')
    } else if (name.length > 16) {
      throw new Error('name is too long')
    } else if (roomId.length > 5) {
      throw new Error('roomId is too long')
    }
    let user;
    if (savedClient === null) {
      console.log('[addUser] client did not pass a user info from local storage')
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
      // const savedClient = JSON.parse(socket.handshake.query.client)
      console.log('[addUser] client passed a user info from local storage', savedClient)
      // in mongodb, when client leaves, the roomId and name haven't changed
      // room refers to player by _id
      // room[team].players array has objectIds, and that object's team hasn't been updated, which is why the host.team is -1 and 'players' is null
      if (roomId !== savedClient.roomId) {
        console.log('[addUser] client from local storage entered a different room')
        // If player, remove from the saved room
        if (savedClient.team === 0 || savedClient.team === 1) {
          await User.deleteOne({ roomId: savedClient.roomId, name: savedClient.name })
          let room = await Room.findOne({ shortId: savedClient.roomId })
          if (!room) {
            throw new Error('room does not exist')
          } else {
            let roomPlayerIndex = room.teams[savedClient.team].players.findIndex((player) => {
              return player._id.valueOf() === savedClient._id.valueOf()
            })
            room.teams[savedClient.team].players.splice(roomPlayerIndex, 1)
            room.serverEvent = {
              name: 'playerRoomSwitch',
              content: {
                roomPlayerIndex,
                roomPlayerTeam: savedClient.team
              }
            }
            console.log('[addUser] serverEvent', room.serverEvent)
            await room.save()
          }
        }

        user = new User({
          socketId: socket.id,
          name,
          team: -1,
          roomId,
          connectedToRoom: false,
          createdTime: new Date(),
          status: 'playing'
        })
        await user.save()
      } else {
        user = await User.findOneAndUpdate({ roomId: savedClient.roomId, name: savedClient.name }, { socketId: socket.id, connectedToRoom: false })
        console.log('user after findOneAndUpdate', user)
        // User could have been kicked, and removed
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
    }
    console.log('[addUser] user', user)
  } catch (err) {
    console.log('[addUser] error', err)
    return null
  }
}

// Room stream listener
Room.watch([], { fullDocument: 'updateLookup' }).on('change', async (data) => {
  // console.log(`[Room.watch] data`, data)
  if (data.operationType === 'insert' || data.operationType === 'update') {
    // Emit document to all clients in the room
    // instead of concatting everything, do it separately
    // building array takes time
    let users = data.fullDocument.spectators.concat(data.fullDocument.teams[0].players.concat(data.fullDocument.teams[1].players))

    // populate only when players are emitted
    let roomPopulated = await Room.findOne({ shortId: data.fullDocument.shortId })
    .populate('spectators')
    .populate('host')
    .populate('teams.players')
    .exec()
    let room = data.fullDocument;
    console.log(`[Room.watch] roomId ${room.shortId} users`, users)
    const serverEvent = data.fullDocument.serverEvent
    console.log(`*******************[Room.watch] serverEvent`, serverEvent.name)
    for (const user of users) {
      try {
        let userFound = await User.findById(user, 'socketId connectedToRoom roomId name').exec()
        // console.log(`[Room.watch] single user`, userFound)
        if (userFound.roomId === data.fullDocument.shortId && userFound.connectedToRoom) {
          let userSocketId = userFound.socketId
          if (serverEvent.name === 'gameStart') {
            io.to(userSocketId).emit('gameStart', {
              gamePhase: room.gamePhase,
              newTeam: room.turn.team,
              newPlayer: room.turn.players[room.turn.team],
              throwCount: room.teams[room.turn.team].throws,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              newGameLog: serverEvent.content.gameLog
            })
            // separating it into two events lags the client
          } else if (serverEvent.name === 'passTurn') {
            io.to(userSocketId).emit('passTurn', {
              newTeam: room.turn.team,
              newPlayer: room.turn.players[room.turn.team],
              throwCount: room.teams[room.turn.team].throws,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              gamePhase: room.gamePhase,
              content: serverEvent.content,
              newGameLogs: serverEvent.content.gameLogs,
              paused: room.paused,
            })
          } else if (serverEvent.name === 'recordThrow') {
            io.to(userSocketId).emit("recordThrow", {
              teams: roomPopulated.teams, // only the moves and throws
              // if 0 or -1 was recorded, clear moves depending on isEmptyMoves or isBackdo...Moves
              // if a yut or mo was thrown, update throws for the team
              gamePhaseUpdate: data.fullDocument.gamePhase,
              turnUpdate: data.fullDocument.turn,
              pregameOutcome: data.fullDocument.pregameOutcome,
              yootOutcome: data.fullDocument.yootOutcome,
              newGameLogs: serverEvent.content.gameLogs,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              paused: room.paused
            })
          } else if (serverEvent.name === 'move') {
            io.to(userSocketId).emit('move', {
              newTeam: room.turn.team,
              prevTeam: serverEvent.content.prevTeam,
              newPlayer: room.turn.players[room.turn.team],
              moveUsed: serverEvent.content.moveUsed,
              updatedPieces: serverEvent.content.updatedPieces,
              updatedTiles: serverEvent.content.updatedTiles,
              throws: serverEvent.content.throws,
              newGameLogs: serverEvent.content.gameLogs,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              paused: room.paused
            })
          } else if (serverEvent.name === "select") {
            io.to(userSocketId).emit("select", {
              selection: data.fullDocument.selection,
              legalTiles: data.fullDocument.legalTiles // should emit an array of tile indices
            })
          } else if (serverEvent.name === 'throwYut') {
            io.to(userSocketId).emit('throwYut', { 
              yootOutcome: data.fullDocument.yootOutcome, 
              yootAnimation: data.fullDocument.yootAnimation, 
              throwCount: room.teams[room.turn.team].throws,
              turnExpireTime: room.turnExpireTime,
              newGameLogs: serverEvent.content.gameLogs,
            })
          } else if (serverEvent.name === 'score') {
            io.to(userSocketId).emit('score', { 
              newTeam: room.turn.team,
              prevTeam: serverEvent.content.prevTeam,
              newPlayer: room.turn.players[room.turn.team],
              moveUsed: serverEvent.content.moveUsed,
              updatedPieces: serverEvent.content.updatedPieces,
              from: serverEvent.content.fromTile,
              throws: serverEvent.content.throws,
              winner: serverEvent.content.winner, // -1, 0 or 1
              gamePhase: data.fullDocument.gamePhase,
              newGameLogs: serverEvent.content.gameLogs,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              paused: room.paused
            })
          } else if (serverEvent.name === "joinRoom") {
            if (user._id.valueOf() === data.fullDocument.lastJoinedUser.valueOf()) {
              io.to(userSocketId).emit('room', roomPopulated)
            } else {
              io.to(userSocketId).emit('joinRoom', { 
                // pick out which array was updated by serverEvent.content
                spectators: roomPopulated.spectators,
                teams: roomPopulated.teams,
                host: roomPopulated.host,
                gamePhase: roomPopulated.gamePhase
              })
            }
          } else if (serverEvent.name === "joinTeam") {
            io.to(userSocketId).emit("joinTeam", { 
              spectators: roomPopulated.spectators,
              playersTeam0: roomPopulated.teams[0].players,
              playersTeam1: roomPopulated.teams[1].players,
              gamePhase: roomPopulated.gamePhase,
              host: roomPopulated.host,
              turn: roomPopulated.turn // Used to set the throw count for the current team
            })
          } else if (serverEvent === "reset") {
            io.to(userSocketId).emit("reset");
          } else if (serverEvent.name === "spectatorDisconnect") {
            io.to(userSocketId).emit("spectatorDisconnect", { 
              name: serverEvent.name,
            })
          } else if (serverEvent.name === "playerDisconnect") {
            io.to(userSocketId).emit("playerDisconnect", { 
              team: serverEvent.team,
              name: serverEvent.name,
            })
          } else if (serverEvent.name === "playerDisconnectLobby") {
            io.to(userSocketId).emit("playerDisconnectLobby", { 
              playersTeam0: roomPopulated.teams[0].players,
              playersTeam1: roomPopulated.teams[1].players,
            })
          } else if (serverEvent.name === "setAway") {
            io.to(userSocketId).emit("setAway", { 
              player: serverEvent.content,
              paused: room.paused
            })
          } else if (serverEvent.name === "setTeam") {
            io.to(userSocketId).emit("setTeam", { 
              user: serverEvent.content.user,
              prevTeam: serverEvent.content.prevTeam
            })
          } else if (serverEvent.name === "assignHost") {
            io.to(userSocketId).emit("assignHost", { 
              newHost: serverEvent.content
            })
          } else if (serverEvent.name === "kick") {
            io.to(userSocketId).emit("kick", { 
              team: serverEvent.content.team,
              name: serverEvent.content.name,
              turn: room.turn,
              paused: room.paused
            })
          } else if (serverEvent.name === "pause") {
            io.to(userSocketId).emit("pause", { 
              flag: serverEvent.content.flag,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
            })
          } else if (serverEvent.name === "setGameRule") {
            io.to(userSocketId).emit("setGameRule", { 
              rule: serverEvent.content.rule,
              flag: serverEvent.content.flag,
              turnStartTime: room.turnStartTime,
              turnExpireTime: room.turnExpireTime,
              paused: room.paused
            })
          } else if (serverEvent.name === "playerRoomSwitch") {
            io.to(userSocketId).emit("playerRoomSwitch", { 
              roomPlayerIndex: serverEvent.content.roomPlayerIndex,
              roomPlayerTeam: serverEvent.content.roomPlayerTeam
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

async function createUniqueUsername() {
  let name;
  let exists = true;
  let idLength = 5;
  while (exists) {
    name = makeId(idLength)
    exists = await User.findOne({ name }).exec(); // Check for collisions
  }
  console.log('[createUniqueUsername] name', name)
  return name;
}

const BASE_TURN_EXPIRE_TIME = 60000 // add time for expired alert
const ALERT_TIME = 2500
const JUMP_TIME = 1000
const NUM_TURNS_SKIPPED_TO_PAUSE = 5
io.on("connect", async (socket) => {

  connectMongo().catch(err => console.log('mongo connect error', err))

  // when i add data to the socket via the dot operator,
  // it doesn't change across events

  socket.on("addUser", async ({ roomId, savedClient }, callback) => {
    console.log('[addUser]')
    try {
      const room = await Room.findOne({ shortId: roomId })
      if (!room) {
        throw new Error(`room with short id ${roomId} doesn't exist`)
      }
      let name = await createUniqueUsername()
      await addUser(socket, name, roomId, savedClient)
      return callback('success')
    } catch (err) {
      console.log ('[addUser] error', err)
      return callback('fail')
    }
  })

  socket.on("createRoom", async ({}, callback) => {
    console.log('[createRoom]')
    let objectId = new mongoose.Types.ObjectId()
    const shortRoomId = await createUniqueRoomId()

    // Get user by socket id
    try {
      let user = await User.findOne({ socketId: socket.id })
      if (!user) {
        console.log(`user with socket id ${socket.id} not found`)
      }
    } catch (err) {
      console.log(`[createRoom] error getting user`, err)
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
        serverEvent: {
          name: '',
          content: {},
          gameLogs: []
        },
        paused: false,
        rules: {
          backdoLaunch: true,
          timer: false,
          nak: true,
          yutMoCatch: true
        },
        turnStartTime: null,
        turnExpireTime: null,
        timerId: null,
        turnsSkipped: 0,
        pauseTime: null,
        pauseTimerReset: false
      })
      console.log('[createRoom] shortRoomId', shortRoomId)
      await room.save();
      return callback({ shortId: shortRoomId })
    } catch (err) {
      return callback({ error: err.message })
    }
  })

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
      let user = await User.findOneAndUpdate({ 'socketId': socket.id }, { roomId, connectedToRoom: true }, { new: true })
      console.log('[joinRoom] user', user)

      let operation = {}
      if (user && user.roomId && user.roomId.valueOf() === roomId) {
        if (user.team === -1) { // if spectator
          operation['$addToSet'] = { "spectators": user._id }
          operation['$set'] = { 
            "serverEvent": {
              name: 'joinRoom',
              content: {}
            },
            "lastJoinedUser": user._id
          }
        } else {
          operation['$addToSet'] = { [`teams.${user.team}.players`]: user._id }
          operation['$set'] = { 
            "serverEvent": {
              name: 'joinRoom',
              content: {}
            },
            "lastJoinedUser": user._id
          }
        }
      } else { // Use default values (add as spectator)
        operation['$addToSet'] = { "spectators": user._id }
        operation['$set'] = { 
          "serverEvent": {
            name: 'joinRoom',
            content: {}
          },
          "lastJoinedUser": user._id
        }
        user.name = makeId(5);
        user.team = -1
        await user.save();
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
        await room.save()
      }
    } catch (err) {
      console.log(`[joinRoom] error adding user as host`, err)
    }
  })
  
  socket.on("joinTeam", async ({ team, name }, callback) => {
    console.log(`[joinTeam]`)
    let player;
    try {
      player = await User.findOne({ 'socketId': socket.id })
      if (!player) {
        throw new Error(`player with name ${name} not found`)
      }
      player.team = team
      player.name = name
      await player.save()
      console.log('[joinTeam] new player', player)
      
      const room = await Room.findOne({ shortId: player.roomId })

      // Remove user from spectator, team0 and team1 arrays
      let userIndex;
      userIndex = room.spectators.indexOf(player._id)
      if (userIndex > -1) {
        room.spectators.splice(userIndex, 1)
      }
      userIndex = room.teams[0].players.indexOf(player._id)
      if (userIndex > -1) {
        room.teams[0].players.splice(userIndex, 1)
      }
      userIndex = room.teams[1].players.indexOf(player._id)
      if (userIndex > -1) {
        room.teams[1].players.splice(userIndex, 1)
      }
      
      // Add user to team
      room.teams[team].players.push(player._id)
      room.serverEvent = {
        name: 'joinTeam',
        content: {}
      }
      await room.save()
    } catch (err) {
      console.log(`[joinTeam] error joining team`, err)
      return callback()
    }

    return callback({ player })
  })

  async function getHostTurn(room) {
    const host = await User.findById(room.host)
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

  function startTimer(room) {
    const timer = setTimeout(async () => {
      console.log('[startTimer] time expired. switching turns')
      await switchTurnByTimeExpired(room.shortId);
    }, room.turnExpireTime - Date.now())
    room.timerId = timer
    // await room.save() // done in their respective event handlers
  }

  async function switchTurnByTimeExpired(roomId) {
    const room = await Room.findOne({ shortId: roomId })
    room.turnsSkipped++

    const prevTeam = room.turn.team
    let newTurnStartTime = 0
    let gameLog = {
      logType: 'timesUp',
      content: {
        team: prevTeam
      }
    }
    let serverEvent = {
      name: 'passTurn',
      content: {
        gameLogs: []
      }
    }
    room.gameLogs.push(gameLog)
    serverEvent.content.gameLogs.push(gameLog)
    room.teams[room.turn.team].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
    room.teams[room.turn.team].throws = 0
    room.selection = null
    room.legalTiles = {}
    if (room.gamePhase === 'pregame') {
      room.teams[prevTeam].pregameRoll = 0
      const outcomePregame = comparePregameRolls(room.teams[0].pregameRoll, room.teams[1].pregameRoll)
      if (outcomePregame === "pass") {
        room.pregameOutcome = outcomePregame
        const [newTurn, pause] = await passTurn(room.turn, room.teams)
        room.turn = newTurn
        room.paused = pause
        room.teams[room.turn.team].throws = 1 // New team
        // outcome, turn
        newTurnStartTime += 2 * ALERT_TIME
        serverEvent.content.pregameOutcome = outcomePregame
      } else if (outcomePregame === "tie") {
        room.pregameOutcome = outcomePregame
        room.teams[0].pregameRoll = null
        room.teams[1].pregameRoll = null
        const [newTurn, pause] = await passTurn(room.turn, room.teams)
        room.turn = newTurn
        room.paused = pause
        room.teams[room.turn.team].throws = 1 // New team
        gameLog = {
          logType: 'pregameResult',
          content: {
            team: -1
          }
        }
        room.gameLogs.push(gameLog)
        serverEvent.content.gameLogs.push(gameLog)

        newTurnStartTime += 3 * ALERT_TIME
        serverEvent.content.pregameOutcome = outcomePregame
      } else {
        // 'outcomePregame' is the winning team index
        const [newTurn, pause] = await setTurn(room.turn, outcomePregame, room.teams)
        room.turn = newTurn
        room.paused = pause
        room.pregameOutcome = outcomePregame.toString()
        room.gamePhase = 'game'
        room.teams[outcomePregame].throws = 1
        gameLog = {
          logType: 'pregameResult',
          content: {
            team: outcomePregame
          }
        }
        room.gameLogs.push(gameLog)
        serverEvent.content.gameLogs.push(gameLog)

        newTurnStartTime += 3 * ALERT_TIME
        serverEvent.content.pregameOutcome = outcomePregame
      }
    } else {
      const [newTurn, pause] = await passTurn(room.turn, room.teams)
      room.turn = newTurn
      room.paused = pause
      room.teams[room.turn.team].throws = 1 // New team
      newTurnStartTime += 2 * ALERT_TIME
    }

    if (room.turnsSkipped === NUM_TURNS_SKIPPED_TO_PAUSE) {
      room.paused = true
      room.pauseTime = Date.now()
      room.turnStartTime = Date.now()
      room.turnExpireTime = Date.now() + BASE_TURN_EXPIRE_TIME
      // Stop timer
      clearTimeout(room.timerId)
    } else {
      room.turnStartTime = Date.now() + newTurnStartTime
      room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
      startTimer(room)
    }
    room.serverEvent = serverEvent
    room.serverEvent.content.prevTeam = prevTeam
    await room.save();
  }

  socket.on("gameStart", async ({ roomId, clientId }) => {
    try {

      const room = await Room.findOne({ shortId: roomId, host: clientId })
      if (!room) {
        throw new Error('room with short id', roomId, 'or host with id', clientId, 'not found')
      }

      // Set turn
      let newTurn;
      if (room.results.length > 0) {
        newTurn = {
          team: room.results[room.results.length-1],
          players: [0, 0]
        }
      } else {
        newTurn = await getHostTurn(room)
      }
      room.turn = newTurn
      room.teams[newTurn.team].throws = 1
      room.gamePhase = "game" // testing
      // room.gamePhase = "pregame"
      
      // Game logs
      let gameLog = {
        logType: 'gameStart',
        content: {
          text: `Match ${room.results.length+1} started`
        }
      }
      room.gameLogs.push(gameLog)
      room.serverEvent = {
        name: "gameStart",
        content: {
          gameLog
        }
      }

      // Timer
      room.turnsSkipped = 0
      room.turnStartTime = Date.now() + 2 * ALERT_TIME
      room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
      if (room.rules.timer) {
        startTimer(room);
      }
      
      await room.save()
    } catch (err) {
      console.log(`[gameStart] error starting game`, err)
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

  function pickOutcome({ nakEnabled }) {
    // return outcome
    // front end maps outcome to an animation
    let probs;
    if (nakEnabled) {
      const doProb = 0.21
      const backdoProb = 0.07
      const geProb = 0.3
      const gulProb = 0.27
      const yootProb = 0.1
      const moProb = 0.03
      const nakProb = 0.02
      probs = [doProb, backdoProb, geProb, gulProb, yootProb, moProb, nakProb]
    } else {
      const doProb = 0.214
      const backdoProb = 0.071
      const geProb = 0.306
      const gulProb = 0.276
      const yootProb = 0.102
      const moProb = 0.031
      const nakProb = 0
      probs = [doProb, backdoProb, geProb, gulProb, yootProb, moProb, nakProb]
    }
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

  socket.on('throwYut', async ({ roomId }) => {
    let user;
    
    // Find user who made the request
    // Keep for pseudo-authentication
    try {
      user = await User.findOne({ socketId: socket.id })
    } catch (err) {
      console.log(`[throwYut] error getting user with socket id ${socket.id}`, err)
    }

    try {
      let room = await Room.findOne({ shortId: roomId, paused: false })
      const currentTeam = room.turn.team
      const currentPlayer = room.turn.players[currentTeam]
      if (!room) {
        throw new Error('room with shortId', roomId, 'not found, or game is paused')
      } else if (room.teams[user.team].throws < 0) {
        throw new Error("player's team has no throws")
      } else if (room.teams[currentTeam].players[currentPlayer].valueOf() !== user._id.valueOf()) {
        throw new Error("player doesn't have the turn")
      } else {

        // Stop the timer
        clearTimeout(room.timerId)
        let serverEvent = {
          name: 'throwYut',
          content: {} // if not defined, the nested variable with the same name has an undefined 'content'
        }
        room.turnExpireTime = null
        room.turnsSkipped = 0
        // let outcome = pickOutcome({ nakEnabled: room.rules.nak })
        // for testing
        let outcome = 4
        // let outcome
        // if (room.gamePhase === 'pregame') {
        //   if (room.turn.team === 0) {
        //     outcome = -1
        //   } else {
        //     outcome = -1
        //   }
        // } else if (room.gamePhase === 'game') {
        //   // if (room.turn.team === 0) {
        //   //   outcome = Math.random() > 0.5 ? 5 : 4
        //   // } else {
        //   //   outcome = 1
        //   // }
        //   // outcome = 1
        // }
        const animation = pickAnimation(outcome)
        room.yootOutcome = outcome;
        room.yootAnimation = animation
        room.teams[user.team].throws--

        room.serverEvent = serverEvent
        await room.save();

        // record throw
        setTimeout(async () => {

          try {
            let room = await Room.findOne({ shortId: roomId })  
            let turnStartTimeDelay = 0
            let gameLog // temporary variable
            serverEvent = {
              name: 'recordThrow',
              content: {
                gameLogs: []
              }
            }

            // Add move to team
            if (room.gamePhase === "pregame") {
              room.teams[room.turn.team].pregameRoll = outcome // to pass into 'comparePregameRolls'
              gameLog = {
                logType: 'throw',
                content: {
                  playerName: user.name,
                  team: user.team,
                  move: outcome,
                  bonus: false
                }
              }
              room.gameLogs.push(gameLog)
              serverEvent.content.gameLogs.push(gameLog)
              
              // backdo is greater than nak
              const outcomePregame = comparePregameRolls(room.teams[0].pregameRoll, room.teams[1].pregameRoll)
              if (outcomePregame === "pass") {
                serverEvent.content.prevTeam = room.turn.team
                const [newTurn, pause] = await passTurn(room.turn, room.teams)
                room.turn = newTurn
                room.paused = pause
                room.pregameOutcome = outcomePregame
                room.teams[newTurn.team].throws++
                turnStartTimeDelay += 2 * ALERT_TIME
              } else if (outcomePregame === "tie") {
                const [newTurn, pause] = await passTurn(room.turn, room.teams)
                room.turn = newTurn
                room.paused = pause
                room.pregameOutcome = outcomePregame
                room.teams[0].pregameRoll = null
                room.teams[1].pregameRoll = null
                room.teams[newTurn.team].throws++
                gameLog = {
                  logType: 'pregameResult',
                  content: {
                    team: -1
                  }
                }
                room.gameLogs.push(gameLog)
                serverEvent.content.gameLogs.push(gameLog)
                turnStartTimeDelay += 3 * ALERT_TIME
              } else {
                // 'outcomePregame' is the winning team index
                const [newTurn, pause] = await setTurn(room.turn, outcomePregame, room.teams)
                room.turn = newTurn
                room.paused = pause
                room.pregameOutcome = outcomePregame.toString()
                room.gamePhase = 'game'
                room.teams[outcomePregame].throws++
                gameLog = {
                  logType: 'pregameResult',
                  content: {
                    team: outcomePregame
                  }
                }
                room.gameLogs.push(gameLog)
                serverEvent.content.gameLogs.push(gameLog)
                turnStartTimeDelay += 3 * ALERT_TIME
              }
            } else if (room.gamePhase === "game") {
              room.teams[user.team].moves[outcome]++;

              // Add bonus throw on Yoot and Mo
              if (room.yootOutcome === 4 || room.yootOutcome === 5) {
                room.teams[user.team].throws++;
                gameLog = {
                  logType: 'throw',
                  content: {
                    playerName: user.name,
                    team: user.team,
                    move: outcome,
                    bonus: true
                  }
                }
                room.gameLogs.push(gameLog)
                serverEvent.content.gameLogs.push(gameLog)
              } else {
                gameLog = {
                  logType: 'throw',
                  content: {
                    playerName: user.name,
                    team: user.team,
                    move: outcome,
                    bonus: false
                  }
                }
                room.gameLogs.push(gameLog)
                serverEvent.content.gameLogs.push(gameLog)
              }

              // Call .toObject() on moves to leave out the mongoose methods
              if (room.teams[user.team].throws === 0 && 
              (isEmptyMoves(room.teams[user.team].moves.toObject()) || 
              (!room.rules.backdoLaunch && isBackdoMovesWithoutPieces(room.teams[user.team].moves.toObject(), room.teams[user.team].pieces))) ) {
                const [newTurn, pause] = await passTurn(room.turn, room.teams)
                room.turn = newTurn
                room.paused = pause
                room.teams[user.team].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
                room.teams[newTurn.team].throws++
                turnStartTimeDelay += 2 * ALERT_TIME
              } else {
                turnStartTimeDelay += 1 * ALERT_TIME
              }
            }

            room.turnsSkipped = 0
            room.turnStartTime = Date.now() + turnStartTimeDelay
            room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
            if (room.rules.timer) {
              startTimer(room)
            }
            room.serverEvent = serverEvent
            await room.save()
          } catch (err) {
            console.log(`[throwYut] error recording throw`, err)
          }
        }, 5000)
      }
    } catch (err) {
      console.log(`[throwYut] error on throw yoot`, err)
    }
  })

  // Returns a player that's not away
  async function getNextPlayer(players, indexStart, index) {
    // Base case
    if (index === indexStart) {
      return -1
    } else {
      if (index === players.length) {
        return await getNextPlayer(players, indexStart, 0)
      } else {
        const player = await User.findById(players[index])
        if (player.status === 'playing') {
          return index
        } else {
          return await getNextPlayer(players, indexStart, index+1)
        }
      }
    } 
  }
  
  async function passTurn(currentTurn, teams, sameTeam=false) {
    let currentTeam = currentTurn.team
    let pause = false;

    if (!sameTeam) {
      if (currentTeam === (teams.length - 1)) {
        currentTeam = 0
      } else {
        currentTeam++
      }
    }
  
    if (teams[currentTeam].players.length === 0) {
      pause = true
      currentTurn.players[currentTeam] = 0 // Someone can join the team to play (host can assign to team)
    } else if (teams[currentTeam].players.length === 1) {
      const player = await User.findById(teams[currentTeam].players[0])
      console.log('[passTurn] player, only one in the team', player)
      if (player && player.status !== 'playing') {
        pause = true
      }
      currentTurn.players[currentTeam] = 0
    } else {
      let currentPlayerIndex = currentTurn.players[currentTeam]
      const players = teams[currentTeam].players
      let nextPlayerIndex = await getNextPlayer(players, currentPlayerIndex, currentPlayerIndex+1)
      if (nextPlayerIndex === -1) {
        const currentPlayer = await User.findById(teams[currentTeam].players[currentPlayerIndex])
        if (currentPlayer.status === 'playing') {
          nextPlayerIndex = currentPlayerIndex
        } else {
          pause = true
          if (currentPlayerIndex === players.length-1) {
            nextPlayerIndex = 0
          } else {
            nextPlayerIndex = currentPlayerIndex+1
          }
        }
      }
      currentTurn.players[currentTeam] = nextPlayerIndex
    }
    
    currentTurn.team = currentTeam
    return [currentTurn, pause]
  }

  async function setTurn(currentTurn, team, teams) {
    currentTurn = {
      team: team,
      players: currentTurn.players
    }
    
    let currentTeam = currentTurn.team
    let pause = false;
    if (teams[currentTeam].players.length === 0) {
      pause = true
      currentTurn.players[currentTeam] = 0 // Someone can join the team to play (host can assign to team)
    } else if (teams[currentTeam].players.length === 1) {
      const player = await User.findById(teams[currentTeam].players[0])
      console.log('[passTurn] player, only one in the team', player)
      if (player && player.status !== 'playing') {
        pause = true
      }
      currentTurn.players[currentTeam] = 0
    } else {
      let currentPlayerIndex = currentTurn.players[currentTeam]
      const players = teams[currentTeam].players
      let nextPlayerIndex = await getNextPlayer(players, currentPlayerIndex, currentPlayerIndex+1)
      if (nextPlayerIndex === -1) {
        const currentPlayer = await User.findById(teams[currentTeam].players[currentPlayerIndex])
        if (currentPlayer.status === 'playing') {
          nextPlayerIndex = currentPlayerIndex
        } else {
          pause = true
          if (currentPlayerIndex === players.length-1) {
            nextPlayerIndex = 0
          } else {
            nextPlayerIndex = currentPlayerIndex+1
          }
        }
      }
      currentTurn.players[currentTeam] = nextPlayerIndex
    }

    return [currentTurn, pause]
  }

  // Return the result
  function comparePregameRolls(team0Roll, team1Roll) {
    if ((team0Roll !== null) && (team1Roll !== null)) {
      if (team0Roll === team1Roll) {
        return "tie"
      } else if (team0Roll > team1Roll || team1Roll === 0) {
        return 0
      } else if (team1Roll > team0Roll || team0Roll === 0) {
        return 1
      }
    } else {
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

  function isBackdoMovesWithoutPieces(moves, pieces) {
    if (moves['-1'] === 0) {
      return false;
    }

    for (let i = 0; i < 4; i++) {
      if (tileType(pieces[i].tile) === 'onBoard') {
        return false
      }
    }

    for (const move in moves) {
      if (parseInt(move) !== 0 && parseInt(move) !== -1 && moves[move] > 0) {
        return false;
      }
    }
    
    return true
  }

  socket.on("select", async ({ roomId, selection, legalTiles }) => {
    try {
      await Room.findOneAndUpdate(
        { 
          shortId: roomId, 
          paused: false
        }, 
        { 
          $set: { 
            'selection': selection === 'null' ? null : selection,
            'legalTiles': legalTiles,
            'serverEvent': {
              name: 'select',
              content: {}
            }
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
  
  socket.on('move', async ({ roomId, tile, playerName }) => {
    try {
      const room = await Room.findOne({ shortId: roomId, paused: false })
      if (!room) {
        throw new Error('room with shortId', roomId, 'not found or it is not paused')
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

      // Stop Timer
      clearTimeout(room.timerId)
      room.turnsSkipped = 0
      let turnStartTimeDelay = 0

      let moves = room.teams[movingTeam].moves;
      let throws = room.teams[movingTeam].throws;

      let serverEvent = {
        name: 'move',
        content: {
          moveUsed,
          updatedPieces: [
            // object
            // teamId
            // pieceId
          ],
          updatedTiles: {
            from: {
              index: -1,
              pieces: []
            },
            to: {
              index: null,
              pieces: []
            }
            // fill in indexes of array in SocketManager
          },
          throws: null, // current team if bonus from catch, or next team,
          // new teamId from room.turn.team
          // new playerId from room.turn.players[room.turn.team]
          prevTeam: movingTeam,
          // throws from room.teams[room.turn.team].throws
          gameLogs: [],
        }
      }

      // change throughout the function
      let gameLog = {
        logType: 'move',
        content: {
          playerName,
          team: movingTeam,
          tile,
          numPieces: pieces.length,
          starting
        }
      }
      room.gameLogs.push(gameLog)
      serverEvent.content.gameLogs.push(gameLog)

      // Clear pieces from the 'from' tile if they were on the board
      if (!starting) {
        room.tiles[from] = []
        serverEvent.content.updatedTiles.from.index = from
        serverEvent.content.updatedTiles.from.pieces = [] // will always be empty
      } else {
        turnStartTimeDelay += JUMP_TIME
      }

      // Update moving team's pieces at home
      for (const piece of pieces) {
        room.teams[movingTeam].pieces[piece.id].tile = to
        room.teams[movingTeam].pieces[piece.id].history = history
        room.teams[movingTeam].pieces[piece.id].lastPath = path
        serverEvent.content.updatedPieces.push(piece)
      }

      // Update moving pieces for the tiles
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
            room.teams[occupyingTeam].pieces[piece.id] = piece
            serverEvent.content.updatedPieces.push(piece)
          }
          
          room.tiles[to] = pieces
          serverEvent.content.updatedTiles.to.index = to
          serverEvent.content.updatedTiles.to.pieces = pieces

          if (room.rules.yutMoCatch || !(moveUsed === '4' || moveUsed === '5')) {
            throws++;
          }

          gameLog = {
            logType: "catch",
            content: {
              playerName,
              team: movingTeam,
              caughtTeam: occupyingTeam,
              numPiecesCaught: tiles[to].length,
              path
            }
          }
          room.gameLogs.push(gameLog)
          serverEvent.content.gameLogs.push(gameLog)

          turnStartTimeDelay += (1 * ALERT_TIME)
        } else { // Join pieces
          for (const piece of pieces) {
            room.tiles[to].push(piece)
          }
          serverEvent.content.updatedTiles.to.index = to
          serverEvent.content.updatedTiles.to.pieces = room.tiles[to]
          
          gameLog = {
            logType: "join",
            content: {
              playerName,
              team: movingTeam,
              numPiecesCombined: pieces.length + tiles[to].length,
            }
          }
          room.gameLogs.push(gameLog)
          serverEvent.content.gameLogs.push(gameLog)

          turnStartTimeDelay += (1 * ALERT_TIME)
        }
      } else {
        for (const piece of pieces) {
          room.tiles[to].push(piece)
        }
        serverEvent.content.updatedTiles.to.index = to
        serverEvent.content.updatedTiles.to.pieces = room.tiles[to]
      }

      // Clear legal tiles and selection
      room.legalTiles = {}
      room.selection = null

      moves[moveUsed]--;
      turnStartTimeDelay += (parseInt(Math.abs(moveUsed)) * JUMP_TIME)

      if (throws === 0 && isEmptyMoves(moves.toObject())) {
        const [newTurn, pause] = await passTurn(room.turn, room.teams)
        room.turn = newTurn
        room.paused = pause
        room.teams[movingTeam].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
        room.teams[newTurn.team].throws = 1
        serverEvent.content.throws = 1
        turnStartTimeDelay += (1 * ALERT_TIME)
      } else {
        room.teams[movingTeam].moves = moves
        room.teams[movingTeam].throws = throws // may have an extra throw from catch
        serverEvent.content.throws = throws
      }

      room.serverEvent = serverEvent

      // Start timer
      room.turnStartTime = Date.now() + turnStartTimeDelay
      room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
      if (room.rules.timer) {
        startTimer(room)
      }

      await room.save()
    } catch (err) {
      console.log(`[move] error making move`, err)
    }
  })

  socket.on('score', async ({ roomId, selectedMove, playerName }) => {
    try {
      const room = await Room.findOne({ shortId: roomId })
      if (!room) {
        throw new Error('room with shortId', roomId, 'not found')
      }

      // Stop timer
      clearTimeout(room.timerId)
      let turnStartTimeDelay = 0

      let gameLog
      let serverEvent = {
        name: 'score',
        content: {
          moveUsed: null,
          updatedPieces: [],
          fromTile: -1,
          prevTeam: -1,
          throws: 0,
          gameLogs: [],
          winner: -1 // if 0 or 1, append to 'results' in client
        }
      }
      
      // Update pieces in the team
      const pieces = room.selection.pieces
      const movingTeam = pieces[0].team;
      serverEvent.content.prevTeam = movingTeam
      const history = selectedMove.history
      const path = selectedMove.path
      for (const piece of pieces) {
        room.teams[movingTeam].pieces[piece.id].tile = 29
        room.teams[movingTeam].pieces[piece.id].history = history
        room.teams[movingTeam].pieces[piece.id].lastPath = path
        serverEvent.content.updatedPieces.push(room.teams[movingTeam].pieces[piece.id])
      }
      turnStartTimeDelay += (path.length * JUMP_TIME)

      // Score alert
      turnStartTimeDelay += (1 * ALERT_TIME)
      gameLog = {
        logType: 'score',
        content: {
          playerName,
          team: movingTeam,
          numPiecesScored: room.selection.pieces.length
        }
      }
      room.gameLogs.push(gameLog)
      serverEvent.content.gameLogs.push(gameLog)

      // Update tiles
      let from = room.selection.tile
      room.tiles[from] = []
      serverEvent.content.fromTile = from
      
      // Update moves
      let moves = room.teams[movingTeam].moves;
      moves[selectedMove.move]--;
      serverEvent.content.moveUsed = selectedMove.move

      // Update selection and legal tiles
      room.legalTiles = {}
      room.selection = null

      function winCheck(team) {
        for (const piece of team.pieces) {
          if (piece.tile !== 29) {
            return false
          }
        }
        return true;
      }

      if (winCheck(room.teams[movingTeam])) {
        room.results.push(movingTeam)
        room.gamePhase = 'finished'
        serverEvent.content.winner = movingTeam

        gameLog = {
          logType: 'finish',
          content: {
            winningTeam: movingTeam,
            matchNum: room.results.length
          }
        }
        room.gameLogs.push(gameLog)
        serverEvent.content.gameLogs.push(gameLog)

        room.teams[movingTeam].moves = { ...moves }

        // Stop timer
        clearTimeout(room.timerId)
        room.turnExpireTime = null
      } else {
        // Check if turn should pass
        let throws = room.teams[movingTeam].throws;
        serverEvent.content.throws = throws
        if (throws === 0 && (isEmptyMoves(moves.toObject()) || isBackdoMovesWithoutPieces(moves.toObject(), room.teams[movingTeam].pieces))) { // check backdoLaunch rule
          const [newTurn, pause] = await passTurn(room.turn, room.teams)
          room.turn = newTurn
          room.paused = pause
          room.teams[movingTeam].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
          room.teams[newTurn.team].throws = 1
          serverEvent.content.throws = 1
          turnStartTimeDelay += (1 * ALERT_TIME)
        } else {
          room.teams[movingTeam].moves = moves
        }

        // Start timer
        room.turnsSkipped = 0
        room.turnStartTime = Date.now() + turnStartTimeDelay
        room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
        if (room.rules.timer) {
          startTimer(room)
        }
      }
      
      room.serverEvent = serverEvent
      await room.save()
    } catch (err) {
      console.log(`[score] error scoring piece`, err)
    }
  })

  socket.on('reset', async ({ roomId, clientId }) => {
    try {
      let room = await Room.findOne({ shortId: roomId })
      if (!room) {
        throw new Error('room with short id', roomId, 'not found')
      } else if (room.gamePhase !== 'finished' && room.host._id.valueOf() !== clientId) {
        throw new Error('only host can reset the game')
      } 
      // if (room.gamePhase === 'finished') {
        // let player reset the game
      // } else if (room.gamePhase === 'pregame' || room.gamePhase === 'game' && room.host === clientId) {
        // let host reset the game
      // }

      room.gamePhase = 'lobby'
      room.tiles = [
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
      room.legalTiles = {}
      room.selection = null
      room.pregameOutcome = null
      room.turn = {
        team: -1,
        players: [0, 0]
      }
      // clear team 0
      room.teams[0].pieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam0))
      room.teams[0].throws = 0
      room.teams[0].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
      room.teams[0].pregameRoll = null
      // clear team 1
      room.teams[1].pieces = JSON.parse(JSON.stringify(initialState.initialPiecesTeam1))
      room.teams[1].throws = 0
      room.teams[1].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
      room.teams[1].pregameRoll = null

      room.paused = false

      room.serverEvent = {
        name: 'reset',
        content: {}
      }

      // Stop timer
      clearTimeout(room.timerId)
      room.turnExpireTime = null
      await room.save()
    } catch (err) {
      console.log(`[reset] error resetting game`, err)
    }
  })

  // socket.on("disconnectFromRoom", async ({ roomId }) => {
  //   console.log(`[disconnectFromRoom] ${socket.id} disconnectFromRoom`)
  //   try {

  //     let user = await User.findOne({ 'roomId': roomId, 'socketId': socket.id })

  //     if (user.team === -1) {
  //       user
  //     } else if (user.team === 0 || user.team === 1) {

  //     }
  //       user.connectedToRoom = false

  //     await Room.updateOne(
  //       { 
  //         shortId: roomId
  //       }, 
  //       {
  //         $set: {
  //           'serverEvent': {
  //             name: 'userDisconnect'
  //           }
  //         } 
  //       }
  //     )

  //     console.log(`[disconnectFromRoom] user to disconnect from room`, user)
  //   } catch (err) {
  //     console.log(`[disconnectFromRoom] error disconnecting user from room`, err)
  //   }
  // })

  socket.on("disconnect", async () => {
    console.log(`[disconnect] ${socket.id} disconnect`)
    try {

      let user = await User.findOne({ 'socketId': socket.id })
      if (!user) {
        throw new Error(`user with socket id ${socket.id} not found`)
      }

      let room = await Room.findOne({ shortId: user.roomId })
      // Spectator
      if (user.team === -1) {
        let { deletedCount } = await User.deleteOne({ 'socketId': socket.id })
        if (deletedCount < 1) {
          throw new Error(`user with socket id ${socket.id} wasn't deleted`)
        }
        let removeSpectatorIndex = room.spectators.find((spectator) => spectator.socketId === socket.id)
        room.spectators.splice(removeSpectatorIndex, 1)
        room.serverEvent = {
          name: 'spectatorDisconnect',
          team: -1,
          name: user.name
        }
        await room.save()
      // Player
      } else {
        user.connectedToRoom = false
        if (room.gamePhase === 'lobby') {
          room.serverEvent = {
            name: 'playerDisconnectLobby',
          }
        } else {
          room.serverEvent = {
            name: 'playerDisconnect',
            team: user.team,
            name: user.name
          }
        }
        await user.save()
        await room.save()
      }
    } catch (err) {
      console.log(`[disconnect] error`, err)
    }
  });

  // doubles as 'returned' toggle
  // status: string
  // pass in client id from the client
  // check if it matches the hostId in the room
  // don't store objectId in the client
  socket.on("setAway", async ({ roomId, clientId, name, team, status }, callback) => {
    
    console.log('[setAway] status', status)
    try {
      const room = await Room.findOne({ shortId: roomId })
      if (!room) {
        throw new Error('room with shortId', roomId, 'not found')
      } else if (team !== 0 && team !== 1) {
        throw new Error('cannot set away for spectator')
      }

      if (room.host._id.valueOf() !== clientId) {
        const result = await User.findOneAndUpdate({ _id: clientId, roomId }, { status })
        if (!result) {
          throw new Error('failed update to user', clientId, 'in room', roomId)
        }
      } else {
        // host edit
        const result = await User.findOneAndUpdate({ name, roomId }, { status })
        if (!result) {
          throw new Error('failed update by host to user', name, 'in room', roomId)
        }
      }

      if ((team === 0 || team === 1) && 
      room.turn.team === team && 
      room.teams[team].players.length === 1 && 
      (room.gamePhase === 'pregame' || room.gamePhase === 'game') && 
      status === 'away') {
        room.paused = true
      }
      room.serverEvent = {
        'name': 'setAway',
        'content': {
          'team': team, // 0 or 1, can only be a player
          'name': name,
          'status': status // playing, or away
        }
      }
      await room.save()
      return callback(status)
    } catch (err) {
      console.log(`[setAway] error setting away for player from host`, err)
    }
  })

  // socket.on("setAway", async ({ roomId, userId }) => {
  //   // set away for user matching socket id (not using hostId or userId)
  // })

  // teamId: -1 for spectator, 0 for rockets, 1 for ufo
  socket.on("setTeam", async ({ roomId, clientId, name, currTeamId, newTeamId }, callback) => {
    console.log('[setTeam]')
    try {
      // additional call; will have to do this when I do authentication anyway
      if (!Room.findOne({ shortId: roomId, host: clientId })) {
        throw new Error('room with shortId', roomId, 'and hostId', clientId, 'not found')
      }
      else if (newTeamId !== -1 && newTeamId !== 0 && newTeamId !== 1) {
        throw new Error('unexpected teamId')
      } else if (newTeamId === -1) {
        console.log('[setTeam] player to spectator, roomId', roomId, 'hostId', clientId, 'name', name, 'currTeamId', currTeamId, 'newTeamId', newTeamId)
        // switching into spectator
        const user = await User.findOneAndUpdate({ name, roomId }, { 
          team: newTeamId, 
          status: 'playing' 
        }, { new: true })
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
        return callback('success')
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
        return callback('success')
      }
    } catch (err) {
      console.log(`[setTeam] error setting away for player from host`, err)
      return callback('fail')
    }
  })

  socket.on("assignHost", async ({ roomId, clientId, userId, team, name }, callback) => {
    // check client is the host of the room // findOneAndUpdate (roomId, newValues)
    // check user is not the host of the room
    // set user as the host
      // this removes client from the host
    try {
      await Room.findOneAndUpdate({ shortId: roomId, host: clientId }, {
        '$set': {
          'host': userId,
          'serverEvent': {
            'name': 'assignHost',
            'content': {
              team,
              name
            }
          }
        }
      })
      return callback('success')
    } catch (err) {
      console.log('[assignHost]', err)
      return callback('fail')
    }
  })

  socket.on("kick", async ({ roomId, clientId, team, name }, callback) => {
    // check if client is the host of the room // findOneAndUpdate (roomId, newValues)
    // check if user is connected to the room
    // remove player from player list (team0, team1 or spectators)
    // set player's room to null
    // set 'connectedToRoom' to 'false' on player
    console.log('[kick]')
    try {
      // Check if client is the host of the room
      let room = await Room.findOne({ shortId: roomId, host: clientId })
      if (!room) {
        throw new Error('room with shortId', roomId, 'and hostId', hostId, 'not found')
      }

      const user = await User.findOneAndDelete({ name, roomId })
      if (!user) {
        throw new Error(`user with name ${name} in room ${roomId} not found`)
      }

      io.to(user.socketId).emit("kicked");
  
      // Remove the user from the room
      
      if (team === -1) {
        let spectatorIndex = room.spectators.findIndex((spectator) => {
          return spectator._id.valueOf() === user._id.valueOf()
        })
        if (spectatorIndex === -1) {
          throw new Error(`spectator not found in room ${roomId}`)
        } else {
          room.spectators.splice(spectatorIndex, 1)
        }
      } else {
        let playerIndex = room.teams[team].players.findIndex((player) => {
          return player._id.valueOf() === user._id.valueOf()
        })
        if (playerIndex === -1) {
          throw new Error(`player not found in room ${roomId} team ${team}`)
        } else {
          room.teams[team].players.splice(playerIndex, 1)
        }
      }
      
      room.serverEvent = {
        'name': 'kick',
        'content': {
          team,
          name,
          socketId: user.socketId
        }
      }

      // If player had turn, find the next player on the team
      if (room.gamePhase === 'pregame' || room.gamePhase === 'game') {
        const [nextTurn, pause] = await passTurn(room.turn, room.teams, true)
        room.turn = nextTurn
        room.paused = pause
      }
      
      await room.save()
      return callback('success')
    } catch (err) {
      console.log('[kick] error', err)
      return callback('fail')
    }
  })

  socket.on('pauseGame', async ({ roomId, clientId, flag }) => {
    // check if client is the host of the room // findOneAndUpdate (roomId, newValues)
    // pause game in room
    console.log('[pauseGame]')
    try {
      let room = await Room.findOne({ shortId: roomId, host: clientId })
      if (!room) {
        console.log('[pauseGame] room', roomId, 'not updated')
      }

      room.paused = flag
      // start the timer again
      // when you pause, record time
      if (flag) {
        // record time
        if (room.rules.timer) {
          room.pauseTime = Date.now()
          clearTimeout(room.timerId)
        }
      } else {
        // subtract paused time from current time
        // add to start and expire time
        if (room.rules.timer) {
          if (room.pauseTimerReset) {
            room.turnStartTime = Date.now()
            room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
          } else {
            const passedTime = Date.now() - room.pauseTime
            room.turnStartTime += passedTime
            room.turnExpireTime += passedTime
          }
          room.turnsSkipped = 0
          startTimer(room)
          room.pauseTimerReset = false
        }
      }
      room.serverEvent = {
        'name': 'pause',
        'content': {
          flag
        }
      }
      await room.save()
    } catch (err) {
      console.log('[pauseGame]', err)
    }
  })

  // rules: 'backdo', 'timer'
  socket.on('setGameRule', async ({ roomId, clientId, rule, flag }) => {
    try {
      let room = await Room.findOne({ shortId: roomId, host: clientId })
      if (!room) 
        throw new Error(`room with short id ${roomId} and host ${clientId} not found`)
      else {
        room.rules[rule] = flag
        room.serverEvent = {
          name: 'setGameRule',
          content: {
            rule,
            flag
          }
        }
        if (rule === 'timer') {
          if (flag) {
            if (!room.paused) {
              room.paused = true
              room.pauseTime = Date.now()
              clearTimeout(room.timerId)
            } else {
              room.pauseTimerReset = true
            }
            room.turnStartTime = Date.now()
            room.turnExpireTime = room.turnStartTime + BASE_TURN_EXPIRE_TIME
          } else {
            clearTimeout(room.timerId)
            room.turnExpireTime = null
          }
        }
        await room.save()
      }
    } catch (err) {
      console.log('[setGameRule]', err)
    }
  })
})