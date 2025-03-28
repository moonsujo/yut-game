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