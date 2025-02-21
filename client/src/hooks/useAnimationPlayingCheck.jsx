// alerts
// token
// yut
// setAnimationPlaying for each token and alert
export function useAnimationPlayingCheck() {
  const piece0Id0AnimationPlaying = useAtomValue(piece0Id0AnimationPlayingAtom)
  const piece0Id1AnimationPlaying = useAtomValue(piece0Id1AnimationPlayingAtom)
  const gameStartAlertPlaying = useAtomValue(gameStartAlertPlayingAtom)
  const yutAnimationPlaying = useAtomValue(yutAnimationPlayingAtom)
  
  return piece0Id0AnimationPlaying && 
  piece0Id1AnimationPlaying &&
  gameStartAlertPlaying &&
  yutAnimationPlaying
}

// within Tile, Piece and yut button:
// const animationPlaying = useAnimationPlayingCheck()