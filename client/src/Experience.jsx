import React, { useEffect } from "react";
import { clientAtom, connectedToServerAtom, gamePhaseAtom, winnerAtom } from "./GlobalState.jsx";
import { useAtom, useAtomValue } from "jotai";
import { socket } from "./SocketManager.jsx";
import { useParams } from "wouter";
import Lobby from "./LobbyBackup.jsx";
import Game from "./Game.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import RocketsWin2 from "./endScenes/RocketsWin2.jsx";
import RocketsLose from "./endScenes/RocketsLose.jsx";
import UfosWin2New from "./endScenes/UfosWin2New.jsx";
import UfosLose from "./endScenes/UfosLose.jsx";
import LobbyNew from "./LobbyNew.jsx";

export default function Experience() {
  const gamePhase = useAtomValue(gamePhaseAtom)
  const winner = useAtomValue(winnerAtom)
  const client = useAtomValue(clientAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const params = useParams()
  // test
  // const client = { team: 0 }
  // const gamePhase = 'finished'
  // const winner = 1

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
    { gamePhase === 'lobby' && <LobbyNew/> }
    { (gamePhase === 'pregame' || gamePhase === 'game') && <Game/> }
    {/* win screen experience */}
    { gamePhase === 'finished' && client.team === 0 && winner === 0 && <RocketsWin2/> }
    { gamePhase === 'finished' && client.team === 0 && winner === 1 && <RocketsLose/> }
    { gamePhase === 'finished' && client.team === 1 && winner === 1 && <UfosWin2New/> }
    { gamePhase === 'finished' && client.team === 1 && winner === 0 && <UfosLose/> }
  </>
}