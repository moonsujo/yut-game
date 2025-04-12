import { checkFinishRule, getNextTiles, getOccupiedTiles, isEmptyMoves, movePieces, tileType } from '../rules/rulesHelpers.js'
import { getLegalTiles } from '../rules/legalTiles.js'

// return: { sequence, score }
// sequence: [{ token id, move, catch: Boolean }]
function pickBestMoveSequence({ moves, friendlyPieces, enemies, bestMoveSequence, backdoLaunch, numTokens }) {

  // base case
  if (isEmptyMoves(moves)) {
    // calculate score
    // if moves is empty
    // return move sequence with score
    let score = calculateScore({ 
      pieces: friendlyPieces, 
      enemyPieces: enemies, 
      backdoLaunch
    })

    return { sequence: bestMoveSequence, score }
  } else {
    // pick a token
    // get legal tiles
    // let nextBestScore = 100
    // let nextBestSequence = []
    // for each of them
      // move there and get new friendly pieces and enemies
      // subtract the move from moves
      // append it to the bestMoveSequence
      // candidate = pickBestMoveSequence({ 
        // moves: newMoves,
        // friendlyPieces: newFriendlyPieces,
        // enemies: newEnemies,
        // bestMoveSequence: newMoveSequence
      // })
      // if candidate's score is lower than the nextBestScore
      // replace nextBestScore and nextBestSequence
    // return nextBestSequence

    let nextBestScore = 100
    let nextBestSequence = []
    let occupiedTiles = getOccupiedTiles({ pieces: friendlyPieces })
    for (let i = 0; i < numTokens; i++) {
      // take a piece
      // get legal tiles
      // get token positions when that move is made
      // score that set of positions
      // do it for each legal tile
  
      let selectedPiece = friendlyPieces[i]
      let tile = selectedPiece.tile
      let team = selectedPiece.team
      let id = selectedPiece.id
      let history;
      let selectedPieces;
      if (tileType(tile) === 'home') {
        history = []
        selectedPieces = [{tile, team, id, history}]
      } else {
        history = selectedPiece.history // go back the way you came from of the first token
        selectedPieces = occupiedTiles[tile];
      }
      let legalTiles = getLegalTiles(tile, moves, friendlyPieces, history, backdoLaunch)

      // appends move for every token
      // should pick one of them
      // sample output: 
      /**
       * smart move sequence [
          { tile: 3, move: '3', history: [ 0, 1, 2 ], path: [ 0, 1, 2, 3 ] },
          { tile: 3, move: '3', history: [ 0, 1, 2 ], path: [ 0, 1, 2, 3 ] },
          { tile: 3, move: '3', history: [ 0, 1, 2 ], path: [ 0, 1, 2, 3 ] },
          { tile: 3, move: '3', history: [ 0, 1, 2 ], path: [ 0, 1, 2, 3 ] }
        ]
       */
      if (!(Object.keys(legalTiles).length === 0)) {
        for (const legalTile of Object.keys(legalTiles)) {
          
          // if legal tile is 29
          // pick the lowest move whether there's one move or multiple moves
          let moveInfo
          if (legalTile === 29) {
            for (const moveInfo of legalTiles[legalTile]) {
              const [newFriendlyPieces, newEnemyPieces] = movePieces({ 
                friendlyPieces,
                enemies,
                movingPieces: selectedPieces,
                to: parseInt(legalTile),
                path: moveInfo.path,
                history: moveInfo.history,
              })
              let newMoves = JSON.parse(JSON.stringify(moves))
              newMoves[moveInfo.move]--
              bestMoveSequence.push(moveInfo)
              candidate = pickBestMoveSequence({ 
                moves: newMoves, 
                friendlyPieces: newFriendlyPieces, 
                enemies: newEnemyPieces, 
                bestMoveSequence, 
                backdoLaunch, 
                numTokens 
              })
              if (candidate.score < nextBestScore) {
                nextBestScore = candidate.score
                nextBestSequence = candidate.sequence
              }
            }
          } else {
            moveInfo = legalTiles[legalTile]
            const [newFriendlyPieces, newEnemyPieces] = movePieces({ 
              friendlyPieces,
              enemies,
              movingPieces: selectedPieces,
              to: parseInt(legalTile),
              path: moveInfo.path,
              history: moveInfo.history,
            })
            let newMoves = JSON.parse(JSON.stringify(moves))
            newMoves[moveInfo.move]--
            bestMoveSequence.push(moveInfo)
            let candidate = pickBestMoveSequence({ 
              moves: newMoves, 
              friendlyPieces: newFriendlyPieces, 
              enemies: newEnemyPieces, 
              bestMoveSequence, 
              backdoLaunch, 
              numTokens 
            })
            if (candidate.score < nextBestScore) {
              nextBestScore = candidate.score
              nextBestSequence = candidate.sequence
            }
          }
        }
      }
    }
    return nextBestSequence
  }
}

