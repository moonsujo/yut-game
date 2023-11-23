import edgeList from "./edgeList.js";

/* todo */
// path history by piece // append it on 'move'
// [original tile, ... destination tile]
// make backdo use path history // implement once 'move' is implemented

// schema
// legalTiles: {
//   "1": { destination: 1, move: 1, path: [1, 2, 3]},
//   "29": [
//     { destination: 29, "move": 1, "path": [28, 29]},
//     { destination: 29, "move": 2, "path": [28, 29]}
//   ]
// }
export function getLegalTiles(tile, moves, pieces, history) { // parameters are optional
  let legalTiles = {} // add key '29' with empty list
  let starting = tile == -1 ? true : false;

  for (let move in moves) {
    if (moves[move] > 0) {
      let forward = parseInt(move) > 0 ? true: false
      if (checkBackdoRule(moves, pieces)) {
        legalTiles[0] = { tile: 0, move: "-1", history: [] }
      } else {
        let forks = getNextTiles(tile, forward)
        if (forward) {
          forks = checkFinishRule(forks)
        } else {
          forks = checkBackdoFork(forks, history)
        }
        for (let i = 0; i < forks.length; i++) {
          let path = starting ? [] : [tile]
          let destination = getDestination(forks[i], Math.abs(parseInt(move))-1, forward, path)
          let fullHistory = getFullHistory(history, destination.path, forward)
          if (destination.tile == 29) {
            if (!(29 in legalTiles)) {
              legalTiles[29] = []
            }
            legalTiles[29].push({ tile: destination.tile, move, history: fullHistory })
          } else {
            legalTiles[destination.tile] = { tile: destination.tile, move, history: fullHistory }
          }
        }
      }
    }
  }

  // console.log("legalTiles", legalTiles)
  return legalTiles
}

function getFullHistory(history, path, forward) {
  if (forward) {
    return history.concat(path)
  } else {
    if (path.length == 0) {
      return []
    } else {
      return history.slice(0, history.length-1)
    }
  }
}

function checkFinishRule(forks) {
  // console.log("[checkFinishRule] forks", forks)
  for (let i = 0; i < forks.length; i++) {
    if (forks[i] == 29) {
      return [29]
    }
  }
  return forks
}

// precondition: history is an array
function checkBackdoFork(forks, history) {
  if (history.length == 0) {
    return forks
  } else {
    return [history[history.length-1]]
  }
}

// recursion
// if first step, keep forks
// else, go straight
function getNextTiles(tile, forward) {
  // console.log("[getNextTiles] tile", tile, "forward", forward)
  let nextTiles = [];
  if (tile == -1 && (forward)) {
    return [1]
  }
  // } else if (tile == 0 && (forward)) {
  //   return [29]
  // }
  // doesn't fix all tests

  // on board
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] == tile) {
      nextTiles.push(edge[end]);
    }
  }

  return nextTiles
}

function getStartAndEndVertices(forward) {
  if (forward === true) {
    return [0, 1]
  } else {
    return [1, 0]
  }
}

function getDestination(tile, steps, forward, path) {
  // path.push(tile)
  if (steps == 0 || tile == 29) {
    return { tile, path }
  }
  
  path.push(tile)
  let [start, end] = getStartAndEndVertices(forward);
  for (const edge of edgeList) {
    if (edge[start] == tile) {
      let nextTile;
      let forks = getNextTiles(tile, forward);
      // console.log("[getDestination] forks", forks)
      if (forks.length > 1) {
        // choose next tile
        // recursively call getDestination with
        nextTile = chooseTileFromFork(path, forks)
      } else {
        nextTile = edge[end]
      }
      steps--; // updates value after reading
      return getDestination(nextTile, steps, forward, path)
    }
  }
}

function chooseTileFromFork(path, forks) {
  // console.log("[chooseTileFromFork] path", path, "forks", forks)
  // if (path[path.length-1] == 0) {
  //   return 29
  // }
  let closestIndexDistance = 1000;
  let closestIndex = -2;
  for (const fork of forks) {
    let indexDistance = Math.abs(path[path.length-2] - fork)
    if (indexDistance < closestIndexDistance) {
      closestIndexDistance = indexDistance
      closestIndex = fork
    }
  }
  return closestIndex
}

function checkBackdoRule(moves, pieces) {
  // should only have backdo
  let hasBackdo = false;
  let hasAnotherMove = false;
  for (let move in moves) {
    if (move === "-1" && moves[move] > 0) {
      hasBackdo = true;
    } else if (move !== "-1" && moves[move] > 0) {
      hasAnotherMove = true;
    }
  }
  if (!(hasBackdo && !hasAnotherMove)) {
    return false;
  }

  // should have no pieces on the board
  for (let piece of pieces) {
    if (piece == null) {
      return false;
    }
  }
  
  return true;
}