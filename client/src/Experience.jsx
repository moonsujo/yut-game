import React, { useEffect } from "react";
import { connectedToServerAtom, gamePhaseAtom } from "./GlobalState.jsx";
import { useAtom, useAtomValue } from "jotai";
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import Lobby from "./Lobby.jsx";
import Game from "./Game.jsx";
import RocketsWin from "./RocketsWin.jsx";

export default function Experience() {
  const gamePhase = useAtomValue(gamePhaseAtom)
  const [connectedToServer, setConnectedToServer] = useAtom(connectedToServerAtom)
  const params = useParams()

  useEffect(() => {
    if (connectedToServer) {
      socket.emit('addUser', { roomId: params.id.toUpperCase(), savedClient: localStorage.getItem('yootGame') }, (response) => {
        if (response === 'success') {
          socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
        } else {
          // Display message: 'room doesn't exist. create a new room from the main entrance. <button/>'
        }
      })
    }
  }, [connectedToServer])

  return <>
    { gamePhase === 'lobby' && <Lobby/> }
    { (gamePhase === 'pregame' || gamePhase === 'game') && <Game/> }
    {/* win screen experience */}
    {/* { gamePhase === 'finished' && <RocketsWin/> } */}
  </>
}