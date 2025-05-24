import { Float, Text3D } from "@react-three/drei";
import { useAtomValue } from "jotai";
import { teamsAtom } from "../GlobalState";
import { formatName } from "../helpers/helpers";
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

function getScore(team) {
  let score = 0
  for (const token of team.pieces) {
    if (token.tile === 29) {
      score++
    }
  }
  return score
}

export default function RocketsWin2() {
  // Hooks
  const [CreateFirework] = useFireworksShader();

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

  // Animation
  const ufos = []
  const numUfos = 5
  const resetTime = 17
  const shiftTime = resetTime / numUfos
  for (let i = 0; i < numUfos; i++) {
    ufos.push(useRef())
  }
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    rocket0.current.position.y = Math.cos(time) * 0.05
    rocket1.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.y = Math.cos(time) * 0.05
    rocket2.current.position.x = Math.sin(time) * 0.05
    rocket3.current.position.y = Math.cos(time) * 0.05

    // Ufos
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
        ufo.current.scale.x = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
        ufo.current.scale.y = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
        ufo.current.scale.z = 1 - 0.5 * ((t - 1) / (resetTime - 1 - 1))
      } else {
        ufo.current.scale.x = Math.max(resetTime - t - 0.5, 0)
        ufo.current.scale.y = Math.max(resetTime - t - 0.5, 0)
        ufo.current.scale.z = Math.max(resetTime - t - 0.5, 0)
      }
      ufo.current.position.x = Math.cos(timeSlowed) * 5 * Math.exp(-0.2 * timeSlowed)
      ufo.current.position.y = Math.sin(timeSlowed) * 5 * Math.exp(-0.2 * timeSlowed)
      ufo.current.position.z = 0
      // ufo.current.rotation.x = Math.PI/2 // removing this makes scene awesome
      ufo.current.rotation.y = timeSlowed
      ufo.current.rotation.x = timeSlowed / 8
    }
  })

  // Fireworks
  useEffect(() => {
    const intervalFireworks = setInterval(() => {
      const constellationChance = 0.1
      const planetChance = 0.2
      if (document.hasFocus()) {
        const count = Math.round(700 + Math.random() * 400);
        let position;
        let size;
        let radius;
        if (device === 'portrait') {
          const radians = Math.random() * Math.PI*2
          position = new THREE.Vector3(
              Math.cos(radians) * generateRandomNumberInRange(4, 1), 
              -5,
              Math.sin(radians) * generateRandomNumberInRange(9, 1.5) - 2, 
          )
          size = 0.1 + Math.random() * 0.15
          radius = 1.5 + Math.random() * 1.0
        } else {
          let angle = Math.PI * 2 * Math.random()
          let radiusCircle = 5
          position = new THREE.Vector3(
              // generateRandomNumberInRange(0, 20) * (Math.random() > 0.5 ? 1 : -1), 
              // generateRandomNumberInRange(0, 5) * (Math.random() > 0.5 ? 1 : -1) + 15,
              // 0, 
              Math.cos(angle) * radiusCircle * 1.7,
              -5,
              Math.sin(angle) * radiusCircle
          )
          size = 0.3 + Math.random() * 0.3
          radius = 2.0 + Math.random() * 1.0
        }
        const color = new THREE.Color();
        color.setHSL(Math.random(), 0.7, 0.4)
  
        let type = Math.random()
        if (type < constellationChance) {
          CreateFirework({ count, position, size, radius, color, type: 'constellation' });
        } else if (type > constellationChance && type < planetChance) {
          CreateFirework({ count, position, size, radius, color, type: 'planet' });
        } else {
          CreateFirework({ count, position, size, radius, color });
        }
      }
    }, 200)
    return (() => {
      clearInterval(intervalFireworks);
    })
  }, [])

  return <group>
    <group name='setup'>
      <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]} controlsEnabled/>
    </group>
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[-Math.PI/2, 0, 0]}
      size={0.5} 
      height={0.003} 
      position={[-12.5, 14, 0]} // camera is shifted up (y-axis)
    >
      {`MISSION ACCOMPLISHED!`}
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
              {value.name}
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
    <group name='scene-0' position={[-9, -5, 0]} scale={0.8}>
      <group name='pieces' position={[0.4, -1.9, 0.8]} rotation={[-Math.PI/2, 0, 0]}>
        {ufos.map((value, index) => {
          return <group ref={value}>
            <Ufo position={[0, 0, 0]}/>
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
    </group>
    {/* scene 1 in the middle */}
    <group name='scene-1' scale={1} position={[0, 0, 0.5]}>
      <group name='earth-wrapper' rotation={[-Math.PI/2, 0, Math.PI/16]} ref={earth}>
        <Earth scale={2} rotation={[0, 0, 0]} position={[0, 0, 0]} showParticles={false}/>
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
  </group>
}