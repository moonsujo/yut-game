import { checkFinishRule, getNextTiles, isEmptyMoves, movePieces, tileType } from '../rules/rulesHelpers.js'
import { getLegalTiles } from '../rules/legalTiles.js'

function pickBestMoveSequence({ moves, friendlyPieces, enemies, bestMoveSequence }) {
  // 
  // loop through moves
  // loop through pieces
  // for each piece
  // call pickBestMoveSequence with next move 

  // base case
  if (isEmptyMoves(moves)) {
    return bestMoveSequence
  } else {

  }
}

export function calculateSmartMove({ room, team }) {
  const moves = room.teams[team].moves.toObject()
  const friendlyPieces = room.teams[team].pieces
  const enemies = room.teams[team === 0 ? 1 : 0].pieces

  const possibleMoves = [] // each item is [ { sequence of moves, score } ]

  // sequence of moves
  // try every permutation
  
  // for each move
  // pick a move
  // pick a token
  // loop until you're out of moves
  // recursion
  // pick the sequence that gives the lowest score
  let moveSequence = [] // item: { tokenId, moveInfo }
  for (let move of Object.keys(moves)) {
    move = parseInt(move)
    if (move !== 0 && moves[move] > 0) {

    }
  }

  for (let i = 0; i < room.rules.numTokens; i++) {
    // take a piece
    // get legal tiles
    // get token positions when that move is made
    // score that set of positions
    // do it for each legal tile
    // make a move as { tokenId, the tile to move to, and the score }
    // append to possibleMoves

    let selectedPiece = room.teams[team].pieces[i]
    let tile = selectedPiece.tile
    let id = selectedPiece.id
    let history;
    let selectedPieces;
    if (tileType(tile) === 'home') {
      history = []
      selectedPieces = [{tile, team, id, history}]
    } else {
      history = room.tiles[tile][0].history // go back the way you came from of the first token
      selectedPieces = room.tiles[tile];
    }
    let legalTiles = getLegalTiles(tile, moves, friendlyPieces, history, room.rules.backdoLaunch)
    if (!(Object.keys(legalTiles).length === 0)) {
      for (const legalTile of Object.keys(legalTiles)) {
        
        // if legal tile is 29
        // pick the lowest move whether there's one move or multiple moves
        let score;
        let moveInfo
        if (legalTile === 29) {
          let lowestMove = 10
          let lowestMoveInfo = { // fillers
            tile: -1,
            move: '-2',
            history: [],
            path: []
          }
          for (const moveInfo of legalTiles[legalTile]) {
            if (parseInt(moveInfo.move) < lowestMove) {
              lowestMove = parseInt(moveInfo.move)
              lowestMoveInfo = moveInfo
            }
          }
          moveInfo = lowestMoveInfo
          const [newFriendlyPieces, newEnemyPieces] = movePieces({ 
            friendlyPieces,
            enemies,
            movingPieces: selectedPieces,
            to: parseInt(legalTile),
            path: moveInfo.path,
            history: moveInfo.history,
            tiles: room.tiles
          })
          score = calculateScore({ 
            pieces: newFriendlyPieces, 
            enemyPieces: newEnemyPieces, 
            backdoLaunch: room.rules.backdoLaunch, 
          })
        } else {
          moveInfo = legalTiles[legalTile]
          const [newFriendlyPieces, newEnemyPieces] = movePieces({ 
            friendlyPieces,
            enemies,
            movingPieces: selectedPieces,
            to: parseInt(legalTile),
            path: moveInfo.path,
            history: moveInfo.history,
            tiles: room.tiles
          })
          score = calculateScore({ 
            pieces: newFriendlyPieces, 
            enemyPieces: newEnemyPieces, 
            backdoLaunch: room.rules.backdoLaunch, 
          })
        }
        possibleMoves.push({ tokenId: id, moveInfo, score })
      }
    }
  }

  let lowestScore = 1000; // minimize distance to finish
  let bestMoveIndex = -1;
  for (let i = 0; i < possibleMoves.length; i++) {
    let candidate = possibleMoves[i]
    if (candidate.score < lowestScore) {
      lowestScore = candidate.score
      bestMoveIndex = i
    }
  }

  return possibleMoves[bestMoveIndex] // placeholder
}

// test cases:
// u0s3, u1s-1, u2s-1, u3s-1, move: 2. start a new token or move to shortcut.
  // move to shortcut
export function calculateScore({ pieces, enemyPieces, backdoLaunch }) {
  // get long distance from piece's tile to finish
  let score = 0;
  let scoreEnemy = 0;
  // depth first search
  // measure 1: distance to finish
  // piggyback counts distance only once
  let enemyTiles = {}
  for (let i = 0; i < enemyPieces.length; i++) {
    const enemy = enemyPieces[i]
    if (!enemyTiles[enemy.tile]) {
      enemyTiles[enemy.tile] = [enemy]
    } else {
      enemyTiles[enemy.tile].push(enemy)
    }
  }
  let friendlyTiles = {}
  for (let i = 0; i < pieces.length; i++) {
    const friendly = pieces[i]
    if (!friendlyTiles[friendly.tile]) {
      friendlyTiles[friendly.tile] = [friendly]
    } else {
      friendlyTiles[friendly.tile].push(friendly)
    }
  }
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