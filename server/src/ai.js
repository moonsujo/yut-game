import { checkFinishRule, getNextTiles, getOccupiedTiles, isEmptyMoves, movePieces, scorePieces, tileType } from '../rules/rulesHelpers.js'
import { getLegalTiles } from '../rules/legalTiles.js'

// return: { sequence, score }
// sequence: [{ token id, move }]
export function pickBestMoveSequence({ moves, friendlyPieces, enemies, bestMoveSequence, backdoLaunch, numTokens, throwsEarned }) {

  // base case
  if (isEmptyMoves(moves)) {
    // calculate score
    // if moves is empty
    // return move sequence with score
    let score = calculateScore({ 
      pieces: friendlyPieces, 
      enemyPieces: enemies, 
      backdoLaunch,
      throwsEarned
    })

    return { sequence: bestMoveSequence.sequence, score }
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
          if (legalTile === '29') {
            for (const moveInfo of legalTiles[legalTile]) {
              const [newPieces] = scorePieces({ 
                pieces: friendlyPieces,
                movingPieces: selectedPieces,
                path: moveInfo.path,
                history: moveInfo.history,
              })
              let newMoves = JSON.parse(JSON.stringify(moves))
              newMoves[moveInfo.move]--
              let nextBestMoveSequence = JSON.parse(JSON.stringify(bestMoveSequence))
              nextBestMoveSequence.sequence.push({
                tokenId: i,
                moveInfo,
              })
              let candidate = pickBestMoveSequence({ 
                moves: newMoves, 
                friendlyPieces: newPieces, 
                enemies, 
                bestMoveSequence: nextBestMoveSequence, 
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
            console.log('moving, moveInfo', moveInfo)
            const [newFriendlyPieces, newEnemyPieces, caught] = movePieces({ 
              friendlyPieces,
              enemies,
              movingPieces: selectedPieces,
              to: parseInt(legalTile),
              path: moveInfo.path,
              history: moveInfo.history,
            })
            let newMoves = JSON.parse(JSON.stringify(moves))
            newMoves[moveInfo.move]--
            let nextBestMoveSequence = JSON.parse(JSON.stringify(bestMoveSequence))
            nextBestMoveSequence.sequence.push({
              tokenId: i,
              moveInfo
            })
            let candidate = pickBestMoveSequence({ 
              moves: newMoves, 
              friendlyPieces: newFriendlyPieces, 
              enemies: newEnemyPieces, 
              bestMoveSequence: nextBestMoveSequence, 
              backdoLaunch, 
              numTokens,
              throwsEarned: throwsEarned + (caught ? 1 : 0)
            })
            if (candidate.score < nextBestScore) {
              nextBestScore = candidate.score
              nextBestSequence = candidate.sequence
            }
          }
        }
      }
    }
    return { sequence: nextBestSequence, score: nextBestScore }
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
    bestMoveSequence: { sequence: [], score: 100 },
    backdoLaunch: room.rules.backdoLaunch,
    numTokens: room.rules.numTokens,
    throwsEarned: 0
  }).sequence

  return bestMoveSequence
}

