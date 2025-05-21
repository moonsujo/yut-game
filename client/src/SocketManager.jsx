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
  selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, winnerAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom, moveResultAtom, throwResultAtom, throwAlertAtom, turnAlertActiveAtom, throwCountAtom, gameLogsAtom, yootAnimationAtom, 
  yootOutcomeAtom,
  currentPlayerNameAtom,
  alertsAtom,
  catchOutcomeAtom,
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
  remainingTimeAtom,
  yootAnimationPlayingAtom,
  pieceTeam0Id0AnimationPlayingAtom,
  pieceTeam0Id1AnimationPlayingAtom,
  pieceTeam0Id2AnimationPlayingAtom,
  pieceTeam0Id3AnimationPlayingAtom,
  pieceTeam1Id0AnimationPlayingAtom,
  pieceTeam1Id1AnimationPlayingAtom,
  pieceTeam1Id2AnimationPlayingAtom,
  pieceTeam1Id3AnimationPlayingAtom,
  showFinishMovesAtom,
  showBonusAtom,
  bonusExistsAtom,
  lastYutAtom
} from "./GlobalState.jsx";
import { clientHasTurn, movesIsEmpty } from "./helpers/helpers.js";
import useMeteorsShader from "./shader/meteors/MeteorsShader.jsx";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'
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
  const [_yootThrowValues] = useAtom(yootThrowValuesAtom)
  const [_initialYootThrow] = useAtom(initialYootThrowAtom)
  const [_yootThrown] = useAtom(yootThrownAtom)
  const [hasTurn, setHasTurn] = useAtom(hasTurnAtom)
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
  
  const setPieceTeam0Id0AnimationPlaying = useSetAtom(pieceTeam0Id0AnimationPlayingAtom)
  const setPieceTeam0Id1AnimationPlaying = useSetAtom(pieceTeam0Id1AnimationPlayingAtom)
  const setPieceTeam0Id2AnimationPlaying = useSetAtom(pieceTeam0Id2AnimationPlayingAtom)
  const setPieceTeam0Id3AnimationPlaying = useSetAtom(pieceTeam0Id3AnimationPlayingAtom)
  const setPieceTeam1Id0AnimationPlaying = useSetAtom(pieceTeam1Id0AnimationPlayingAtom)
  const setPieceTeam1Id1AnimationPlaying = useSetAtom(pieceTeam1Id1AnimationPlayingAtom)
  const setPieceTeam1Id2AnimationPlaying = useSetAtom(pieceTeam1Id2AnimationPlayingAtom)
  const setPieceTeam1Id3AnimationPlaying = useSetAtom(pieceTeam1Id3AnimationPlayingAtom)
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
  const setYootAnimationPlaying = useSetAtom(yootAnimationPlayingAtom)
  const [_catchPath, setCatchPath] = useAtom(catchPathAtom);
  const [CreateMeteor] = useMeteorsShader();
  const meteorTextures = [
    useLoader(TextureLoader, '/textures/particles/3.png'),
    useLoader(TextureLoader, '/textures/particles/7.png'), // heart
  ] 

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
  const setShowFinishMoves = useSetAtom(showFinishMovesAtom)
  const [bonusExists, setBonusExists] = useAtom(bonusExistsAtom)
  const setShowBonus = useSetAtom(showBonusAtom)
  const [lastYut, setLastYut] = useAtom(lastYutAtom)

  useEffect(() => {

    socket.connect();

    socket.on('connect', () => {
      // joinRoom sent first
      console.log('[SocketManager] connect') // runs on complete
      setConnectedToServer(true)
    })
    
    socket.on('connect_error', err => { 
      setConnectedToServer(false) 
    })

    // Set client info in global store and local storage
    function findAndStoreClient(spectators, playersTeam0, playersTeam1) {

      for (const spectator of spectators) {
        if (spectator.socketId === socket.id) {
          setClient(spectator)
          localStorage.setItem('yootGame', JSON.stringify({
            ...spectator
          }))
          return
        }
      }

      for (const player of playersTeam0) {
        if (player.socketId === socket.id) {
          setClient(player)
          localStorage.setItem('yootGame', JSON.stringify({
            ...player
          }))
          return
        }
      }

      for (const player of playersTeam1) {
        if (player.socketId === socket.id) {
          setClient(player)
          localStorage.setItem('yootGame', JSON.stringify({
            ...player
          }))
          return
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

      findAndStoreClient(room.spectators, room.teams[0].players, room.teams[1].players);

      setGamePhase((lastPhase) => {
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
      allPlayersConnected(room.teams[0].players, room.teams[1].players)) {
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

    socket.on('throwYut', ({ yootOutcome, yootAnimation, throwCount, turnExpireTime, paused }) => {
      setYootOutcome(yootOutcome)
      setYootAnimation(yootAnimation)
      setThrowCount(throwCount)
      setTurnExpireTime(turnExpireTime)
      setYootAnimationPlaying(true)
      setPauseGame(paused)
      if (throwCount < 1) {
        setBonusExists(false)
      }
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
      setYootOutcome(null)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setRemainingTime(turnExpireTime - turnStartTime)
      setGameLogs(gameLogs => [...gameLogs, newGameLog])
      setBonusExists(false)
    })

    socket.on('passTurn', ({ newTeam, newPlayer, throwCount, turnStartTime, turnExpireTime, content, newGameLogs, gamePhase, paused }) => {
      setTurn(turn => {
        turn.team = newTeam;
        turn.players[turn.team] = newPlayer
        return { ...turn } // must spread the object
      })
      
      let alerts = []
      // if (!paused) {
      //   alerts.push('timesUp')
      // }

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

        setYootOutcome(null)
      }
      setGamePhase(gamePhase)
      setThrowCount(throwCount)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setSelection(null)
      setLegalTiles({})
      setHelperTiles({})
      setPauseGame(paused)
    })

    socket.on('recordThrow', ({ teams, gamePhaseUpdate, turnUpdate, pregameOutcome, yootOutcome, newGameLogs, turnStartTime, turnExpireTime, paused }) => {    
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

      if (teams[turnUpdate.team].players.length > 0) {
        const currentPlayerName = teams[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
        setCurrentPlayerName(currentPlayerName)
      } else {
        setCurrentPlayerName('')
      }

      if (gamePhaseUpdate === 'pregame') {
        let yootOutcomeAlertName;
        if (yootOutcome === 4 || yootOutcome === 5) {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}Pregame`
        } else {
          yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        }
        if (pregameOutcome === 'pass') {
          let alerts = [yootOutcomeAlertName]
          teams[turnUpdate.team].players.length > 0 && alerts.push('turn')
          setAlerts(alerts)
          
          setYootOutcome(null)
          setThrowCount(teams[turnUpdate.team].throws)
        } else if (pregameOutcome === 'tie') {
          let alerts = [yootOutcomeAlertName, 'pregameTie']
          teams[turnUpdate.team].players.length > 0 && alerts.push('turn')
          setAlerts(alerts)

          setYootOutcome(null)
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
          let alerts = [yootOutcomeAlertName, 'pregameRocketsWin']
          teams[turnUpdate.team].players.length > 0 && alerts.push('turn')
          setAlerts(alerts)

          setYootOutcome(null)
          setThrowCount(teams[turnUpdate.team].throws)
        } else if (pregameOutcome === '1') {
          let alerts = [yootOutcomeAlertName, 'pregameUfosWin']
          teams[turnUpdate.team].players.length > 0 && alerts.push('turn')
          setAlerts(alerts)

          setYootOutcome(null)
          setThrowCount(teams[turnUpdate.team].throws)
        }
      } else if (gamePhaseUpdate === 'game') {
        let yootOutcomeAlertName = `yootOutcome${yootOutcome}`
        if ((yootOutcome === 0 || yootOutcome === -1) && teams[turnPrev.team].throws === 0 && movesIsEmpty(teams[turnPrev.team].moves)) {
          let alerts = [yootOutcomeAlertName] // add 'no available moves' alert
          teams[turnUpdate.team].players.length > 0 && alerts.push('turn')
          setAlerts(alerts)

          setYootOutcome(null)
          // server determines if turn was skipped
        } else {
          setAlerts([yootOutcomeAlertName])
        }
        setThrowCount(teams[turnUpdate.team].throws)
        if (teams[turnUpdate.team].throws > 0) {
          setBonusExists(true)
        } else {
          setBonusExists(false)
        }

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
            const size = 0.6 + Math.random() * 0.02
            const texture = meteorTextures[Math.floor(Math.random() * meteorTextures.length)]
            const color = new THREE.Color();
            color.setHSL(0.1, 1.0, 0.4)
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

        // sounds
        if (yootOutcome === 0) {
          const audio = new Audio('sounds/effects/yut-0.mp3');
          audio.volume=0.5;
          audio.play();
        } else if (yootOutcome === 1) {
          const audio = new Audio('sounds/effects/throw-reveal.mp3');
          audio.volume=0.5
          audio.play();
        } else if (yootOutcome === 2) {

          const audio = new Audio('sounds/effects/throw-reveal.mp3');
          audio.volume=0.5
          audio.play();
        } else if (yootOutcome === 3) {

          const audio = new Audio('sounds/effects/throw-reveal.mp3');
          audio.volume=0.5
          audio.play();
        } else if (yootOutcome === 4 || yootOutcome === 5) {
          setYootOutcome((prevYootOutcome) => {
            if (prevYootOutcome === 4 || prevYootOutcome === 5) {
              const audio = new Audio('sounds/effects/yut-chain.mp3');
              audio.volume=0.5;
              audio.play();
            } else {
              if (yootOutcome === 4) {
                const audio = new Audio('sounds/effects/yut-1.mp3');
                audio.volume=0.5;
                audio.play();
              } else {
                const audio = new Audio('sounds/effects/mo.mp3');
                audio.volume=0.5;
                audio.play();
              }
            }
            return yootOutcome
          })
        } else if (yootOutcome === -1) {
          const audio = new Audio('sounds/effects/backdo.mp3');
          audio.volume=0.5;
          audio.play();
        }
      }

      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setYootAnimationPlaying(false)
      setYootAnimation(null)
      setHasTurn(clientHasTurn(socket.id, teams, turnUpdate.team, turnUpdate.players[turnUpdate.team]))
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setPauseGame(paused)
    })

    socket.on('move', ({ newTeam, prevTeam, newPlayer, moveUsed, updatedPieces, updatedTiles, throws, newGameLogs, turnStartTime, turnExpireTime, paused }) => {
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
          if (piece.team === 0 && piece.id === 0) {
            setPieceTeam0Id0(piece)
            setPieceTeam0Id0AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 1) {
            setPieceTeam0Id1(piece)
            setPieceTeam0Id1AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 2) {
            setPieceTeam0Id2(piece)
            setPieceTeam0Id2AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 3) {
            setPieceTeam0Id3(piece)
            setPieceTeam0Id3AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 0) {
            setPieceTeam1Id0(piece)
            setPieceTeam1Id0AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 1) {
            setPieceTeam1Id1(piece)
            setPieceTeam1Id1AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 2) {
            setPieceTeam1Id2(piece)
            setPieceTeam1Id2AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 3) {
            setPieceTeam1Id3(piece)
            setPieceTeam1Id3AnimationPlaying(true)
          }

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
        if (throws > 0 && newTeam === prevTeam) {
          setBonusExists(true)
        } else {
          setBonusExists(false)
        }

        // Update moves
        if (newTeam !== prevTeam) {
          teams[prevTeam].moves = JSON.parse(JSON.stringify(initialState.initialMoves))
        } else {
          teams[prevTeam].moves[moveUsed]--
        }
      
        // Update current player's name
        if (teams[newTeam].players[newPlayer].name) {
          const currentPlayerName = teams[newTeam].players[newPlayer].name
          setCurrentPlayerName(currentPlayerName)
        }

        return [...teams]
      })

      setTiles(tiles => {
        // Join
        const movingTeam = prevTeam
        const to = updatedTiles.to.index
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

          setYootOutcome(null)
        }
        newTurn.players[newTeam] = newPlayer
        return newTurn
      })

      // Sound for Start
      // Sound for Move
      // Sound for Catch
      // Sound for Piggyback

      setAlerts(alerts)
      // Turn could have changed
      setHasTurn(clientHasTurn(socket.id, teams, newTeam, newPlayer))
      setLegalTiles({})
      setHelperTiles({})
      setSelection(null)
      setGameLogs(gameLogs => [...gameLogs, ...newGameLogs])
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setPauseGame(paused)
    })

    socket.on('score', ({ newTeam, prevTeam, newPlayer, moveUsed, updatedPieces, from, throws, winner, gamePhase, newGameLogs, turnStartTime, turnExpireTime, paused }) => {
      setTeams(teams => {
        // Update pieces
        for (const piece of updatedPieces) {
          teams[piece.team].pieces[piece.id] = piece
          teams[piece.team].pieces[piece.id].history = [...piece.history]
          teams[piece.team].pieces[piece.id].lastPath = [...piece.lastPath]
          if (piece.team === 0 && piece.id === 0) {
            setPieceTeam0Id0(piece)
            setPieceTeam0Id0AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 1) {
            setPieceTeam0Id1(piece)
            setPieceTeam0Id1AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 2) {
            setPieceTeam0Id2(piece)
            setPieceTeam0Id2AnimationPlaying(true)
          }
          else if (piece.team === 0 && piece.id === 3) {
            setPieceTeam0Id3(piece)
            setPieceTeam0Id3AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 0) {
            setPieceTeam1Id0(piece)
            setPieceTeam1Id0AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 1) {
            setPieceTeam1Id1(piece)
            setPieceTeam1Id1AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 2) {
            setPieceTeam1Id2(piece)
            setPieceTeam1Id2AnimationPlaying(true)
          }
          else if (piece.team === 1 && piece.id === 3) {
            setPieceTeam1Id3(piece)
            setPieceTeam1Id3AnimationPlaying(true)
          }
        }

        // Update throws
        teams[newTeam].throws = throws
        setThrowCount(throws)
        if (throws > 0 && newTeam === prevTeam) {
          setBonusExists(true)
        } else {
          setBonusExists(false)
        }

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
      
      // Update tiles
      setTiles(tiles => {
        tiles[from] = []
        return [...tiles]
      })
      
      if (gamePhase !== 'finished') {
        const alerts = []
        let numPiecesScored = updatedPieces.length
        alerts.push(`score${prevTeam}${numPiecesScored}`)
  
        if (newTeam !== prevTeam) {
          setTurn(turn => {
            let newTurn = {
              team: newTeam,
              players: [...turn.players]
            }
            newTurn.players[newTeam] = newPlayer
            return newTurn
          })
          alerts.push('turn')
          setYootOutcome(null)
        }
        
        setAlerts(alerts)
      } else if (gamePhase === 'finished') {
        setResults(results => [ ...results, winner ])
        setPieceTeam0Id0AnimationPlaying(false)
        setPieceTeam0Id1AnimationPlaying(false)
        setPieceTeam0Id2AnimationPlaying(false)
        setPieceTeam0Id3AnimationPlaying(false)
        setPieceTeam1Id0AnimationPlaying(false)
        setPieceTeam1Id1AnimationPlaying(false)
        setPieceTeam1Id2AnimationPlaying(false)
        setPieceTeam1Id3AnimationPlaying(false)
      }

      setLegalTiles({})
      setHelperTiles({})
      setSelection(null)
      setGameLogs(gameLogs => [ ...gameLogs, ...newGameLogs ])
      setGamePhase(gamePhase)
      setWinner(winner)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setPauseGame(paused)
      setShowFinishMoves(false)
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

      if (selection === null) {
        setShowFinishMoves(false)
      }
    })

    // Emitted to other clients when a client joins
    // refactor: only players arrays from teams
    socket.on("joinRoom", ({ spectators, teams, host, gamePhase }) => {
      setSpectators(spectators);
      setTeams(teams);
      setHost(host);

      findAndStoreClient(spectators, teams[0].players, teams[1].players)
      
      if (gamePhase === 'lobby' && 
        teams[0].players.length > 0 && 
        teams[1].players.length > 0 &&
        allPlayersConnected(teams[0].players, teams[1].players)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })
    
    socket.on("joinTeam", ({ spectators, playersTeam0, playersTeam1, gamePhase, host, turn }) => {
      setSpectators(spectators)
      setTeams((teams) => {
        let newTeams = [...teams]
        newTeams[0].players = []
        for (const player of playersTeam0) {
          newTeams[0].players.push({
            ...player
          })
        }
        newTeams[1].players = []
        for (const player of playersTeam1) {
          newTeams[1].players.push({
            ...player
          })
        }
        return newTeams
      });
      setHost(host);
      if (gamePhase === 'pregame' || gamePhase === 'game') {
        setThrowCount(teams[turn.team].throws)
      }
      
      findAndStoreClient(spectators, playersTeam0, playersTeam1)
      
      // Player could have joined an empty team
      if (gamePhase === 'pregame' || gamePhase === 'game') {
        let currentPlayerName
        if (currentTeam === 0) {
          currentPlayerName = playersTeam0[turn.players[currentTeam]].name
        } else if (currentTeam === 1) {
          currentPlayerName = playersTeam1[turn.players[currentTeam]].name
        }
        setCurrentPlayerName(currentPlayerName)
      }
      
      if (gamePhase === 'lobby' && 
        playersTeam0.length > 0 && 
        playersTeam1.length > 0 &&
        allPlayersConnected(playersTeam0, playersTeam1)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })

    socket.on('reset', () => {
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
        
        // use previous teams state because it's not updated
        if (teams[0].players.length > 0 && 
          teams[1].players.length > 0 &&
          allPlayersConnected(teams[0].players, teams[1].players)) {
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

    socket.on("setAway", ({ player, paused }) => {
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

      setPauseGame(paused)
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

    socket.on("kick", ({ team, name, turn, paused }) => {
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
      setTurn(turn)
      setPauseGame(paused)
    })

    socket.on("pause", ({ flag, turnStartTime, turnExpireTime }) => {
      setPauseGame(flag)
      setTurnStartTime(turnStartTime)
      setTurnExpireTime(turnExpireTime)
      setRemainingTime(turnExpireTime - Date.now())
    })

    socket.on("spectatorDisconnect", ({ name }) => {
      setSpectators((spectators) => {
        let removeSpectatorIndex = spectators.find((spectator) => spectator.name === name)
        spectators.splice(removeSpectatorIndex, 1)
        return spectators
      })
    })

    socket.on("playerDisconnect", ({ team, name }) => {
      setTeams((teams) => {
        let newTeams = [...teams]
        let disconnectPlayerIndex = newTeams[team].players.find((player) => player.name === name)
        newTeams[team].players[disconnectPlayerIndex].connectedToRoom = false
        return newTeams
      });
    })

    socket.on("playerRoomSwitch", ({ roomPlayerIndex, roomPlayerTeam }) => {
      console.log('[playerRoomSwitch]')
      setTeams((teams) => {
        let newTeams = [...teams]
        newTeams[roomPlayerTeam].players.splice(roomPlayerIndex, 1)
        return newTeams
      });
    })

    socket.on("playerDisconnectLobby", ({ playersTeam0, playersTeam1 }) => {
      setTeams((teams) => {
        let newTeams = [...teams]
        newTeams[0].players = []
        for (const player of playersTeam0) {
          newTeams[0].players.push({
            ...player
          })
        }
        newTeams[1].players = []
        for (const player of playersTeam1) {
          newTeams[1].players.push({
            ...player
          })
        }
        return newTeams
      });
      
      if (playersTeam0.length > 0 && playersTeam1.length > 0 &&
        allPlayersConnected(playersTeam0, playersTeam1)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })

    socket.on('kicked', () => {
      setSettingsOpen(false)
      setConnectedToServer(false)
      socket.disconnect()
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
      setConnectedToServer(false);
    })

    return () => {
      socket.disconnect()
      console.log('[SocketManager][useEffect] return')
      setConnectedToServer(false)
      socket.off();
    }
  }, [])

  useEffect(() => {
    if (turn.team !== -1 && teams[0].players.length > 0 && teams[1].players.length > 0) {
      const currentTeam = turn.team
      const currentPlayer = turn.players[currentTeam]
      const currentPlayerName = teams[currentTeam].players[currentPlayer].name
      setCurrentPlayerName(currentPlayerName)
      setHasTurn(teams[currentTeam].players[currentPlayer].socketId === client.socketId)
    }
  }, [turn, teams, client])

  useEffect(() => {
    if (turn.team !== -1 && hasTurn && bonusExists) {
    // if (turn.team !== -1 && teams[0].players.length > 0 && teams[1].players.length > 0 && hasTurn && bonusExists) {
      setShowBonus(true)
      console.log('[SocketManager] show bonus')
    } else {
      setShowBonus(false)
      console.log('[SocketManager] do not show bonus')
    }
  }, [bonusExists, client, hasTurn])
};

/**
 * 
 * @param {array} players in team 0
 * @param {array} players in team 1
 * @returns boolean indicating whether all players are connected to the room
 */
function allPlayersConnected(playersTeam0, playersTeam1) {
  let flag = true;
  for (const player of playersTeam0) {
    if (!player.connectedToRoom) {
      flag = false
    }
  }
  for (const player of playersTeam1) {
    if (!player.connectedToRoom) {
      flag = false
    }
  }
  return flag
}