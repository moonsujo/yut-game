import { useAtomValue } from "jotai";
import { pieceTeam0Id0AnimationPlayingAtom, pieceTeam0Id1AnimationPlayingAtom, pieceTeam0Id2AnimationPlayingAtom, pieceTeam0Id3AnimationPlayingAtom, pieceTeam1Id0AnimationPlayingAtom, pieceTeam1Id1AnimationPlayingAtom, pieceTeam1Id2AnimationPlayingAtom, pieceTeam1Id3AnimationPlayingAtom, yootAnimationPlayingAtom } from "../GlobalState";

export function useAnimationPlaying() {
  const pieceTeam0Id0AnimationPlaying = useAtomValue(pieceTeam0Id0AnimationPlayingAtom)
  const pieceTeam0Id1AnimationPlaying = useAtomValue(pieceTeam0Id1AnimationPlayingAtom)
  const pieceTeam0Id2AnimationPlaying = useAtomValue(pieceTeam0Id2AnimationPlayingAtom)
  const pieceTeam0Id3AnimationPlaying = useAtomValue(pieceTeam0Id3AnimationPlayingAtom)
  const pieceTeam1Id0AnimationPlaying = useAtomValue(pieceTeam1Id0AnimationPlayingAtom)
  const pieceTeam1Id1AnimationPlaying = useAtomValue(pieceTeam1Id1AnimationPlayingAtom)
  const pieceTeam1Id2AnimationPlaying = useAtomValue(pieceTeam1Id2AnimationPlayingAtom)
  const pieceTeam1Id3AnimationPlaying = useAtomValue(pieceTeam1Id3AnimationPlayingAtom)
  const yootAnimationPlaying = useAtomValue(yootAnimationPlayingAtom)

  return (pieceTeam0Id0AnimationPlaying || 
    pieceTeam0Id1AnimationPlaying ||
    pieceTeam0Id2AnimationPlaying ||
    pieceTeam0Id3AnimationPlaying ||
    pieceTeam1Id0AnimationPlaying ||
    pieceTeam1Id1AnimationPlaying ||
    pieceTeam1Id2AnimationPlaying ||
    pieceTeam1Id3AnimationPlaying ||
    yootAnimationPlaying)
}