// should favor getting closer than advancing the one in front
// add additional points for number of throws
export function calculateScore({ pieces, enemyPieces, backdoLaunch, throwsEarned }) {
  // get long distance from piece's tile to finish
  let score = 0;
  let scoreEnemy = 0;
  // depth first search
  // measure 1: distance to finish
  // piggyback counts distance only once
  let enemyTiles = getOccupiedTiles({ pieces: enemyPieces })
  let friendlyTiles = getOccupiedTiles({ pieces: pieces })
  console.log('[calculate score] enemyTiles', enemyTiles, 'friendly tiles', friendlyTiles)
  for (let friendlyTile of Object.keys(friendlyTiles)) {
    friendlyTile = parseInt(friendlyTile)
    if (friendlyTile === -1) {
      score += (startCalculateLongestPathHome(friendlyTile, 0) * friendlyTiles[friendlyTile].length)
    } else {
      let middleScore = startCalculateLongestPathHome(friendlyTile, 0)
      score += middleScore
    }
  }
  for (let enemyTile of Object.keys(enemyTiles)) {
    enemyTile = parseInt(enemyTile)
    if (enemyTile === -1) {
      scoreEnemy += (startCalculateLongestPathHome(enemyTile, 0) * enemyTiles[enemyTile].length)
    } else {
      scoreEnemy += startCalculateLongestPathHome(enemyTile, 0)
    }
  }

  
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
  const proximityScore = {
    '1': 3,
    '2': 4,
    '3': 4,
    '4': 2,
    '5': 1,
    '-1': 1
  }

  // measure 2: enemies behind you within catch range
  if (throwsEarned === 0) {
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
        // check how many friendlies are on it
        // multiply score by that number
        if (Object.keys(legalTiles).length > 0) {
          let numMostTokens = 0
          for (const legalTile of Object.keys(legalTiles)) {
            if (legalTile !== 29) {
              // if you're on a shortcut, count the legal tile with the most pieces to catch
              if (friendlyTiles[legalTile] && friendlyTiles[legalTile].length > numMostTokens) {
                numMostTokens = friendlyTiles[legalTile].length
              }
            }
          }
          let catchScore = proximityScore[move] * numMostTokens
          scoreEnemy -= catchScore
        }
      }
    }
  }

  // measure 3: friendlies in piggyback range
  // if token is within 5 stars, give 1 point
  // prevent spreading out tokens over first row
  for (let friendlyTile of Object.keys(friendlyTiles)) {
    friendlyTile = parseInt(friendlyTile)
    let history
    if (tileType(friendlyTile) === 'home') {
      history = []
    } else {
      history = friendlyTiles[friendlyTile][0].history
    }
    // count piggyback pieces only once
    // technically, pieces at home are piggybacked
    for (const move of Object.keys(moveSets)) {
      if (parseInt(move) !== 0) {
        const legalTiles = getLegalTiles(friendlyTile, moveSets[move], pieces, history, backdoLaunch)
        // console.log('move', move, 'legalTiles', legalTiles)
        // check how many enemies are on it
        // multiply score by that number
        if (Object.keys(legalTiles).length > 0) {
          for (const legalTile of Object.keys(legalTiles)) {
            console.log('friendly legal tile', legalTile)
            if (legalTile !== 29 && legalTile !== -1) {
              if (friendlyTiles[legalTile]) {
                score -= 1
              } else if (enemyTiles[legalTile]) {
                // check how many enemies are on it
                // multiply score by that number
                let numMostTokens = 0
                // if you're on a shortcut, count the legal tile with the most pieces to catch
                if (enemyTiles[legalTile].length > numMostTokens) {
                  numMostTokens = enemyTiles[legalTile].length
                }
                let catchEnemyScore = proximityScore[move] * numMostTokens
                console.log('catch enemy score', catchEnemyScore)
                score -= catchEnemyScore
              }
            }
          }
        }
      }
    }
  }

  // measure 4: throws earned during the sequence
  score -= throwsEarned * 3

  console.log('score', score, 'score enemy', scoreEnemy)
  return score - scoreEnemy
}

// force tile 10, 25, 26, and 22 to the shortcut distance
// instead of taking the long way from the moon
function startCalculateLongestPathHome(tile, longestDistance) {
  if (tile === 29) { // scored
    return 0 
  } else if (tile === 10) { // Saturn - take shortcut over long path
    return 7 
  } else if (tile === 25) { // Vertical shortcut - take shortcut over zigzag
    return 6
  } else if (tile === 26) { // Vertical shortcut - take shortcut over zigzag
    return 5
  } else if (tile === 22) { // Moon - take shortcut over long path
    return 4
  } else if (tile === 5) { // Mars - take shortcut over long path
    return 12 
  } else {
    return calculateLongestPathHome(tile, longestDistance)
  }
}

// dfs
// longest distance from start is 22 because of the path from saturn to moon and neptune
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