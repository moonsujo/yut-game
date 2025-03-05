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
      socket.emit('addUser', {}, () => {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
      })
    }
    // return (() => {
    //   // remove player from room
    //   if (connectedToServer) {
    //     socket.emit('disconnectFromRoom', { roomId: params.id.toUpperCase() });
    //     setConnectedToServer(false) // setState within a useEffect, but should be fine because component no longer exists
    //   }
    // })
  }, [connectedToServer])

  return <>
    { gamePhase === 'lobby' && <Lobby/> }
    { (gamePhase === 'pregame' || gamePhase === 'game') && <Game/> }
    {/* win screen experience */}
  </>
}