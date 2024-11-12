import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";

import { io } from "socket.io-client";

import { 
  boomTextAtom, 
  pregameAlertAtom, 
  clientAtom, 
  disconnectAtom, displayMovesAtom, gamePhaseAtom, hasTurnAtom, helperTilesAtom, hostAtom, initialYootThrowAtom, legalTilesAtom, mainAlertAtom, messagesAtom, particleSettingAtom, pieceTeam0Id0Atom, pieceTeam0Id1Atom, pieceTeam0Id2Atom, pieceTeam0Id3Atom, pieceTeam1Id0Atom, pieceTeam1Id1Atom, pieceTeam1Id2Atom, pieceTeam1Id3Atom, readyToStartAtom, roomAtom, selectionAtom, spectatorsAtom, teamsAtom, tilesAtom, turnAtom, winnerAtom, yootActiveAtom, yootThrowValuesAtom, yootThrownAtom, moveResultAtom, throwResultAtom, throwAlertAtom, turnAlertActiveAtom, animationPlayingAtom, throwCountAtom, gameLogsAtom, yootAnimationAtom, 
  yootOutcomeAtom,
  currentPlayerNameAtom,
  alertsAtom,
  catchOutcomeAtom,
  pieceAnimationPlayingAtom,
  catchPathAtom} from "./GlobalState.jsx";
