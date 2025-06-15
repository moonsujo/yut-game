import { Float, Text3D } from "@react-three/drei";
import { useAtomValue, useSetAtom } from "jotai";
import { deviceAtom, showBlackhole2Atom, showBlackholeAtom, showGalaxyBackgroundAtom, showRedGalaxyAtom, teamsAtom } from "../GlobalState";
import { formatName, getScore } from "../helpers/helpers";
import Rocket from "../meshes/Rocket";
import Earth from "../meshes/Earth";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import GameCamera from "../GameCamera";
import layout from "../layout";
import UfoNewBossSmall from "../meshes/UfoNewBossSmall";
import MeteorsRealShader from "../shader/meteorsReal/MeteorsRealShader";
import Asteroids from "../Asteroids";
import PlayAgainButton from "./PlayAgainButton";
import ShareLinkButton from "./ShareLinkButton";
import DiscordButton from "./DiscordButton";
import { useParams } from "wouter";
import useResponsiveSetting from "../hooks/useResponsiveSetting";

export default function UfosLose() {
  
  // State
  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  // positions in layout
  // apply in components
  // title, team scores, names
  // center scene
  // action buttons
  // asteroids stay the same
  const params = useParams();
  const teamRockets = useAtomValue(teamsAtom)[0]
  const teamUfos = useAtomValue(teamsAtom)[1]
  let rocketsScore = getScore(teamRockets)
  let ufosScore = getScore(teamUfos)
  const earth = useRef()
  const rocket0 = useRef()
  const rocket1 = useRef()
  const rocket2 = useRef()
  const rocket3 = useRef()
  const setShowGalaxy = useSetAtom(showGalaxyBackgroundAtom)
  const setShowBlackhole = useSetAtom(showBlackholeAtom)
  const setShowRedGalaxy = useSetAtom(showRedGalaxyAtom)
  const setShowBlackhole2 = useSetAtom(showBlackhole2Atom)

  // Animation - Ufos lose
  const ufos = []
  const numUfos = 7
  const resetTime = 17
  const shiftTime = resetTime / numUfos
  for (let i = 0; i < numUfos; i++) {
    ufos.push(useRef())
  }

  useEffect(() => {
    setShowGalaxy(false)
    setShowBlackhole(true)
    setShowRedGalaxy(false)
    setShowBlackhole2(false)
  }, [])

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
        ufo.current.scale.x = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
        ufo.current.scale.y = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
        ufo.current.scale.z = 1 - 0.7 * ((t - 1) / (resetTime - 1 - 1))
      } else {
        ufo.current.scale.x = Math.max(resetTime - t - 0.7, 0)
        ufo.current.scale.y = Math.max(resetTime - t - 0.7, 0)
        ufo.current.scale.z = Math.max(resetTime - t - 0.7, 0)
      }
      ufo.current.position.x = -Math.cos(timeSlowed * 1.1) * 7 * Math.exp(-0.2 * timeSlowed)
      ufo.current.position.y = Math.sin(timeSlowed * 1.1) * 5 * Math.exp(-0.2 * timeSlowed)
      ufo.current.position.z = 0
      // ufo.current.rotation.x = Math.PI/2 // removing this makes scene awesome
      ufo.current.rotation.y = -timeSlowed
      ufo.current.rotation.x = timeSlowed / 4
      ufo.current.rotation.z = -timeSlowed / 16
      // ufo.current.rotation.x = timeSlowed / 8
    }
  })

  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  return <group>
    <group name='setup'>
      <GameCamera position={layout[device].camera.position}/>
    </group>
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].ufoLoseScene.title.position}
      rotation={layout[device].ufoLoseScene.title.rotation}
      size={layout[device].ufoLoseScene.title.fontSize} 
      height={0.003} 
    >
      {`LOST IN SPACE!`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    {/* team score and names */}
    <group name='teams' 
    position={layout[device].ufoLoseScene.teams.position}
    scale={layout[device].ufoLoseScene.teams.scale}
    >
      <group name='score' position={[0, 0, 0]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[0, 0, 0]} // camera is shifted up (y-axis)
        >
          {`ROCKETS     ${rocketsScore}`}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3.3, 0, 0]} // camera is shifted up (y-axis)
        >
          {`:`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4} 
          height={0.003} 
          position={[3.5, 0, 0]} // camera is shifted up (y-axis)
        >
          {`   ${ufosScore}     UFOS`}
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
              position={[0, 0, index * 0.5]}
              key={index}
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
              position={[0, 0, index * 0.5]}
              key={index}
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='turquoise'/>
            </Text3D>
          )}
        </group>
      </group>
    </group>
    {/* scene 0 on the left */}
    <group name='scene-0' 
    position={layout[device].ufoLoseScene.scene0.position} 
    scale={layout[device].ufoLoseScene.scene0.scale}>
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
    <group name='scene-1' 
    position={layout[device].ufoLoseScene.scene1.position} 
    scale={layout[device].ufoLoseScene.scene1.scale}>
      <group name='pieces' position={[-1, -1.5, 0]} rotation={[-Math.PI/2, 0, 0]}>
        {ufos.map((value, index) => {
          return <group ref={value} key={index}>
            <UfoNewBossSmall position={[0, 0, 0]} enlightened={false} smiling={false}/>
            {/* <Ufo position={[0, 0, 0]} smiling={false} scale={[4, 4, 4]}/> */}
          </group>
        })}
      </group>
    </group>
    {/* room id and buttons */}
    <group name='action-buttons' 
    position={layout[device].ufoLoseScene.actionButtons.position} 
    scale={layout[device].ufoLoseScene.actionButtons.scale}>
      <group name='room-id'>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={layout[device].endSceneActionButtons.roomId.position}
          rotation={layout[device].endSceneActionButtons.roomId.rotation}
          size={layout[device].endSceneActionButtons.roomId.fontSize}
          height={0.03} 
        >
          ROOM ID: {`${params.id}`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      <PlayAgainButton 
      position={layout[device].endSceneActionButtons.playAgainButton.position} 
      rotation={layout[device].endSceneActionButtons.playAgainButton.rotation} 
      device={device}/>
      <ShareLinkButton 
      position={layout[device].endSceneActionButtons.shareLinkButton.position} 
      rotation={layout[device].endSceneActionButtons.shareLinkButton.rotation} 
      device={device}/>
      <DiscordButton
      position={layout[device].endSceneActionButtons.discordButton.position}
      rotation={layout[device].endSceneActionButtons.discordButton.rotation}
      device={device}/>
    </group>
    {/* background */}
    <Asteroids position={[-10, -5, -20]} scale={1.5}/>
    <MeteorsRealShader color={meteorShaderColor}/>
  </group>
}