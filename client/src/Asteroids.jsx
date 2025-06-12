import { useFrame } from "@react-three/fiber"
import Menhir from "./meshes/Menhir"
import { useRef } from "react"

export default function Asteroids({ position=[-10, -1, -20], scale=1 }) {

  // Asteroids
  // speed ratio: 2 : 1
  const asteroids = []
  const asteroidInfos = []
  const asteroidsNumRow = 10
  const asteroidsNumColumn = 20
  const asteroidResetTime = 30
  const asteroidSpaceX = 7
  const asteroidSpaceZ = 7
  for (let i = 0; i < asteroidsNumRow; i++) {
    for (let j = 0; j < asteroidsNumColumn; j++) {
      const origin = [
        j * asteroidSpaceX + Math.random() * 0.8 * (Math.random() < 0.5 ? 1 : -1), 
        0, 
        i * asteroidSpaceZ + Math.random() * 0.8 * (Math.random() < 0.5 ? 1 : -1)
      ]
      const timeShift = i
      const speedX = 1.0 + Math.random() * 0.2 * (Math.random() < 0.5 ? 1 : -1)
      const speedZ = 0.5 + Math.random() * 0.1 * (Math.random() < 0.5 ? 1 : -1)
      asteroids.push(useRef())
      asteroidInfos.push({
        origin,
        timeShift,
        speedX,
        speedZ
      })
    }
  }

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Asteroids
    // traversal order: left to right, top to bottom
    for (let i = 0; i < asteroidsNumRow; i++) {
      for (let j = 0; j < asteroidsNumColumn; j++) {
        const asteroid = asteroids[i * asteroidsNumColumn + j]
        const asteroidInfo = asteroidInfos[i * asteroidsNumColumn + j]
        asteroid.current.position.x = asteroidInfo.origin[0] - ((time + asteroidInfo.timeShift) % asteroidResetTime) * asteroidInfo.speedX
        asteroid.current.position.z = asteroidInfo.origin[2] + ((time + asteroidInfo.timeShift) % asteroidResetTime) * asteroidInfo.speedZ
        asteroid.current.rotation.y = time + asteroidInfo.timeShift
      }
    }
  })

  return <group name='asteroids' position={position}>
    { asteroids.map((value, index) => {
      return <group ref={value} scale={scale} key={index}>
        <Menhir scale={[0.01, 0.01, 0.02]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
    })}
  </group>
}