import { clientHasTurn } from "./helpers/helpers.js";
import { checkJoin } from "./SocketManagerHelper.js";
import useMeteorsShader from "./shader/meteors/MeteorsShader.jsx";
import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from 'three'

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
  const [_client, setClient] = useAtom(clientAtom);
  const [_teams, setTeams] = useAtom(teamsAtom)
  const [_turn, setTurn] = useAtom(turnAtom);
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
  const [_boomText] = useAtom(boomTextAtom)
  const [_mainAlert] = useAtom(mainAlertAtom)
  const [_turnAlertActive] = useAtom(turnAlertActiveAtom)
  const [_moveResult] = useAtom(moveResultAtom)
  const [_throwResult] = useAtom(throwResultAtom)
  const [_pregameAlert] = useAtom(pregameAlertAtom)
  const [_throwAlert] = useAtom(throwAlertAtom)

  // Use state to check if the game phase changed
  const [_gamePhase, setGamePhase] = useAtom(gamePhaseAtom)
  const [_displayMoves, setDisplayMoves] = useAtom(displayMovesAtom)
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

  useEffect(() => {

    socket.connect();

    socket.on('connect', () => {})
    
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

      // nothing can be rendering MainAlert
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
      clientHasTurn(socket.id, room.teams, room.turn) &&
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

      if (room.gamePhase === 'game') {
        setDisplayMoves(room.teams[room.turn.team].moves)
      }

      if ((room.gamePhase === "pregame" || room.gamePhase === "game") && 
      clientHasTurn(socket.id, room.teams, room.turn)) {

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


    })

    socket.on('throwYoot', ({ yootOutcome, yootAnimation, teams, turn }) => {
      setYootOutcome(yootOutcome)
      setYootAnimation(yootAnimation)
      // setHasTurn(clientHasTurn(socket.id, teams, turn))
      // setAnimationPlaying() is run in YootButtonNew onClick
      setThrowCount(teams[turn.team].throws)
    })

    socket.on('gameStart', ({ teams, gamePhase, turn, gameLogs }) => {
      setTeams(teams) // only update the throw count of the current team
      setGamePhase(gamePhase)
      setTurn(turn)
      setThrowCount(teams[turn.team].throws)
      
      const currentPlayerName = teams[turn.team].players[turn.players[turn.team]].name
      setCurrentPlayerName(currentPlayerName)
      setAlerts(['gameStart', 'turn'])
      setAnimationPlaying(true)
      
      setHasTurn(clientHasTurn(socket.id, teams, turn))
      setGameLogs(gameLogs)
    })

    socket.on('recordThrow', ({ teams, gamePhaseUpdate, turnUpdate, pregameOutcome, yootOutcome, gameLogs }) => {    
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
        if (yootOutcome === 0 && teams[turnPrev.team].throws === 0) {
          setAlerts([yootOutcomeAlertName, 'turn'])
        } else {
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

      setAnimationPlaying(true)
      setYootAnimation(null)
      setHasTurn(clientHasTurn(socket.id, teams, turnUpdate))
      setGameLogs(gameLogs)
      if (gamePhaseUpdate === 'game') {
        setDisplayMoves(teams[turnUpdate.team].moves)
      }
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

    socket.on("move", ({ teamsUpdate, turnUpdate, legalTiles, tiles, gameLogs, selection }) => {
      let teamsPrev;
      setTeams((prev) => {
        teamsPrev = prev;
        return teamsUpdate
      }) // only update the throw count of the current team
      let turnPrev;
      setTurn((prev) => {
        turnPrev = prev;
        return turnUpdate
      })
      
      const currentPlayerName = teamsUpdate[turnUpdate.team].players[turnUpdate.players[turnUpdate.team]].name
      setCurrentPlayerName(currentPlayerName)
      
      let alerts = []
      let joined = checkJoin(teamsPrev[turnPrev.team].pieces, teamsUpdate[turnPrev.team].pieces)
      if (joined.result) {
        alerts.push(`join${turnPrev.team}${joined.tile}`)
      }

      if (turnPrev.team !== turnUpdate.team) {
        alerts.push('turn')
        setThrowCount(teamsUpdate[turnUpdate.team].throws)
      } else {
        const opposingTeam = turnUpdate.team === 0 ? 1 : 0;
        const opposingTeamPiecesPrev = teamsPrev[opposingTeam].pieces;
        const opposingTeamPiecesUpdate = teamsUpdate[opposingTeam].pieces
        let numPiecesCaught = calculateNumPiecesCaught(opposingTeamPiecesPrev, opposingTeamPiecesUpdate)
        if (numPiecesCaught > 0) {
          alerts.push(`catch${opposingTeam}${numPiecesCaught}`)
          setCatchPath(gameLogs[gameLogs.length-1].content.path)
        }
        setThrowCount(teamsUpdate[turnUpdate.team].throws)
      }

      setDisplayMoves(teamsUpdate[turnUpdate.team].moves)
      setHelperTiles({})
      setAlerts(alerts)
      setAnimationPlaying(true)
      setPieceAnimationPlaying(true)
      // whenever turn could have changed
      setHasTurn(clientHasTurn(socket.id, teamsUpdate, turnUpdate))
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
      setGameLogs(gameLogs)
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

    socket.on("score", ({ teamsUpdate, turnUpdate, legalTiles, tiles, gameLogs, selection, gamePhase, results }) => {
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

      setDisplayMoves(teamsUpdate[turnUpdate.team].moves)
      setHelperTiles({})
      // whenever turn could have changed
      setHasTurn(clientHasTurn(socket.id, teamsUpdate, turnUpdate))
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
      setGameLogs(gameLogs)
      setGamePhase(gamePhase)
      setWinner(results[results.length-1])
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

    socket.on("reset", ({ gamePhase, tiles, turn, teams }) => {
      setGamePhase(gamePhase);
      setTiles(tiles);
      setTurn(turn);
      setTeams(teams);
      setPieceTeam0Id0(teams[0].pieces[0])
      setPieceTeam0Id1(teams[0].pieces[1])
      setPieceTeam0Id2(teams[0].pieces[2])
      setPieceTeam0Id3(teams[0].pieces[3])
      setPieceTeam1Id0(teams[1].pieces[0])
      setPieceTeam1Id1(teams[1].pieces[1])
      setPieceTeam1Id2(teams[1].pieces[2])
      setPieceTeam1Id3(teams[1].pieces[3])
      
      if (teams[0].players.length > 0 && 
        teams[1].players.length > 0 &&
        allPlayersConnected(teams)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }

      setParticleSetting(null)
    })

    socket.on("userDisconnect", ({ spectators, teams, gamePhase, host }) => {
      setSpectators(spectators)
      setTeams(teams);
      setHost(host);
      
      findAndStoreClient(spectators, teams)
      
      if (gamePhase === 'lobby' && 
        teams[0].players.length > 0 && 
        teams[1].players.length > 0&&
        allPlayersConnected(teams)) {
          setReadyToStart(true)
        } else {
          setReadyToStart(false)
        }
    })

    socket.on('disconnect', () => {
      setDisconnect(true);
    })

    return () => {
      socket.disconnect()

      socket.off();
    }
  }, [])

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