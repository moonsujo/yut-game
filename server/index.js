import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import router from './router.js'; // needs .js suffix
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ObjectId } from 'bson';
import mongoose from 'mongoose';
import { makeId } from '../client/src/helpers/helpers.js';
import { addRoom, addSpectator, getUserFromRoom, getThrown, addPlayer, getRoom, removeUserFromRoom, countPlayers, deleteRoom, addThrow, getHostId, updateGamePhase, getCurrentPlayerId, getGamePhase, isReadyToStart, updateThrown, getTeams, getTurn, updateTeams, addMove, updateTurn, updateLegalTiles, getLegalTiles, movesIsEmpty, passTurnPregame, passTurn, clearMoves, updateSelection, getTiles, updateTiles, getSelection, getThrows, bothTeamsHavePlayers, makeMove, score, countPlayersTeam, joinTeam, won, resetGame, getNameById, assignHost } from './rooms.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: [
    //   // "https://master.dh445c3qmwe4t.amplifyapp.com",
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
    _id: String, //socketId
    name: String,
    roomId: String,
    team: Number
  },
  {
    versionKey: false,
  }
)
const roomSchema = new mongoose.Schema(
  {
    _id: String,
    createdTime: Date,
    // spectators and players into 'users'
    // display by section by filtering in UI
    // spectator team: null
    users: {
      type: Map,
      of: userSchema
    },
    messages: [{
      _id: false,
      name: String,
      text: String
    }],
    host: {
      id: String,
      name: String
    },
    yootThrown: Boolean
  },
  {
    versionKey: false,
    minimize: false
  }
)

const Room = mongoose.model('rooms', roomSchema)
const roomStream = Room.watch([], { fullDocument: 'updateLookup' })


// in the client, if client's socket id is the host's id
// if there is a player in team 0 and a player in team 1
// show 'let's play' button

// yoot throw
// if thrown and client disconnects
// display a button to claim turn for other players on his team
// mark player's name as disconnected
  // check for existing player by matching the name on rejoin
// on return
// if thrown
  // add a throw
  // reset flag on record result
io.on("connect", async (socket) => { // socket.handshake.query is data obj

    connectMongo().catch(err => console.log('mongo connect error', err))
    let roomIdSocket;

    socket.on("createRoom", async ({ id }, callback) => {
      console.log('[createRoom]')
      try {
        const room = new Room({ 
          _id: id,
          createdTime: new Date(),
          users: {},
          messages: [],
          host: {
            id: '',
            name: ''
          }
        })
        await room.save();
        console.log('[createRoom] room saved', room)
        return callback({ roomId: id })
      } catch (err) {
        if (err.errorResponse.code === 11000) {
          console.log(`[createRoom] room ${id} already exists`)
          return callback({ roomId: id })
        } else {
          return callback({ roomId: id, error: err.message })
        }
      }
    })

    socket.on("joinRoom", async ({ roomId, savedClient }, callback) => {
      console.log("[joinRoom] room", roomId, "socket", socket.id, "savedClient", savedClient)
      if (savedClient !== null) {
        savedClient = JSON.parse(savedClient)
      }
      roomIdSocket = roomId;
      roomStream.on('change', data => {
        if (data.documentKey._id === roomId) {
          // console.log('[joinRoom] room stream change detected', data)
          socket.emit('room', data.fullDocument)
        }
      })
      
      let room;
      try {
        room = await Room.findById(roomId).exec();
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }

      let user;
      if (savedClient !== null && room._id === savedClient.roomId) {
        user = {
          ...savedClient,
          _id: socket.id,
          roomId,
        }
      } else {
        let name = makeId(10)
        user = {
          name,
          _id: socket.id,
          roomId,
          team: -1
        }
      }
      console.log(`[joinRoom] user.name ${user.name}`)

      // set user
      try {
        room.users.set(socket.id, user)
        await room.save();
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }

      // assign host
      try {
        console.log(`[joinRoom] host`, room.host)
        console.log(`[joinRoom] user`, user)
        // if host disconnects, assign it to another player in the room
        // if there's no one, don't assign it to anyone
        // on join, if there's no host, assign it to the player
        if (room.host.id === '' && room.host.name === '') {
          room.host.id = socket.id
          room.host.name = user.name
        } else if (savedClient !== null && room.host.name === savedClient.name) {
          room.host.id = socket.id
        }
        await room.save();
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }

      try {
        const message = {
          name: 'admin',
          text: `${user.name} entered the room`
        }
        room.messages.push(message)
        await room.save();
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }

      return callback({ joinRoomId: roomId, user })
    })

    // roomId is from [client] in client
    socket.on("joinTeam", async ({ team, name, roomId }, callback) => {
      let userNameOld;
      let player;
      try {
        let room = await Room.findById(roomId).exec();
        userNameOld = room.users.get(socket.id).name
        try {
          player = {
            team,
            name,
            roomId,
            _id: socket.id
          }
          room.users.set(socket.id, player);
          await room.save();
        } catch (err) {
          return callback({ joinRoomId: roomId, error: err.message })
        }

        // change host name to new one
        if (room.host.name === userNameOld) {
          try {
            room.host.name = name
            await room.save();
          } catch (err) {
            return callback({ joinRoomId: roomId, error: `while saving new host name, error: ${err.message}`})
          }
        }
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
  
      try {
        let room = await Room.findById(roomId).exec();
        const message = {
          name: 'admin',
          text: `${name} (${userNameOld}) has joined ${team === 0 ? "the Rockets" : "the UFOs"}!`
        }
        room.messages.push(message)
        await room.save();
        return callback({ joinRoomId: roomId, player })
      } catch (err) {
        return callback({ joinRoomId: roomId, error: err.message })
      }
    })

    socket.on("sendMessage", async ({ message, roomId }, callback) => {
      try {
        let room = await Room.findById(roomId).exec();
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

    // save roomId on connect
    // use socket info from current connection
    socket.on("disconnect", async () => {
      console.log(`${socket.id} disconnect from room ${roomIdSocket}`)

      let userName = '';
      try {
        let room = await Room.findById(roomIdSocket).exec();
        userName = room.users.get(socket.id).name
        room.users.set(socket.id, undefined)
        await room.save();
      } catch (err) {
        console.log(`[disconnect] socket ${socket.id} disconnecting from room ${roomIdSocket} error`, err)
      }

      try {
        let room = await Room.findById(roomIdSocket).exec();
        const message = {
          name: 'admin',
          text: `${userName} left the room.`
        }
        room.messages.push(message)
        await room.save();
      } catch (err) {
        console.log('[disconnect] error sending message', err)
      }
    });
})