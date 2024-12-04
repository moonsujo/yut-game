import React from "react";
import { gamePhaseAtom } from "./GlobalState.jsx";
import { useAtomValue } from "jotai";
import GameExperience from "./GameExperience.jsx";
import LobbyExperience from "./LobbyExperience.jsx";

export default function Experience() {

  // const gamePhase = useAtomValue(gamePhaseAtom)

  // console.log('[Experience] gamePhase', gamePhase)

  return <>
    {/* { gamePhase === 'lobby' && <GameExperience/> } */}
    {/* { gamePhase === 'lobby' && <LobbyExperience/> } */}
    {/* { (gamePhase === 'pregame' || gamePhase === 'game') && <GameExperience/> } */}
    {/* win screen experience */}
    {/* { gamePhase === 'finished' && <GameExperience/> } */}
    <GameExperience/>
  </>
}