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

  // Asteroids
  // speed ratio: 2 : 1
  const menhir0 = useRef()
  const menhir0ResetTime = 13
  const menhir0Origin = [5, 0, -2]
  const menhir0SpeedX = 1
  const menhir0SpeedZ = 0.5
  const menhir1 = useRef()
  const menhir1ResetTime = 28
  const menhir1Origin = [9, 0, -2]
  const menhir1SpeedX = 0.6
  const menhir1SpeedZ = 0.4
  const menhir2 = useRef()
  const menhir2ResetTime = 20
  const menhir2Origin = [22, 0, -2]
  const menhir2SpeedX = 1.5
  const menhir2SpeedZ = 0.9
  const menhir3 = useRef()
  const menhir3ResetTime = 40
  const menhir3Origin = [26, 0, -2]
  const menhir3SpeedX = 1.2
  const menhir3SpeedZ = 0.6
  // behind menhir3
  const menhir5 = useRef()
  const menhir5ResetTime = 40
  const menhir5Origin = [32, 0, -5]
  const menhir5SpeedX = 1.2
  const menhir5SpeedZ = 0.6
  // behind menhir5
  const menhir10 = useRef()
  const menhir10ResetTime = 40
  const menhir10Origin = [38, 0, -8]
  const menhir10SpeedX = 1.2
  const menhir10SpeedZ = 0.6
  // behind menhir10
  const menhir11 = useRef()
  const menhir11ResetTime = 40
  const menhir11Origin = [44, 0, -11]
  const menhir11SpeedX = 1.2
  const menhir11SpeedZ = 0.6
  // behind menhir11
  const menhir12 = useRef()
  const menhir12ResetTime = 40
  const menhir12Origin = [50, 0, -14]
  const menhir12SpeedX = 1.2
  const menhir12SpeedZ = 0.6

  const menhir4 = useRef()
  const menhir4ResetTime = 35
  const menhir4Origin = [24, 0, 4]
  const menhir4SpeedX = 0.8
  const menhir4SpeedZ = 0.5
  // behind menhir2
  const menhir6 = useRef()
  const menhir6ResetTime = 20
  const menhir6Origin = [22, 0, -5]
  const menhir6SpeedX = 1.5
  const menhir6SpeedZ = 0.75
  // behind menhir1
  const menhir7 = useRef()
  const menhir7ResetTime = 28
  const menhir7Origin = [15, 0, -6]
  const menhir7SpeedX = 0.6
  const menhir7SpeedZ = 0.4
  // behind menhir4
  const menhir8 = useRef()
  const menhir8ResetTime = 35
  const menhir8Origin = [28, 0, 2]
  const menhir8SpeedX = 0.8
  const menhir8SpeedZ = 0.4
  // behind menhir8
  const menhir9 = useRef()
  const menhir9ResetTime = 35
  const menhir9Origin = [32, 0, 0]
  const menhir9SpeedX = 0.8
  const menhir9SpeedZ = 0.4

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

    // Asteroid 0
    menhir0.current.position.x = menhir0Origin[0] - (time % menhir0ResetTime) * menhir0SpeedX
    menhir0.current.position.z = menhir0Origin[2] + (time % menhir0ResetTime) * menhir0SpeedZ
    menhir0.current.rotation.y = time + 0.1
    // Asteroid 1
    menhir1.current.position.x = menhir1Origin[0] - (time % menhir1ResetTime) * menhir1SpeedX
    menhir1.current.position.z = menhir1Origin[2] + (time % menhir1ResetTime) * menhir1SpeedZ
    menhir1.current.rotation.y = time + 0.4
    // Asteroid 2
    menhir2.current.position.x = menhir2Origin[0] - (time % menhir2ResetTime) * menhir2SpeedX
    menhir2.current.position.z = menhir2Origin[2] + (time % menhir2ResetTime) * menhir2SpeedZ
    menhir2.current.rotation.y = time + 0.7
    // Asteroid 3
    menhir3.current.position.x = menhir3Origin[0] - (time % menhir3ResetTime) * menhir3SpeedX
    menhir3.current.position.z = menhir3Origin[2] + (time % menhir3ResetTime) * menhir3SpeedZ
    menhir3.current.rotation.y = time + 1.1
    // Asteroid 4
    menhir4.current.position.x = menhir4Origin[0] - (time % menhir4ResetTime) * menhir4SpeedX
    menhir4.current.position.z = menhir4Origin[2] + (time % menhir4ResetTime) * menhir4SpeedZ
    menhir4.current.rotation.y = time + 1.3
    // Asteroid 5
    menhir5.current.position.x = menhir5Origin[0] - (time % menhir5ResetTime) * menhir5SpeedX
    menhir5.current.position.z = menhir5Origin[2] + (time % menhir5ResetTime) * menhir5SpeedZ
    menhir5.current.rotation.y = time + 1.9
    // Asteroid 6
    menhir6.current.position.x = menhir6Origin[0] - (time % menhir6ResetTime) * menhir6SpeedX
    menhir6.current.position.z = menhir6Origin[2] + (time % menhir6ResetTime) * menhir6SpeedZ
    menhir6.current.rotation.y = time + 1.9
    // Asteroid 7
    menhir7.current.position.x = menhir7Origin[0] - (time % menhir7ResetTime) * menhir7SpeedX
    menhir7.current.position.z = menhir7Origin[2] + (time % menhir7ResetTime) * menhir7SpeedZ
    menhir7.current.rotation.y = time + 1.9
    // Asteroid 8
    menhir8.current.position.x = menhir8Origin[0] - (time % menhir8ResetTime) * menhir8SpeedX
    menhir8.current.position.z = menhir8Origin[2] + (time % menhir8ResetTime) * menhir8SpeedZ
    menhir8.current.rotation.y = time + 1.9
    // Asteroid 9
    menhir9.current.position.x = menhir9Origin[0] - (time % menhir9ResetTime) * menhir9SpeedX
    menhir9.current.position.z = menhir9Origin[2] + (time % menhir9ResetTime) * menhir9SpeedZ
    menhir9.current.rotation.y = time + 1.9
    // Asteroid 10
    menhir10.current.position.x = menhir10Origin[0] - (time % menhir10ResetTime) * menhir10SpeedX
    menhir10.current.position.z = menhir10Origin[2] + (time % menhir10ResetTime) * menhir10SpeedZ
    menhir10.current.rotation.y = time + 1.9
    // Asteroid 11
    menhir11.current.position.x = menhir11Origin[0] - (time % menhir11ResetTime) * menhir11SpeedX
    menhir11.current.position.z = menhir11Origin[2] + (time % menhir11ResetTime) * menhir11SpeedZ
    menhir11.current.rotation.y = time + 1.9
    // Asteroid 12
    menhir11.current.position.x = menhir11Origin[0] - (time % menhir11ResetTime) * menhir11SpeedX
    menhir11.current.position.z = menhir11Origin[2] + (time % menhir11ResetTime) * menhir11SpeedZ
    menhir11.current.rotation.y = time + 1.9
  })

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
    <group name='asteroids' position={[-7, -1, -7]}>
      <group ref={menhir0}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      <group ref={menhir1}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      <group ref={menhir2}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      <group ref={menhir3}  scale={2}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      <group ref={menhir4}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      <group ref={menhir5}  scale={2}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir2 */}
      <group ref={menhir6}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir1 */}
      <group ref={menhir7}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir4 */}
      <group ref={menhir8}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir8 */}
      <group ref={menhir9}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir5 */}
      <group ref={menhir10}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
      {/* behind menhir10 */}
      <group ref={menhir11}>
        <Menhir scale={[0.02, 0.02, 0.07]} rotation={[Math.PI/2, 0, Math.PI/3]}/>
      </group>
    </group>
  </group>
}