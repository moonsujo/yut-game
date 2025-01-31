import React, { useMemo } from "react";
import { connectedToServerAtom, gamePhaseAtom } from "./GlobalState.jsx";
import { useAtomValue } from "jotai";
import GameExperience from "./GameExperience.jsx";
import LobbyExperience from "./LobbyExperience.jsx";
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";

export default function Experience() {

  const gamePhase = useAtomValue(gamePhaseAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const params = useParams()

  useMemo(() => {
    if (connectedToServer) {
      socket.emit('addUser', {}, () => {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
      })
    }
  }, [connectedToServer])

  return <>
    { gamePhase === 'lobby' && <LobbyExperience/> }
    { (gamePhase === 'pregame' || gamePhase === 'game') && <GameExperience/> }
    {/* win screen experience */}
    {/* { gamePhase === 'finished' && <GameExperience/> } */}
    {/* <GameExperience/> */}
  </>
}