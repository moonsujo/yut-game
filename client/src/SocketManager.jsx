import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { io } from "socket.io-client";

import { 
  pregameAlertAtom, 
  clientAtom, 
  disconnectAtom, 
  gamePhaseAtom, 
  hasTurnAtom, 
  helperTilesAtom, 
  hostAtom, 
  initialYootThrowAtom, 
  legalTilesAtom, 
  messagesAtom, 
  particleSettingAtom, 
  pieceTeam0Id0Atom, 
  pieceTeam0Id1Atom, 
  pieceTeam0Id2Atom, 
  pieceTeam0Id3Atom, 
  pieceTeam1Id0Atom, 
  pieceTeam1Id1Atom, 
  pieceTeam1Id2Atom, 
  pieceTeam1Id3Atom, 
  readyToStartAtom, 
  roomAtom, 
  selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, winnerAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom, moveResultAtom, throwResultAtom, throwAlertAtom, turnAlertActiveAtom, animationPlayingAtom, throwCountAtom, gameLogsAtom, yootAnimationAtom, 
  yootOutcomeAtom,
  currentPlayerNameAtom,
  alertsAtom,
  catchOutcomeAtom,
  pieceAnimationPlayingAtom,
  catchPathAtom,
  connectedToServerAtom,
  settingsOpenAtom,
  pauseGameAtom,
  backdoLaunchAtom,
  timerAtom,
  nakAtom,
  yutMoCatchAtom,
  turnExpireTimeAtom,
  resultsAtom,
  turnStartTimeAtom,
  remainingTimeAtom
} from "./GlobalState.jsx";
import { clientHasTurn, isBackdoMovesWithoutPieces, movesIsEmpty } from "./helpers/helpers.js";
import { checkJoin } from "./SocketManagerHelper.js";
import useMeteorsShader from "./shader/meteors/MeteorsShader.jsx";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'
import useMusicPlayer from "./hooks/useMusicPlayer.jsx";
import initialState from "../initialState.js";

// const ENDPOINT = 'localhost:5000';

const ENDPOINT = 'https://yoot-game-6c96a9884664.herokuapp.com/';

export const socket = io(
  ENDPOINT, { 
    query: {
      client: localStorage.getItem('yootGame')
    },
    autoConnect: false,
  },
)

