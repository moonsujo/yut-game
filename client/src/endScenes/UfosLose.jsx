import { Float, Text3D } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { teamsAtom } from "../GlobalState";
import { formatName, getScore } from "../helpers/helpers";
import Rocket from "../meshes/Rocket";
import Earth from "../meshes/Earth";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Ufo from "../meshes/Ufo";
import MilkyWay from "../shader/MilkyWay";
import * as THREE from 'three';
import Portal from "../Portal";
import GameCamera from "../GameCamera";
import layout from "../layout";
import { useFireworksShader } from "../shader/fireworks/FireworksShader";
import UfoNewBoss from "../meshes/UfoNewBoss";
import UfoNewBossSmall from "../meshes/UfoNewBossSmall";
import Menhir from "../meshes/Menhir";

export default function UfosLose() {
  console.log('ufos lose')
  // Displays / Test
  const scene1On = true

  // Hooks
  const [CreateFirework] = useFireworksShader();
  // attach rocks in front of the meteor

  // State
  const device = 'landscapeDesktop'
  const teamRockets = useAtomValue(teamsAtom)[0]
  const teamUfos = useAtomValue(teamsAtom)[1]
  let rocketsScore = getScore(teamRockets)
  let ufosScore = getScore(teamUfos)
  const earth = useRef()
  const rocket0 = useRef()
  const rocket1 = useRef()
  const rocket2 = useRef()
  const rocket3 = useRef()

  // Animation - Ufos lose
  const ufos = []
  const numUfos = 7
  const resetTime = 17
  const shiftTime = resetTime / numUfos
  for (let i = 0; i < numUfos; i++) {
    ufos.push(useRef())
  }
  const asteroids = []
  const numAsteroidsRow = 10
  const numAsteroidsColumn = 10
  const asteroidResetTime = 10
  const asteroidRowSpace = 7
  const asteroidColumnSpace = 8
  for (let i = 0; i < numAsteroidsRow * numAsteroidsColumn; i++) {
    asteroids.push(useRef())
  }

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    rocket0.current.position.y = Math.cos(time) * 0.05
    rocket1.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.x = Math.sin(time) * 0.05
    rocket3.current.position.y = Math.cos(time) * 0.05

    // Ufos
    if (scene1On) {
      for (let i = 0; i < numUfos; i++) {
        let t = (time + i * shiftTime) % resetTime
        let timeSlowed = t / 2
        const ufo = ufos[i]
        // scale
        if (t < 1) {
          ufo.current.scale.x = Math.min(t, 1)
          ufo.current.scale.y = Math.min(t, 1)
          ufo.current.scale.z = Math.min(t, 1)
        } else if (t < (resetTime - 1)) {
          // resetTime - 1 = max
          // resetTime - 1 - t
          // 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.x = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.y = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
          ufo.current.scale.z = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
        } else {
          ufo.current.scale.x = Math.max(resetTime - t - 0.7, 0)
          ufo.current.scale.y = Math.max(resetTime - t - 0.7, 0)
          ufo.current.scale.z = Math.max(resetTime - t - 0.7, 0)
        }
        ufo.current.position.x = -Math.cos(timeSlowed) * 7 * Math.exp(-0.2 * timeSlowed)
        ufo.current.position.y = Math.sin(timeSlowed) * 5 * Math.exp(-0.2 * timeSlowed)
        ufo.current.position.z = 0
        // ufo.current.rotation.x = Math.PI/2 // removing this makes scene awesome
        ufo.current.rotation.y = -timeSlowed
        ufo.current.rotation.x = timeSlowed / 4
        ufo.current.rotation.z = -timeSlowed / 16
        // ufo.current.rotation.x = timeSlowed / 8
      }
    }

    // Asteroid
    for (let i = 0; i < numAsteroidsRow; i++) {
      for (let j = 0; j < numAsteroidsColumn; j++) {
        const asteroid = asteroids[i*numAsteroidsRow+j]
        asteroid.current.position.x = -time % asteroidResetTime + i * asteroidRowSpace + j * 3
        asteroid.current.position.z = (time % asteroidResetTime) / 2 + j * asteroidColumnSpace
      }
    }
  })

  return <group>
    <group name='setup'>
      <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
    </group>
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[-Math.PI/2, 0, 0]}
      size={0.5} 
      height={0.003} 
      position={[-12.5, 14, 0]} // camera is shifted up (y-axis)
    >
      {`LOST IN SPACE!`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    {/* team score and names */}
    <group name='teams' position={[-12.5, 12, 0]}>
      <group name='score' position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[0, 0, 0]} // camera is shifted up (y-axis)
        >
          {`ROCKETS   ${rocketsScore}`}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3, 0, 0]} // camera is shifted up (y-axis)
        >
          {`:`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3.1, 0, 0]} // camera is shifted up (y-axis)
        >
          {`   ${ufosScore}   UFOS`}
          <meshStandardMaterial color='turquoise'/>
        </Text3D>
      </group>
      <group name='player-names' position={[0, -1.5, 0]}>
        <group name='player-names-rockets' position={[0, 0, 0]}>
          { teamRockets.players.map((value, index) => 
            <Text3D
              font="/fonts/Luckiest Guy_Regular.json"
              rotation={[-Math.PI/2, 0, 0]}
              size={0.4} 
              height={0.003} 
              position={[0, 0, 0]} // camera is shifted up (y-axis)
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='red'/>
            </Text3D>
          )}
        </group>
        <group name='player-names-ufos' position={[3.9, 0, 0]}>
          { teamUfos.players.map((value, index) => 
            <Text3D
              font="/fonts/Luckiest Guy_Regular.json"
              rotation={[-Math.PI/2, 0, 0]}
              size={0.4} 
              height={0.003} 
              position={[0, 0, 0]} // camera is shifted up (y-axis)
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='turquoise'/>
            </Text3D>
          )}
        </group>
      </group>
    </group>
    {/* scene 0 on the left */}
    <group name='scene-0' scale={1.5} position={[-13, 0, 7]}>
      <group name='earth-wrapper' rotation={[-Math.PI/2, 0, Math.PI/16]} ref={earth}>
        <Earth scale={2} rotation={[0, 0, 0]} position={[0, 0, 0]} showParticles={false} animate animateSpeed={0.2}/>
      </group>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket0}>
          <Rocket onBoard position={[-1.2, 5, 0.9]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket1}>
          <Rocket onBoard position={[0.9, 5, 0.7]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket2}>
          <Rocket onBoard position={[-1.3, 5, 3.2]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
      <Float rotationIntensity={0.05} speed={5} floatIntensity={0.05}>
        <group ref={rocket3}>
          <Rocket onBoard position={[0.7, 5, 3]} scale={2} rotation={[-Math.PI/12, 0, 0]}/>
        </group>
      </Float>
    </group>
    {/* scene 1 in the middle*/}
    { scene1On && <group name='scene-1' position={[0, 0, -1]} scale={1.3}>
      <group name='pieces' position={[-0.5, -1.5, 0.8]} rotation={[-Math.PI/2, 0, 0]}>
        {ufos.map((value, index) => {
          return <group ref={value}>
            <UfoNewBossSmall position={[0, 0, 0]} enlightened={false}/>
            {/* <Ufo position={[0, 0, 0]} smiling={false} scale={[4, 4, 4]}/> */}
          </group>
        })}
      </group>
      <MilkyWay name='milky-way'// will not show without a camera
        rotation={[-Math.PI/2, 0, 0]} 
        position={[0, -2, 0]}
        scale={2}
        brightness={0.7}
        colorTint1={new THREE.Vector4(0.80, 0.49, 0.19, 1.0)} // small
        colorTint3={new THREE.Vector4(1.0, 1.0, 1.0, 0.7)} // medium
        colorTint2={new THREE.Vector4(1.0, 1.0, 1.0, 0.5)} // large
      />
      <Portal position={[0, 0.3, -3]} scale={1} rotation={[-Math.PI/2, 0, 0]}/>
    </group> }
    {/* room id and buttons */}
    <group name='action-buttons' position={[7.5, 0, 2]} scale={0.9}>
      <group name='room-id' >
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.03} 
          position={[0, 0, 0]} // camera is shifted up (y-axis)
        >
          ROOM ID: ABCD
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <group name='run-it-back-button' rotation={[-Math.PI/2, 0, 0]} position={[2.1, 0, 1]}>
        {/* background-outer */}
        {/* background-inner */}
        {/* text */}
        <mesh>
          <boxGeometry args={[4.2, 1.0, 0.01]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh>
          <boxGeometry args={[4.1, 0.9, 0.02]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={0.5}
          height={0.03} 
          position={[-1.85, -0.25, 0]} // camera is shifted up (y-axis)
        >
          PLAY AGAIN
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <group name='share-results-button' rotation={[-Math.PI/2, 0, 0]} position={[2.6, 0, 2.4]}>
        {/* background-outer */}
        {/* background-inner */}
        {/* text */}
        <mesh>
          <boxGeometry args={[5.2, 1.0, 0.01]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh>
          <boxGeometry args={[5.1, 0.9, 0.02]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[0, 0, 0]}
          size={0.5}
          height={0.03} 
          position={[-2.35, -0.25, 0]} // camera is shifted up (y-axis)
        >
          SHARE RESULTS
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <group name='discord-button' rotation={[-Math.PI/2, 0, 0]} position={[1.6, 0, 3.8]}>
        <mesh>
          <boxGeometry args={[3.2, 1, 0.01]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh>
          <boxGeometry args={[3.1, 0.9, 0.02]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[0, 0, 0]}
          size={0.5}
          height={0.03} 
          position={[-1.3, -0.25, 0]} // camera is shifted up (y-axis)
        >
          DISCORD
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
    </group>
    {/* background */}
    <group name='asteroids' position={[-7, 0, -7]}>
      { asteroids.map((value, index) => 
        <group ref={value}>
          <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]} position={[0, -1, 0]}/>
        </group>
      )}
    </group>
  </group>
}