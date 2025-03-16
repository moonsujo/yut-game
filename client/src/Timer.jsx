import { useEffect, useRef, useState } from "react";
import { hasTurnAtom, pauseGameAtom, remainingTimeAtom, timeLeftAtom, timerAtom, timerOnAtom, turnExpireTimeAtom, turnStartTimeAtom } from "./GlobalState";
import { useAtom, useAtomValue } from "jotai";
import { useFrame } from "@react-three/fiber";
import { socket } from "./SocketManager";
import { useAnimationPlaying } from "./hooks/useAnimationPlaying";

export default function Timer({ position, scale, boxArgs, heightMultiplier }) {
  const [turnStartTime, setTurnStartTime] = useAtom(turnStartTimeAtom)
  const [turnExpireTime, setTurnExpireTime] = useAtom(turnExpireTimeAtom)
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom)
  const paused = useAtomValue(pauseGameAtom)
  const timer = useAtomValue(timerAtom)
  const animationPlaying = useAnimationPlaying()
  
  useFrame(() => {
    if (turnExpireTime) {
      if (!paused) {
        setRemainingTime(Math.max(turnExpireTime - Date.now(), 0))
      }
    }
  })

  const positionZMultiplier = boxArgs[2]/2

  return turnExpireTime && timer && !animationPlaying && <group>
    <mesh name='time-left' scale={scale} position={[position[0], position[1], position[2] + heightMultiplier * positionZMultiplier * (1 - remainingTime / (turnExpireTime - turnStartTime))]}>
      <boxGeometry args={[boxArgs[0], boxArgs[1], heightMultiplier * boxArgs[2] * remainingTime / (turnExpireTime - turnStartTime)]}/>
      <meshStandardMaterial color={ remainingTime < (0.2 * (turnExpireTime - turnStartTime)) ? 'red' : 'yellow' }/>
    </mesh>
  </group>
}