// http://192.168.1.181:3000 //http://192.168.86.158:3000
// export const socket = io("http://192.168.86.158:3000"); // http://192.168.1.181:3000 //http://192.168.86.158:3000
// doesn't work when another app is running on the same port
export const SocketManager = () => {
  const [client, setClient] = useAtom(clientAtom);
  const [teams, setTeams] = useAtom(teamsAtom)
  const [turn, setTurn] = useAtom(turnAtom);
  const [_room] = useAtom(roomAtom);
  const [_messages, setMessages] = useAtom(messagesAtom);
  const [_gameLogs, setGameLogs] = useAtom(gameLogsAtom);
  const [_host, setHost] = useAtom(hostAtom)
  const [_spectators, setSpectators] = useAtom(spectatorsAtom)
  const [_readyToStart, setReadyToStart] = useAtom(readyToStartAtom)
  const [_yootActive, setYootActive] = useAtom(yootActiveAtom)
  const [_disconnect, setDisconnect] = useAtom(disconnectAtom)
  const [_yootThrowValues] = useAtom(yootThrowValuesAtom)
  const [_initialYootThrow] = useAtom(initialYootThrowAtom)
  const [_yootThrown] = useAtom(yootThrownAtom)
  const [_hasTurn, setHasTurn] = useAtom(hasTurnAtom)
  const [_turnAlertActive] = useAtom(turnAlertActiveAtom)
  const [_moveResult] = useAtom(moveResultAtom)
  const [_throwResult] = useAtom(throwResultAtom)
  const [_pregameAlert] = useAtom(pregameAlertAtom)
  const [_throwAlert] = useAtom(throwAlertAtom)

  // Use state to check if the game phase changed
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_selection, setSelection] = useAtom(selectionAtom)
  const [_legalTiles, setLegalTiles] = useAtom(legalTilesAtom)
  const [_helperTiles, setHelperTiles] = useAtom(helperTilesAtom)
  const [_tiles, setTiles] = useAtom(tilesAtom)
  
  // Pieces on the board
  const [_pieceTeam0Id0, setPieceTeam0Id0] = useAtom(pieceTeam0Id0Atom)
  const [_pieceTeam0Id1, setPieceTeam0Id1] = useAtom(pieceTeam0Id1Atom)
  const [_pieceTeam0Id2, setPieceTeam0Id2] = useAtom(pieceTeam0Id2Atom)
  const [_pieceTeam0Id3, setPieceTeam0Id3] = useAtom(pieceTeam0Id3Atom)
  const [_pieceTeam1Id0, setPieceTeam1Id0] = useAtom(pieceTeam1Id0Atom)
  const [_pieceTeam1Id1, setPieceTeam1Id1] = useAtom(pieceTeam1Id1Atom)
  const [_pieceTeam1Id2, setPieceTeam1Id2] = useAtom(pieceTeam1Id2Atom)
  const [_pieceTeam1Id3, setPieceTeam1Id3] = useAtom(pieceTeam1Id3Atom)
  const [_throwCount, setThrowCount] = useAtom(throwCountAtom)
  const [_winner, setWinner] = useAtom(winnerAtom)
  // UI
  const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)

  // animations
  const [_yootAnimation, setYootAnimation] = useAtom(yootAnimationAtom)
  const [_yootOutcome, setYootOutcome] = useAtom(yootOutcomeAtom)
  const [_currentPlayerName, setCurrentPlayerName] = useAtom(currentPlayerNameAtom)
  const [_alerts, setAlerts] = useAtom(alertsAtom)
  const [_catchOutcome] = useAtom(catchOutcomeAtom)
  const [_animationPlaying, setAnimationPlaying] = useAtom(animationPlayingAtom)
  const [_pieceAnimationPlaying, setPieceAnimationPlaying] = useAtom(pieceAnimationPlayingAtom)
  const [_catchPath, setCatchPath] = useAtom(catchPathAtom);
  const [CreateMeteor] = useMeteorsShader();
  const meteorTextures = [
    useLoader(TextureLoader, 'textures/particles/3.png'),
    useLoader(TextureLoader, 'textures/particles/7.png'), // heart
  ] 

  const [playMusic] = useMusicPlayer();
  const setConnectedToServer = useSetAtom(connectedToServerAtom)
  const setSettingsOpen = useSetAtom(settingsOpenAtom);
  const setPauseGame = useSetAtom(pauseGameAtom);
  const setBackdoLaunch = useSetAtom(backdoLaunchAtom);
  const setTimer = useSetAtom(timerAtom)
  const setNak = useSetAtom(nakAtom)
  const [yutMoCatch, setYutMoCatch] = useAtom(yutMoCatchAtom)
  const setTurnStartTime = useSetAtom(turnStartTimeAtom)
  const setTurnExpireTime = useSetAtom(turnExpireTimeAtom)
  const setRemainingTime = useSetAtom(remainingTimeAtom)
  const [results, setResults] = useAtom(resultsAtom)

  useEffect(() => {

    socket.connect();

    socket.on('connect', () => {
      // joinRoom sent first
      console.log('[SocketManager] connect') // runs on complete
      setConnectedToServer(true)
    })
    
    socket.on('connect_error', err => { 
      setDisconnect(true) 
    })

    function findAndStoreClient(spectators, teams) {
      // Find client from users
      let users = teams[0].players.concat(teams[1].players.concat(spectators))

      // Set it in global store and local storage
      for (const user of users) {
        if (user.socketId === socket.id) {
          setClient(user)
          localStorage.setItem('yootGame', JSON.stringify({
            ...user
          }))
        }
      }
    }

    socket.on('room', (room) => {
      setMessages(room.messages)
      setTeams(room.teams)
      setSpectators(room.spectators)

      setPieceTeam0Id0(room.teams[0].pieces[0])
      setPieceTeam0Id1(room.teams[0].pieces[1])
      setPieceTeam0Id2(room.teams[0].pieces[2])
      setPieceTeam0Id3(room.teams[0].pieces[3])
      setPieceTeam1Id0(room.teams[1].pieces[0])
      setPieceTeam1Id1(room.teams[1].pieces[1])
      setPieceTeam1Id2(room.teams[1].pieces[2])
      setPieceTeam1Id3(room.teams[1].pieces[3])

      // Set host name for display
      if (room.host !== null) {
        setHost(room.host)
      }

      findAndStoreClient(room.spectators, room.teams);

      setGamePhase((lastPhase) => {
        if (lastPhase === 'pregame' && room.gamePhase === 'game') {
        } else if (lastPhase === 'finished' && room.gamePhase === 'lobby') {
          // Reset fireworks from win screen
          setParticleSetting(null)
        }
        return room.gamePhase
      });

      const currentTeam = room.turn.team

      // Enable yoot button if client has the turn and his team 
      // has at least one throw and there is a player on the team
      // and the thrown flag is off
      if ((room.gamePhase === "pregame" || room.gamePhase === 'game') && (room.teams[currentTeam].players.length > 0 && 
      clientHasTurn(socket.id, room.teams, room.turn.team, room.turn.players[room.turn.team]) &&
      room.teams[currentTeam].throws > 0)) {
        setYootActive(true)
      } else {
        setYootActive(false)
      }

      // Enable 'Let's play' button
      if (room.gamePhase === 'lobby' && 
      room.teams[0].players.length > 0 && 
      room.teams[1].players.length > 0 &&
      allPlayersConnected(room.teams)) {
        setReadyToStart(true)
      } else {
        setReadyToStart(false)
      }

      setTurn(room.turn)

      if ((room.gamePhase === "pregame" || room.gamePhase === "game") && 
      clientHasTurn(socket.id, room.teams, room.turn.team, room.turn.players[room.turn.team])) {

        setHasTurn(true)

      } else {

        setHasTurn(false)

      }

      setSelection(room.selection)
      setLegalTiles(room.legalTiles)
      let helperTiles = {}
      let legalTiles = room.legalTiles
      let tiles = room.tiles
      let selection = room.selection

      // helper tiles
      for (const legalTile of Object.keys(legalTiles)) {
        let moveInfo;
        if (legalTile !== '29') {
          moveInfo = legalTiles[legalTile]
          
          let helperProps = {
            move: parseInt(moveInfo.move)
          }

          // additional text
          if (tiles[legalTile].length === 0) { // if tile doesn't contain a piece
            helperProps.action = 'move'
          } else if (tiles[legalTile][0].team !== selection.pieces[0].team) {
            helperProps.action = 'catch'
          } else if (tiles[legalTile][0].team === selection.pieces[0].team) {
            helperProps.action = 'join'
          }
          helperTiles[legalTile] = helperProps
        }
      }

      setHelperTiles(helperTiles)

      setTiles(room.tiles)

      // result logic
      if (room.results.length === 0) {
        setWinner(-1)
      } else {
        setWinner(room.results[room.results.length-1])
      }

      if (room.gamePhase === 'pregame' || room.gamePhase === 'game') {
        const turn = room.turn
        setThrowCount(room.teams[turn.team].throws)
      }

      setGameLogs(room.gameLogs)

      setPauseGame(room.paused)

      setBackdoLaunch(room.rules.backdoLaunch)
      setTimer(room.rules.timer)
      setNak(room.rules.nak)
      setYutMoCatch(room.rules.yutMoCatch)
      setTurnStartTime(room.turnStartTime)
      setTurnExpireTime(room.turnExpireTime)
      setAlerts([])
      if (room.paused) {
        setRemainingTime(room.turnExpireTime - room.pauseTime)
      } else {
        setRemainingTime(room.turnExpireTime - Date.now())
      }
      setResults(room.results);
      // don't set pieceAnimation or animation (alerts) playing so that
      // user can throw while timer is running
    })

    socket.on('throwYut', ({ yootOutcome, yootAnimation, throwCount, turnExpireTime }) => {
      setYootOutcome(yootOutcome)
      setYootAnimation(yootAnimation)
      setThrowCount(throwCount)
      setTurnExpireTime(turnExpireTime)
      // const audio = new Audio('sounds/effects/throw.mp3');
      // audio.volume=0.3;
      // audio.play();
    })

    socket.on('gameStart', ({ gamePhase, newTeam, newPlayer, throwCount, turnStartTime, turnExpireTime, newGameLog }) => {
      setGamePhase(gamePhase)
      setTurn(turn => {
        turn.team = newTeam;
        turn.players[turn.team] = newPlayer
        return { ...turn } // must spread the object
      })
      setTeams(teams => {
        const newTeamObj = { ...teams[newTeam] }
        newTeamObj.throws = throwCount
        teams[newTeam] = newTeamObj
        return [...teams];
      })
      setThrowCount(throwCount)
      setAlerts(['gameStart', 'turn'])
      setAnimationPlaying(true);
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setRemainingTime(turnExpireTime - turnStartTime)
      setGameLogs(gameLogs => [...gameLogs, newGameLog])
    })

    // if pregame, could end in a pass, tie or win
    socket.on('passTurn', ({ newTeam, newPlayer, throwCount, turnStartTime, turnExpireTime, content, newGameLogs, gamePhase, paused }) => {
      setTurn(turn => {
        turn.team = newTeam;
        turn.players[turn.team] = newPlayer
        return { ...turn } // must spread the object
      })
      
      let alerts = []
      if (!paused) {
        alerts.push('timesUp')
      }

      setTeams(teams => {
        const newTeamObj = { ...teams[newTeam] }
        newTeamObj.throws = throwCount
        const prevTeam = content.prevTeam
        let prevTeamObj = { ...teams[prevTeam] }
        if (content.pregameOutcome) {
          if (content.pregameOutcome === 'tie') {
            prevTeamObj.pregameRoll = null
            newTeamObj.pregameRoll = null
            alerts.push('pregameTie')
          } else if (content.pregameOutcome === 'pass') { // pass or winner decided
            prevTeamObj.pregameRoll = 0
          } else {
            prevTeamObj.pregameRoll = 0
            if (prevTeam === 0) {
              alerts.push('pregameUfosWin')
            } else {
              alerts.push('pregameRocketsWin')
            }
          }
        } else {
          prevTeamObj.moves = JSON.parse(JSON.stringify(initialState.initialMoves))
          prevTeamObj.throws = 0
        }
        teams[prevTeam] = prevTeamObj
        teams[newTeam] = newTeamObj
        return [...teams];
      })

      if (!paused) {
        alerts.push('turn')
        setAlerts(alerts)
        setAnimationPlaying(true);
      }
      setGamePhase(gamePhase)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setSelection(null)
      setLegalTiles({})
      setHelperTiles({})
      setPauseGame(paused)
    })

    socket.on('recordThrow', ({ teams, gamePhaseUpdate, turnUpdate, pregameOutcome, yootOutcome, newGameLogs, turnStartTime, turnExpireTime }) => {    
      setTeams(teams) // only update the throw count of the current team
      // this invocation is within a useEffect
      // 'gamePhase' state is saved as the one loaded in component load because there's no dependency
      let gamePhasePrev;
      setGamePhase((prev) => {
        gamePhasePrev = prev;
        return gamePhaseUpdate
      })
      let turnPrev;
      setTurn((prev) => {
        turnPrev = prev;
        return turnUpdate
      })

      const currentPlayerName = teams[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
      setCurrentPlayerName(currentPlayerName)

      setYootOutcome(yootOutcome)
      
      if (gamePhaseUpdate === 'pregame') {
        let yootOutcomeAlertName;
        if (yootOutcome === 4 || yootOutcome === 5) {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}Pregame`
        } else {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        }
        if (pregameOutcome === 'pass') {
          setAlerts([yootOutcomeAlertName, 'turn'])
          setThrowCount(teams[turnUpdate.team].throws)
        } else if (pregameOutcome === 'tie') {
          setAlerts([yootOutcomeAlertName, 'pregameTie', 'turn'])
          setThrowCount(teams[turnUpdate.team].throws)
        }
      } else if (gamePhasePrev === 'pregame' && gamePhaseUpdate === 'game') {
        let yootOutcomeAlertName;
        if (yootOutcome === 4 || yootOutcome === 5) {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}Pregame`
        } else {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        }
        if (pregameOutcome === '0') { // changes from int to string
          setAlerts([yootOutcomeAlertName, 'pregameRocketsWin', 'turn'])
          setThrowCount(teams[turnUpdate.team].throws)
        } else if (pregameOutcome === '1') {
          setAlerts([yootOutcomeAlertName, 'pregameUfosWin', 'turn'])
          setThrowCount(teams[turnUpdate.team].throws)
        }
      } else if (gamePhaseUpdate === 'game') {
        let yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        if ((yootOutcome === 0 || yootOutcome === -1) && teams[turnPrev.team].throws === 0 && movesIsEmpty(teams[turnPrev.team].moves)) {
          setAlerts([yootOutcomeAlertName, 'turn']) // add 'no available moves' alert
          // server determines if turn was skipped
        } else {
          if (yootOutcome === 4) {
            const audio = new Audio('sounds/effects/yut.wav');
            audio.volume=0.3;
            audio.play();
          }
          setAlerts([yootOutcomeAlertName])
        }
        setThrowCount(teams[turnUpdate.team].throws)

        // meteor effect (alert)
        if (yootOutcome === 4 || yootOutcome === 5) {
          const numMeteors = 10;
          for (let i = 0; i < numMeteors; i++) {
            const count = Math.round(400 + Math.random() * 1000);
            const position = new THREE.Vector3(
              0, 
              1,
              0, 
            )
            const size = 0.4 + Math.random() * 0.02
            const texture = meteorTextures[Math.floor(Math.random() * meteorTextures.length)]
            const color = new THREE.Color();
            color.setHSL(0.06, 1.0, 0.5)
            setTimeout(() => {
              CreateMeteor({
                count,
                position,
                size,
                texture,
                color
              })
            }, i * 300)
          }
        }
      }

      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setAnimationPlaying(true)
      setYootAnimation(null)
      setHasTurn(clientHasTurn(socket.id, teams, turnUpdate.team, turnUpdate.players[turnUpdate.team]))
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
    })

    function calculateNumPiecesCaught(piecesPrev, piecesUpdate) {
      let numPiecesCaught = 0;
      for (let i = 0; i < 4; i++) {
        if (piecesUpdate[i].tile === -1 && piecesPrev[i].tile !== -1) {
          numPiecesCaught++;
        }
      }
      return numPiecesCaught;
    }

    socket.on('move', ({ newTeam, prevTeam, newPlayer, moveUsed, updatedPieces, updatedTiles, throws, newGameLogs, turnStartTime, turnExpireTime }) => {
      // instead of teamsUpdate and tiles, receive updatedPieces and updatedTiles
      // check if moves is empty. if it is, clear it
      // clear legalTiles and selection
      let alerts = []

      let piecesCurrentTeam = []
      let piecesEnemyTeam = []
      setTeams(teams => {
        // Update pieces
        for (const piece of updatedPieces) {
          teams[piece.team].pieces[piece.id] = piece
          teams[piece.team].pieces[piece.id].history = [...piece.history]
          teams[piece.team].pieces[piece.id].lastPath = [...piece.lastPath]
          if (piece.team === 0 && piece.id === 0)
            setPieceTeam0Id0(piece)
          else if (piece.team === 0 && piece.id === 1)
            setPieceTeam0Id1(piece)
          else if (piece.team === 0 && piece.id === 2)
            setPieceTeam0Id2(piece)
          else if (piece.team === 0 && piece.id === 3)
            setPieceTeam0Id3(piece)
          else if (piece.team === 1 && piece.id === 0)
            setPieceTeam1Id0(piece)
          else if (piece.team === 1 && piece.id === 1)
            setPieceTeam1Id1(piece)
          else if (piece.team === 1 && piece.id === 2)
            setPieceTeam1Id2(piece)
          else if (piece.team === 1 && piece.id === 3)
            setPieceTeam1Id3(piece)

          // for catch
          if (newTeam === prevTeam) {
            if (piece.team === newTeam) 
              piecesCurrentTeam.push(piece)
            else
              piecesEnemyTeam.push(piece)
          }
        }
        
        // Update throws
        teams[newTeam].throws = throws
        setThrowCount(throws)

        // Update moves
        if (newTeam !== prevTeam) {
          teams[prevTeam].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
        } else {
          teams[prevTeam].moves[moveUsed]--
        }
      
        // Update current player's name
        const currentPlayerName = teams[newTeam].players[newPlayer].name
        setCurrentPlayerName(currentPlayerName)

        return [...teams]
      })

      setTiles(tiles => {

        // Join
        const movingTeam = prevTeam
        const to = updatedTiles.to.index
        console.log('[move] to', to, 'movingTeam', movingTeam, 'tiles[to]', tiles[to])
        if (tiles[to].length > 0 && tiles[to][0].team === movingTeam) {
          alerts.push(`join${movingTeam}${to}`)
        }

        let newTiles = [...tiles]
        const from = updatedTiles.from.index
        newTiles[to] = []
        for (let i = 0; i < updatedTiles.to.pieces.length; i++) {
          const newPiece = {
            ...updatedTiles.to.pieces[i],
            history: updatedTiles.to.pieces[i].history,
            lastPath: updatedTiles.to.pieces[i].lastPath
          }
          newTiles[to].push(newPiece)
        }

        if (from !== -1) // true if piece is starting
          newTiles[from] = []
        return newTiles
      })
      
      // Catch
      if (piecesEnemyTeam.length > 0) {
        const enemyTeamId = piecesEnemyTeam[0].team
        alerts.push(`catch${enemyTeamId}${piecesEnemyTeam.length}`)
        setCatchPath(newGameLogs[newGameLogs.length-1].content.path)
      }

      setTurn((turn) => {
        let newTurn = {
          team: newTeam,
          players: [...turn.players]
        }
        if (turn.team !== newTeam) {
          alerts.push('turn')
        }
        newTurn.players[newTeam] = newPlayer
        return newTurn
      })

      setAlerts(alerts)
      setAnimationPlaying(true)
      setPieceAnimationPlaying(true)
      // Turn could have changed
      setHasTurn(clientHasTurn(socket.id, teams, newTeam, newPlayer))
      setLegalTiles({})
      setHelperTiles({})
      setSelection(null)
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
    })

    function calculateNumPiecesScored(piecesPrev, piecesUpdate) {
      let numPiecesScored = 0;
      for (let i = 0; i < 4; i++) {
        if (piecesUpdate[i].tile === 29 && piecesPrev[i].tile !== 29) {
          numPiecesScored++;
        }
      }
      return numPiecesScored;
    }

    socket.on('score', ({ teamsUpdate, turnUpdate, legalTiles, tiles, newGameLogs, selection, gamePhase, results, turnStartTime, turnExpireTime }) => {
      let teamsPrev;
      setTeams((prev) => {
        teamsPrev = prev;
        return teamsUpdate
      })
      let turnPrev;
      setTurn((prev) => {
        turnPrev = prev;
        return turnUpdate
      })
      
      const currentPlayerName = teamsUpdate[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
      setCurrentPlayerName(currentPlayerName)
      
      if (gamePhase !== 'finished') {
        const alerts = []
        const scoringTeamPiecesPrev = teamsPrev[turnPrev.team].pieces;
        const scoringTeamPiecesUpdate = teamsUpdate[turnPrev.team].pieces
        let numPiecesScored = calculateNumPiecesScored(scoringTeamPiecesPrev, scoringTeamPiecesUpdate)
        alerts.push(`score${turnPrev.team}${numPiecesScored}`)
  
        if (turnPrev.team !== turnUpdate.team) {
          alerts.push('turn')
          setThrowCount(teamsUpdate[turnUpdate.team].throws)
        }
        
        setAlerts(alerts)
        setAnimationPlaying(true)
        setPieceAnimationPlaying(true)
      }

      setHelperTiles({})
      // whenever turn could have changed
      setHasTurn(clientHasTurn(socket.id, teamsUpdate, turnUpdate.team, turnUpdate.players[turnUpdate.team]))
      setLegalTiles(legalTiles)
      setTiles(tiles)
      setPieceTeam0Id0(teamsUpdate[0].pieces[0])
      setPieceTeam0Id1(teamsUpdate[0].pieces[1])
      setPieceTeam0Id2(teamsUpdate[0].pieces[2])
      setPieceTeam0Id3(teamsUpdate[0].pieces[3])
      setPieceTeam1Id0(teamsUpdate[1].pieces[0])
      setPieceTeam1Id1(teamsUpdate[1].pieces[1])
      setPieceTeam1Id2(teamsUpdate[1].pieces[2])
      setPieceTeam1Id3(teamsUpdate[1].pieces[3])
      setSelection(selection)
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setGamePhase(gamePhase)
      setWinner(results[results.length-1])
      setThrowCount(teamsUpdate[turnUpdate.team].throws)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
    })

    socket.on("select", ({ selection, legalTiles }) => { //receive
      // handle
      setSelection(selection)
      setLegalTiles(legalTiles)
      // calculate helper tile in server to prevent passing 'tiles'
      
      let helperTiles = {}

      // helper tiles
      for (const legalTile of Object.keys(legalTiles)) {
        if (legalTile !== '29') {
          let moveInfo = legalTiles[legalTile]
          helperTiles[legalTile] = parseInt(moveInfo.move)
        }
      }

      setHelperTiles(helperTiles)
    })

    // emitted to other clients when a client joins
    socket.on("joinRoom", ({ spectators, teams, host, gamePhase }) => {
      setSpectators(spectators);
      setTeams(teams);
      setHost(host);

      findAndStoreClient(spectators, teams)
      
      if (gamePhase === 'lobby' && 
        teams[0].players.length > 0 && 
        teams[1].players.length > 0 &&
        allPlayersConnected(teams)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })
    
    socket.on("joinTeam", ({ spectators, teams, gamePhase, host, turn }) => {
      setSpectators(spectators)
      setTeams(teams);
      setHost(host);
      if (gamePhase === 'pregame' || gamePhase === 'game') {
        setThrowCount(teams[turn.team].throws)
      }
      
      findAndStoreClient(spectators, teams)
      
      if (gamePhase === 'lobby' && 
        teams[0].players.length > 0 && 
        teams[1].players.length > 0 &&
        allPlayersConnected(teams)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })

    socket.on("reset", () => {
      setGamePhase('lobby');
      setTiles(initialState.initialTiles);
      setTurn(initialState.initialTurn);
      setLegalTiles({})
      setSelection(null)

      setTeams((teams) => {
        const newTeams = [...teams] // make shallow copy
        newTeams[0].pieces = JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces))
        newTeams[0].throws = 0
        newTeams[0].moves = JSON.parse(JSON.stringify(initialState.initialTeams[0].moves)),
        newTeams[0].pregameRoll = null
        newTeams[1].pieces = JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces))
        newTeams[1].throws = 0
        newTeams[1].moves = JSON.parse(JSON.stringify(initialState.initialTeams[1].moves)),
        newTeams[1].pregameRoll = null
        
        if (teams[0].players.length > 0 && 
          teams[1].players.length > 0 &&
          allPlayersConnected(teams)) {
            setReadyToStart(true)
          } else {
            setReadyToStart(false)
          }

        return newTeams;
      })

      setPieceTeam0Id0(JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[0])))
      setPieceTeam0Id1(JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[1])))
      setPieceTeam0Id2(JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[2])))
      setPieceTeam0Id3(JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[3])))
      setPieceTeam1Id0(JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[0])))
      setPieceTeam1Id1(JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[1])))
      setPieceTeam1Id2(JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[2])))
      setPieceTeam1Id3(JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[3])))

      setTurnExpireTime(null)
    })

    socket.on("setAway", ({ player }) => {
      setTeams((teams) => {
        const newTeams = [...teams] // make shallow copy
        const newPlayers = [...newTeams[player.team].players]; // make shallow copy of nested array
        const awayPlayerIndex = newPlayers.findIndex((currentPlayer) => currentPlayer.name === player.name)
        newPlayers[awayPlayerIndex].status = player.status
        newTeams[player.team] = {
          ...newTeams[player.team],
          players: newPlayers
        }
        return newTeams;
      })

      setClient((client) => {
        if (player.name === client.name && player.team === client.team) {
          const newClient = {
            ...client,
            status: player.status
          }
          return newClient
        }
        return client
      })
    })

    socket.on("setTeam", ({ user, prevTeam }) => {
      setSpectators((spectators) => {
        const newSpectators = [...spectators]
        if (prevTeam === -1) {
          const changingSpectatorIndex = newSpectators.findIndex((spectator) => spectator.name === user.name)
          newSpectators.splice(changingSpectatorIndex, 1);
        } else if (prevTeam === 0 || prevTeam === 1) {
          newSpectators.push(user);
        }
        return newSpectators
      })
      setTeams((teams) => {
        const newTeams = [...teams]
        if (prevTeam === -1) { // add to a team
          const newPlayers = [...newTeams[user.team].players];
          newPlayers.push(user)
          newTeams[user.team] = {
            ...newTeams[user.team],
            players: newPlayers
          }
        } else if (prevTeam === 0 || prevTeam === 1) { // remove from a team
          const newPlayers = [...newTeams[prevTeam].players];
          const changingPlayerIndex = newPlayers.findIndex((player) => player.name === user.name)
          newPlayers.splice(changingPlayerIndex, 1);

          newTeams[prevTeam] = {
            ...newTeams[prevTeam],
            players: newPlayers
          }
        }
        return newTeams
      })
      if (user.socketId === socket.id) {
        setClient(user)
      }
      setHost((host) => {
        if (user.socketId === host.socketId) {
          return user
        }
        return host
      })
    })

    socket.on("assignHost", ({ newHost }) => {
      if (newHost.team !== -1) {
        // use the setter to access the latest state.
        // if I use the one from the outside, players arrays are empty
        setTeams((teams) => { 
          const newHostIndex = teams[newHost.team].players.findIndex((player) => player.name === newHost.name)
          setHost(JSON.parse(JSON.stringify(teams[newHost.team].players[newHostIndex])))
          return teams
        })
      } else {
        setSpectators((spectators) => { 
          const newHostIndex = spectators.findIndex((spectator) => spectator.name === newHost.name)
          setHost(JSON.parse(JSON.stringify(spectators[newHostIndex])))
          return spectators
        })
      }
    })

    socket.on("kick", ({ team, name }) => {
      if (team === -1) {
        // use the setter to access the latest state.
        // if I use the one from the outside, players arrays are empty
        setSpectators((spectators) => {
          const newSpectators = [...spectators]
          const changingSpectatorIndex = newSpectators.findIndex((spectator) => spectator.name === name)
          newSpectators.splice(changingSpectatorIndex, 1);
          return newSpectators
        })
      } else if (team === 0 || team === 1) {
        setTeams((teams) => {
          const newTeams = [...teams]
          const newPlayers = [...newTeams[team].players];
          const changingPlayerIndex = newPlayers.findIndex((player) => player.name === name)
          newPlayers.splice(changingPlayerIndex, 1);
          newTeams[team] = {
            ...newTeams[team],
            players: newPlayers
          }
          // check if you have the turn
          // setHasTurn(clientHasTurn(socket.id, teams, turn))
          return newTeams
        })
      }
    })

    socket.on("pause", ({ flag, turnStartTime, turnExpireTime }) => {
      setPauseGame(flag)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setRemainingTime(turnExpireTime - Date.now())
    })

    socket.on("userDisconnect", ({ spectators, teams, gamePhase, host }) => {
      setSpectators(spectators)
      setTeams(teams);
      setHost(host);
      
      if (gamePhase === 'lobby' && 
        teams[0].players.length > 0 && 
        teams[1].players.length > 0&&
        allPlayersConnected(teams)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })

    socket.on('kicked', () => {
      setSettingsOpen(false)
      setDisconnect(true);

      localStorage.removeItem('yootGame')
    })

    socket.on('setGameRule', ({ rule, flag, turnStartTime, turnExpireTime, paused }) => {
      if (rule === 'backdoLaunch') {
        setBackdoLaunch(flag)
      } else if (rule === 'timer') {
        setTimer(flag)
        if (flag) {
          setTurnStartTime(turnStartTime)
          setRemainingTime(turnExpireTime - turnStartTime)
          setPauseGame(paused)
        }
        setTurnExpireTime(turnExpireTime)
      } else if (rule === 'nak') {
        setNak(flag)
      } else if (rule === 'yutMoCatch') {
        setYutMoCatch(flag)
      }
    })

    socket.on('disconnect', () => {
      console.log('[SocketManager][disconnect]') // runs on component unmount
      setSettingsOpen(false)
      setDisconnect(true);
    })

    return () => {
      socket.disconnect()
      console.log('[SocketManager][useEffect][disconnected]')

      socket.off();
    }
  }, [])

  useEffect(() => {
    if (turn.team !== -1) {
      const currentPlayerName = teams[turn.team].players[turn.players[turn.team]].name
      setCurrentPlayerName(currentPlayerName)
      setHasTurn(client.team === turn.team)
    }
  }, [turn])

  // use this to watch for updates from no-dependency useEffect
  // yut button didn't activate on gameStart
  // start timer
  useEffect(() => {
    console.log('[useEffect] turn', turn, 'client', client)
    if (turn && turn.team !== -1 && client) {
      if (teams[turn.team].players[turn.players[turn.team]].socketId === client.socketId) {
        setHasTurn(true)
      }
    }
  }, [turn, client])
};

/**
 * 
 * @param {object} teams 
 * @returns boolean indicating whether all players are connected to the room
 */
function allPlayersConnected(teams) {
  let flag = true;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < teams[i].players.length; j++) {
      if (!teams[i].players[j].connectedToRoom) {
        flag = false
      }
    }
  }
  return flag
}