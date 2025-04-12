import edgeList from "./edgeList.js";

export function tileType(tile) {
  if (tile === -1) {
    return 'home'
  } else if (tile === 29) {
    return 'scored'
  } else {
    return 'onBoard'
  }
}

export function isBackdoMoves({moves}) {
  try {
    if (typeof moves !== 'object') {
      throw new Error('moves is not an object')
    }

    for (const move in moves) {
      if (parseInt(move) !== 0 && parseInt(move) !== -1 && moves[move] > 0) {
        console.log('has another move besides backdo', 'move:', move)
        return false;
      }
    }
    return true
  } catch (err) {
    console.log('[isBackdoMoves] error', err)
  }
}

export function hasTokenOnBoard({ pieces }) {
  for (let i = 0; i < 4; i++) {
    if (tileType(pieces[i].tile) === 'onBoard') {
      return true
    }
  }
  return false
}

// if first step, keep forks; else, go straight
export function getNextTiles(tile, forward) {
  let nextTiles = [];
  if (tile === -1 && forward) {
    return [1]
  }

  // on board
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] === tile) {
      nextTiles.push(edge[end]);
    }
  }

  return nextTiles
}

export function getStartAndEndVertices(forward) {
  if (forward === true) {
    return [0, 1]
  } else {
    return [1, 0]
  }
}

export function checkFinishRule(forks) {
  for (let i = 0; i < forks.length; i++) {
    if (forks[i] === 29) {
      return [29]
    }
  }
  return forks
}


export function movePieces({friendlyPieces, enemies, movingPieces, to, path, history, tiles}) {
  let newFriendlyPieces = []
  for (const piece of friendlyPieces) {
    newFriendlyPieces.push({ ...piece.toObject() })
  }
  let newEnemies = []
  for (const piece of enemies) {
    newEnemies.push({ ...piece.toObject() })
  }

  // Update moving team's pieces at home
  for (const piece of movingPieces) {
    newFriendlyPieces[piece.id].tile = to
    newFriendlyPieces[piece.id].history = history
    newFriendlyPieces[piece.id].lastPath = path
  }

  // If catch, update enemy pieces
  if (tiles[to].length > 0) {
    let occupyingTeam = tiles[to][0].team
    if (occupyingTeam != movingTeam) {
      for (let piece of tiles[to]) { // if tile is empty, it won't run
        piece.tile = -1
        piece.history = []
        newEnemies.pieces[piece.id] = { ...piece.toObject() }
      }
    }
  }

  return [newFriendlyPieces, newEnemies]
}

export function isEmptyMoves(moves) {
  for (const move in moves) {
    if (parseInt(move) !== 0 && moves[move] > 0) {
      return false;
    }
  }
  return true;
}