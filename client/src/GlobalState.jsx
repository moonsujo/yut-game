import { atom } from "jotai";
import initialState from "../initialState";
import mediaValues from "./mediaValues";

import { atomWithReducer } from 'jotai/utils'
import { useEffect } from "react";

function atomWithCompare(initialValue, areEqual) {
  return atomWithReducer(initialValue, (prev, next) => {
    if (areEqual(prev, next)) {
      return prev
    }

    return next
  })
}

export const joinTeamAtom = atom(null)
export const disconnectAtom = atom(false)
export const gamePhaseAtom = atom('lobby'); // lobby, pregame, game, winner
export const readyToStartAtom = atom(false);
export const currentPlayerAtom = atom(false)
export const turnAtom = atom(JSON.parse(JSON.stringify(initialState.initialTurn)));
export const yootActiveAtom = atom(false);
export const spectatorsAtom = atom([])
export const clientAtom = atom({
  socketId: 'clientSocketId'
})
export const teamsAtom = atom(JSON.parse(JSON.stringify(initialState.initialTeams)))
export const messagesAtom = atom([]);
export const gameLogsAtom = atom([]);
export const roomAtom = atom({})
export const displayDisconnectAtom = atom(false)
export const hostAtom = atom({
  socketId: 'hostSocketId'
})
export const particleSettingAtom = atom(null)
export const yootThrowValuesAtom = atom(null)
export const yootThrownAtom = atom({
  flag: false,
  player: ''
})
export const displayScoreOptionsAtom = atom(false)
export const selectionAtom = atom(null)
export const tilesAtom = atom(JSON.parse(JSON.stringify(initialState.initialTiles)))
export const initialYootThrowAtom = atom(true)
export const lastMoveAtom = atom(null)
export const hasTurnAtom = atom(false)
export const turnAlertActiveAtom = atom(false)
export const yootAnimationAtom = atom(null)
export const yootOutcomeAtom = atom(null)
export const catchOutcomeAtom = atom({
  numPieces: 0,
  teamCaught: -1
})

export const pregameAlertAtom = atom({
  type: ''
})
export const throwAlertAtom = atom({
  type: '',
  num: -2,
  time: 0
})
export const moveResultAtom = atom({
  type: '',
  team: -1,
  amount: 0,
  tile: -1
})
export const throwResultAtom = atom({
  num: -2,
  time: 0
})
export const animationPlayingAtom = atom(false)
export const pieceAnimationPlayingAtom = atom(false)
export const legalTilesAtom = atom({})
export const helperTilesAtom = atom({})
export const winnerAtom = atom(-1)
export const throwCountAtom = atom(0)
export const alertsAtom = atom([])
export const currentPlayerNameAtom = atom('')
export const catchPathAtom = atom(null)
// using an object to group the rules together has an issue
// editting a field doesn't trigger re-render of the toggle state
// when I click on the box to enable the rule, the box stays lit
// instead of highlighting in the hover state

// Rules
export const backdoLaunchAtom = atom(true)
export const timerAtom = atom(true)
export const nakAtom = atom(true)
export const yutMoCatchAtom = atom(true)

export const settingsOpenAtom = atom(false)
export const connectedToServerAtom = atom(false)
export const pauseGameAtom = atom(false)
export const languageAtom = atom('english')
export const timeLeftAtom = atom(60); // seconds
export const timerOnAtom = atom(false);
export const turnStartTimeAtom = atom(null);
export const turnExpireTimeAtom = atom(null);
export const remainingTimeAtom = atom(100000);
export const resultsAtom = atom([])


const deepPieceEquals = (prev, next) => {
  let result;
  if (prev.tile === next.tile) {
    result = true
  } else {
    result = false
  }
  return result;
}

export const pieceTeam0Id0Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[0])),
  deepPieceEquals
)
export const pieceTeam0Id1Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[1])),
  deepPieceEquals
)
export const pieceTeam0Id2Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[2])),
  deepPieceEquals
)
export const pieceTeam0Id3Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[0].pieces[3])),
  deepPieceEquals
)
export const pieceTeam1Id0Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[0])),
  deepPieceEquals
)
export const pieceTeam1Id1Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[1])),
  deepPieceEquals
)
export const pieceTeam1Id2Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[2])),
  deepPieceEquals
)
export const pieceTeam1Id3Atom = atomWithCompare(
  JSON.parse(JSON.stringify(initialState.initialTeams[1].pieces[3])),
  deepPieceEquals
)

// Set device
function initializeDevice(windowWidth, landscapeCutoff) {
  if (windowWidth < landscapeCutoff) {
    return "portrait"
  } else {
    return "landscapeDesktop"
  }
}

// window.innerWidth captured even though this component doesn't render anything visible
export const deviceAtom = atom(initializeDevice(window.innerWidth, mediaValues.landscapeCutoff))