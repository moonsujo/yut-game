import React, { useEffect } from "react";
import { connectedToServerAtom, gamePhaseAtom } from "./GlobalState.jsx";
import { useAtom, useAtomValue } from "jotai";
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import Lobby from "./Lobby.jsx";
import Game from "./Game.jsx";

export default function Experience() {
  const gamePhase = useAtomValue(gamePhaseAtom)
  const [connectedToServer, setConnectedToServer] = useAtom(connectedToServerAtom)
  const params = useParams()

  useEffect(() => {
    if (connectedToServer) {
      socket.emit('addUser', { roomId: params.id.toUpperCase(), savedClient: localStorage.getItem('yootGame') }, () => {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
      })
    }
  }, [connectedToServer])

  return <>
    { gamePhase === 'lobby' && <Lobby/> }
    { (gamePhase === 'pregame' || gamePhase === 'game') && <Game/> }
    {/* win screen experience */}
  </>
}