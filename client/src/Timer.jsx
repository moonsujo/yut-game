import { useEffect, useRef, useState } from "react";
import { hasTurnAtom, pauseGameAtom, timeLeftAtom, timerOnAtom, turnExpireTimeAtom, turnStartTimeAtom } from "./GlobalState";
import { useAtom, useAtomValue } from "jotai";
import { useFrame } from "@react-three/fiber";
import { socket } from "./SocketManager";

export default function Timer(props) {
  // console.log('[Timer]')
  const [turnStartTime, setTurnStartTime] = useAtom(turnStartTimeAtom)
  const [turnExpireTime, setTurnExpireTime] = useAtom(turnExpireTimeAtom)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const paused = useAtomValue(pauseGameAtom)
  
  useFrame(() => {
    if (turnExpireTime) {
      if (!paused && currentTime < turnExpireTime) {
        setCurrentTime(Date.now())
      } else {
        setTurnStartTime(null)
        setTurnExpireTime(null)
      }
    }
  })

  const remainingTime = Math.min(turnExpireTime - turnStartTime, turnExpireTime - currentTime)
  return turnExpireTime && <group {...props}>
    <mesh name='background-outer'>
      <boxGeometry args={[2, 0.01, 0.5]}/>
      <meshStandardMaterial color='yellow'/>
    </mesh>
    <mesh name='background-outer'>
      <boxGeometry args={[1.9, 0.02, 0.4]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh name='time-left' position={[-0.9 * (1 - remainingTime / (turnExpireTime - turnStartTime)), 0, 0]}>
      <boxGeometry args={[1.8 * remainingTime / (turnExpireTime - turnStartTime), 0.03, 0.3]}/>
      <meshStandardMaterial color={ remainingTime < (0.2 * (turnExpireTime - turnStartTime)) ? 'red' : 'yellow' }/>
    </mesh>
  </group>
}