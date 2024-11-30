import React from "react";
import { gamePhaseAtom } from "./GlobalState.jsx";
import { useAtomValue } from "jotai";
import GameExperience from "./GameExperience.jsx";
import LobbyExperience from "./LobbyExperience.jsx";

export default function Experience() {

  const gamePhase = useAtomValue(gamePhaseAtom)

  console.log('[Experience] gamePhase', gamePhase)

  return <>
    {/* { gamePhase === 'lobby' && <LobbyExperience/> } */}
    { (gamePhase === 'lobby' || gamePhase === 'pregame' || gamePhase === 'game' || gamePhase === 'finished') && <GameExperience/> }
    {/* win screen experience */}
  </>
}