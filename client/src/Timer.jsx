import { useEffect, useRef, useState } from "react";
import { animationPlayingAtom, hasTurnAtom, pauseGameAtom, remainingTimeAtom, timeLeftAtom, timerOnAtom, turnExpireTimeAtom, turnStartTimeAtom } from "./GlobalState";
import { useAtom, useAtomValue } from "jotai";
import { useFrame } from "@react-three/fiber";
import { socket } from "./SocketManager";

export default function Timer({ position, scale, boxArgs, heightMultiplier }) {
  // console.log('[Timer]')
  const [turnStartTime, setTurnStartTime] = useAtom(turnStartTimeAtom)
  const [turnExpireTime, setTurnExpireTime] = useAtom(turnExpireTimeAtom)
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom)
  const paused = useAtomValue(pauseGameAtom)
  
  useFrame(() => {
    if (turnExpireTime) {
      if (!paused) {
        setRemainingTime(Math.max(turnExpireTime - Date.now(), 0))
      }
    }
  })

  const positionZMultiplier = boxArgs[2]/2

  return turnExpireTime && <group>
    {/* <mesh name='background-outer'>
      <boxGeometry args={[2, 0.01, 0.5]}/>
      <meshStandardMaterial color='yellow'/>
    </mesh>
    <mesh name='background-outer'>
      <boxGeometry args={[1.9, 0.02, 0.4]}/>
      <meshStandardMaterial color='black'/>
    </mesh> */}
    <mesh name='time-left' scale={scale} position={[position[0], position[1], position[2] + heightMultiplier * positionZMultiplier * (1 - remainingTime / (turnExpireTime - turnStartTime))]}>
      <boxGeometry args={[boxArgs[0], boxArgs[1], heightMultiplier * boxArgs[2] * remainingTime / (turnExpireTime - turnStartTime)]}/>
      <meshStandardMaterial color={ remainingTime < (0.2 * (turnExpireTime - turnStartTime)) ? 'red' : 'yellow' }/>
    </mesh>
  </group>
}