export function calculateSmartMoveSequence({ room, team }) {
  const moves = room.teams[team].moves.toObject()
  const friendlyPieces = room.teams[team].pieces
  const enemies = room.teams[team === 0 ? 1 : 0].pieces
  
  let bestMoveSequence = pickBestMoveSequence({ 
    moves, 
    friendlyPieces, 
    enemies, 
    bestMoveSequence: [],
    backdoLaunch: room.rules.backdoLaunch,
    numTokens: room.rules.numTokens
  })

  return bestMoveSequence
}


export function calculateScore({ pieces, enemyPieces, backdoLaunch }) {
  // get long distance from piece's tile to finish
  let score = 0;
  let scoreEnemy = 0;
  // depth first search
  // measure 1: distance to finish
  // piggyback counts distance only once
  let enemyTiles = getOccupiedTiles({ pieces: enemyPieces })
  let friendlyTiles = getOccupiedTiles({ pieces: pieces })
  for (let friendlyTile of Object.keys(friendlyTiles)) {
    friendlyTile = parseInt(friendlyTile)
    if (friendlyTile === -1) {
      score += (calculateLongestPathHome(friendlyTile, 0) * friendlyTiles[friendlyTile].length)
    } else {
      score += calculateLongestPathHome(friendlyTile, 0)
    }
  }
  for (let enemyTile of Object.keys(enemyTiles)) {
    enemyTile = parseInt(enemyTile)
    if (enemyTile === -1) {
      scoreEnemy += (calculateLongestPathHome(enemyTile, 0) * enemyTiles[enemyTile].length)
    } else {
      scoreEnemy += calculateLongestPathHome(enemyTile, 0)
    }
  }

  // measure 2: enemies in catch range
  const moveSets = {
    '1': { // one move
      '0': 0,
      '1': 1, 
      '2': 0, 
      '3': 0, 
      '4': 0,
      '5': 0,
      '-1': 0
    },
    '2': { // two move
      '0': 0,
      '1': 0, 
      '2': 1, 
      '3': 0, 
      '4': 0,
      '5': 0,
      '-1': 0
    }, 
    '3': { // three move
      '0': 0,
      '1': 0, 
      '2': 0, 
      '3': 1, 
      '4': 0,
      '5': 0,
      '-1': 0
    },
    '4': { // four move
      '0': 0,
      '1': 0, 
      '2': 0, 
      '3': 0, 
      '4': 1,
      '5': 0,
      '-1': 0
    },
    '5': { // five move
      '0': 0,
      '1': 0, 
      '2': 0, 
      '3': 0, 
      '4': 0,
      '5': 1,
      '-1': 0
    },
    '-1': { // backdo move
      '0': 0,
      '1': 0, 
      '2': 0, 
      '3': 0, 
      '4': 0,
      '5': 0,
      '-1': 1
    }
  }
  const moveToCatchScore = {
    '1': 3,
    '2': 4,
    '3': 4,
    '4': 2,
    '5': 1,
    '-1': 1
  }
  for (let enemyTile of Object.keys(enemyTiles)) {
    enemyTile = parseInt(enemyTile)
    let history
    if (tileType(enemyTile) === 'home') {
      history = []
    } else {
      history = enemyTiles[enemyTile][0].history
    }
    // count piggyback pieces only once
    // technically, pieces at home are piggybacked
    for (const move of Object.keys(moveSets)) {
      const legalTiles = getLegalTiles(enemyTile, moveSets[move], enemyPieces, history, backdoLaunch)
      // check how many enemies are on it
      // multiply score by that number
      if (Object.keys(legalTiles).length > 0) {
        let numMostTokens = 0
        for (const legalTile of Object.keys(legalTiles)) {
          if (legalTile !== 29) {
            if (friendlyTiles[legalTile] && friendlyTiles[legalTile].length > numMostTokens) {
              numMostTokens = friendlyTiles[legalTile].length
            }
          }
        }
        let catchScore = moveToCatchScore[move] * numMostTokens
        scoreEnemy -= catchScore
      }
    }
  }

  return score - scoreEnemy
}

// dfs
export function calculateLongestPathHome(tile, longestDistance) {
  longestDistance+=1

  const nextTiles = checkFinishRule(getNextTiles(tile, true))
  
  // base case
  if (nextTiles[0] === 29) {
    return longestDistance
  } else {
    let nextLongestDistance = 0
    for (const nextTile of nextTiles) {
      const candidate = calculateLongestPathHome(nextTile, longestDistance)
      if (candidate > nextLongestDistance) {
        nextLongestDistance = candidate
      }
    }
    return nextLongestDistance
  }
}