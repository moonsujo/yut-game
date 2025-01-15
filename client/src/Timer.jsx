import { useEffect, useRef, useState } from "react";
import { hasTurnAtom, timeLeftAtom, timerOnAtom, turnExpireTimeAtom } from "./GlobalState";
import { useAtom } from "jotai";
import { useFrame } from "@react-three/fiber";
import { socket } from "./SocketManager";

export default function Timer(props) {
  // console.log('[Timer]')
  const [turnExpireTime, setTurnExpireTime] = useAtom(turnExpireTimeAtom)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [startTime, setStartTime] = useState(null)
  
  useFrame((state, delta) => {
    // console.log('[Timer] turn expire time - current time', turnExpireTime)
    if (turnExpireTime) {
      if (!startTime) {
        setStartTime(Date.now())
      }
      if (currentTime < turnExpireTime) {
        setCurrentTime(Date.now())
      } else {
        setTurnExpireTime(null)
        setStartTime(null)
      }
    }
  })

  return turnExpireTime && <group {...props}>
    <mesh name='background-outer'>
      <boxGeometry args={[2, 0.01, 0.5]}/>
      <meshStandardMaterial color='yellow'/>
    </mesh>
    <mesh name='background-outer'>
      <boxGeometry args={[1.9, 0.02, 0.4]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh name='time-left' position={[-0.9 * (1 - (turnExpireTime - currentTime) / (turnExpireTime - startTime)), 0, 0]}>
      <boxGeometry args={[1.8 * (turnExpireTime - currentTime) / (turnExpireTime - startTime), 0.03, 0.3]}/>
      <meshStandardMaterial color={ (turnExpireTime - currentTime) < (0.2 * (turnExpireTime - startTime)) ? 'red' : 'yellow' }/>
    </mesh>
  </group>
}