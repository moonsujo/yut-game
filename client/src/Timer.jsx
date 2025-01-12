import { useEffect, useRef, useState } from "react";
import { timeLeftAtom, timerOnAtom, turnExpireTimeAtom } from "./GlobalState";
import { useAtom, useAtomValue } from "jotai";
import { useFrame } from "@react-three/fiber";
import { socket } from "./SocketManager";

const FULL_TIME_REMAINING = 60000;
export default function Timer(props) {
  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const turnExpireTime = useAtomValue(turnExpireTimeAtom)
  const [currentTime, setCurrentTime] = useState(Date.now())
  
  useFrame((state, delta) => {
    console.log('[Timer] currentTime', currentTime, 'turnExpireTime', turnExpireTime)
    if (currentTime < turnExpireTime) {
      setCurrentTime(Date.now())
    } else if (timeLeft <= 0) {
      socket.emit('timeExpired')
    }
  })

  return <group {...props}>
    <mesh name='background-outer'>
      <boxGeometry args={[2, 0.01, 0.5]}/>
      <meshStandardMaterial color='yellow'/>
    </mesh>
    <mesh name='background-outer'>
      <boxGeometry args={[1.9, 0.02, 0.4]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh name='time-left' position={[-0.9 * (1 - (turnExpireTime - currentTime) / FULL_TIME_REMAINING), 0, 0]}>
      <boxGeometry args={[1.8 * ((turnExpireTime - currentTime) / FULL_TIME_REMAINING), 0.03, 0.3]}/>
      <meshStandardMaterial color={ timeLeft < 10 ? 'red' : 'yellow' }/>
    </mesh>
  </group>
}