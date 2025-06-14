import { Float, MeshDistortMaterial, OrthographicCamera, Text3D } from "@react-three/drei";
import GameCamera from "../GameCamera";
import layout from "../layout";
import { useAtomValue, useSetAtom } from "jotai";
import { clientAtom, deviceAtom, showBlackhole2Atom, showBlackholeAtom, showGalaxyBackgroundAtom, showRedGalaxyAtom, teamsAtom } from "../GlobalState";
import { formatName, getScore } from "../helpers/helpers";
import UfoNew from "../meshes/UfoNew";
import Earth from "../meshes/Earth";
import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { animated, useSpring } from "@react-spring/three";
import Rocket from "../meshes/Rocket";
import FragmentShader from '../shader/ufoBeam/fragment.glsl'
import VertexShader from '../shader/ufoBeam/vertex.glsl'
import gsap from "gsap";
import UfoNewBoss from "../meshes/UfoNewBoss";
import Asteroids from "../Asteroids";
import { socket } from "../SocketManager";
import { useParams } from "wouter";
import axios from "axios";
import DiscordButton from "./DiscordButton";
import ShareLinkButton from "./ShareLinkButton";
import PlayAgainButton from "./PlayAgainButton";
import useResponsiveSetting from "../hooks/useResponsiveSetting";

export default function RocketsLose() {

  // State
  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const teamRockets = useAtomValue(teamsAtom)[0]
  const teamUfos = useAtomValue(teamsAtom)[1]
  let rocketsScore = getScore(teamRockets)
  let ufosScore = getScore(teamUfos)
  const setShowGalaxy = useSetAtom(showGalaxyBackgroundAtom)
  const setShowBlackhole = useSetAtom(showBlackholeAtom)
  const setShowRedGalaxy = useSetAtom(showRedGalaxyAtom)
  const setShowBlackhole2 = useSetAtom(showBlackhole2Atom)

  // Ref
  const ufo0 = useRef()
  const ufo1 = useRef()
  const ufoBoss = useRef()

  // Ring animation resources
  // ufo0
  const rings = []
  const numRings = 4
  const resetTime = 3
  const shiftTime = resetTime / numRings
  // ufo1
  const rings1 = []
  const numRings1 = 4
  const resetTime1 = 3
  const shiftTime1 = resetTime1 / numRings1
  
  for (let i = 0; i < numRings; i++) {
    rings.push(useRef())
  }
  for (let i = 0; i < numRings1; i++) {
    rings1.push(useRef())
  }

  // Animation - useEffect, gsap progress
  const progressRef = useRef({ value: 0 })
  const pMax0 = 0.1
  const pMax1 = 0.2
  const pMax2 = 0.4
  const pMax3 = 0.5
  const pMax4 = 0.55
  // const pMax5 = 0.8
  // const pMax6 = 1.0

  // rocket rise 1
  const pRocketRise = 0.6
  const pRocketCrashGlass = 0.7
  const pRocketDisappear = 0.80
  const pRocketDisappearEnd = 0.86
  const pRocketEnd = 1.0
  // rocket rise 2
  const pRocketRise2 = 0.62
  const pRocketCrashGlass2 = 0.7
  const pRocketDisappear2 = 0.80
  const pRocketDisappearEnd2 = 0.86
  const pRocketEnd2 = 1.0
  // rocket rise 3
  const pRocketRise3 = 0.62
  const pRocketCrashGlass3 = 0.7
  const pRocketDisappear3 = 0.80
  const pRocketDisappearEnd3 = 0.86
  const pRocketEnd3 = 1.0

  const pGlassShineStart = 0.75
  const pGlassShineMax = 0.76
  const pGlassShineEnd = 0.77
  const glassOpacityMax = 0.5

  const pRightEyeCloseStart = 0.92
  const pRightEyeCloseEnd = 0.93
  const pRightEyeOpenEnd = 0.94

  useEffect(() => {
    gsap.to(progressRef.current, {
      value: 1,
      duration: 10,
      ease: 'linear',
      repeat: -1,
      onUpdate: () => {
        const p = progressRef.current.value

        // Interpolate position and scale manually
        let rocketGroupPosition, 
        rocketGroupScale, 
        rocket0Pos, 
        rocket0Scale,
        rocket1Pos, 
        rocket1Scale,
        rocket2Pos, 
        rocket2Scale,
        glassOpacity,
        rightEyeScale

        if (p < pMax0) { // 0.0 - 0.2
          rocketGroupPosition = [0, -4, 10]
          rocketGroupScale = 1
        } else if (p > pMax0 && p < pMax1) { // 0.2 - 0.4
          const progress = (p - pMax0) / (pMax1 - pMax0)
          rocketGroupPosition = [0, -4 + 3 * progress, 10 - 7 * progress]
        } else if (p > pMax1 && p < pMax2) { // 0.4 - 0.8
        } else if (p > pMax2 && p < pMax3) { // 0.8 - 1.0; 264 - 297
          const progress = (p - pMax2) / (pMax3 - pMax2)
          rocketGroupPosition = [0, -4 + 3, 10 - 7 - progress * 7]
          rocketGroupScale = 1 - (p - pMax2) / (pMax3 - pMax2)
        } else if (p > pMax3 && p < pMax4) {
          rocketGroupScale = 0
        }
        // } else if (p > pMax4 && p < pMax5) {
        //   const progress = (p - pMax4) / (pMax5 - pMax4)
        //   rocket0Scale = [0.3, 0.3, 0.3]
        //   rocket0Pos = [-1, 6 + 2 * progress, 0]
        // }

        function calculateProgress(value, start, finish) {
          return (value - start) / (finish - start)
        }
        // rocket in glass 1
        if (p > pRocketRise && p < pRocketCrashGlass) {
          const progress = calculateProgress(p, pRocketRise, pRocketCrashGlass)
          rocket0Scale = [0.3, 0.3, 0.3]
          rocket0Pos = [-1, -1, -3 - 2 * progress]
        } else if (p > pRocketCrashGlass && p < pRocketDisappear) {
          const progress = calculateProgress(p, pRocketCrashGlass, pRocketDisappear)
          // glassOpacity = Math.sin(Math.PI * progress) * 0.3 + 0.1
        } else if (p > pRocketDisappear && p < pRocketDisappearEnd) {
          const progress = calculateProgress(p, pRocketDisappear, pRocketDisappearEnd)
          rocket0Scale = [0.3 - progress * 0.3, 0.3 - progress * 0.3, 0.3 - progress * 0.3]
          rocket0Pos = [-1, -1, -3 - 2 + 2 * progress]
        } else if (p > pRocketDisappearEnd && p < pRocketEnd) {
          const progress = calculateProgress(p, pRocketDisappear, pRocketEnd)
        }
        // rocket in glass 2
        if (p > pRocketRise2 && p < pRocketCrashGlass2) {
          const progress = calculateProgress(p, pRocketRise2, pRocketCrashGlass2)
          rocket1Scale = [0.25, 0.25, 0.25]
          rocket1Pos = [1, -1, -3 - 1.6 * progress]
        } else if (p > pRocketCrashGlass2 && p < pRocketDisappear2) {
          const progress = calculateProgress(p, pRocketCrashGlass2, pRocketDisappear2)
          // glassOpacity = Math.sin(Math.PI * progress) * 0.3 + 0.1
        } else if (p > pRocketDisappear2 && p < pRocketDisappearEnd2) {
          const progress = calculateProgress(p, pRocketDisappear2, pRocketDisappearEnd2)
          rocket1Scale = [0.25 - progress * 0.25, 0.25 - progress * 0.25, 0.25 - progress * 0.25]
          rocket1Pos = [1, -1, -3 - 1.6 + 2 * progress]
        } else if (p > pRocketDisappearEnd2 && p < pRocketEnd2) {
          const progress = calculateProgress(p, pRocketDisappear2, pRocketEnd2)
        }
        // rocket in glass 3
        if (p > pRocketRise3 && p < pRocketCrashGlass3) {
          const progress = calculateProgress(p, pRocketRise3, pRocketCrashGlass3)
          rocket2Scale = [0.25, 0.25, 0.25]
          rocket2Pos = [0.3, 1.5 * progress, -3 - 1 * progress]
        } else if (p > pRocketCrashGlass3 && p < pRocketDisappear3) {
          const progress = calculateProgress(p, pRocketCrashGlass3, pRocketDisappear3)
          // glassOpacity = Math.sin(Math.PI * progress) * 0.3 + 0.1
        } else if (p > pRocketDisappear3 && p < pRocketDisappearEnd3) {
          const progress = calculateProgress(p, pRocketDisappear3, pRocketDisappearEnd3)
          rocket2Scale = [0.25 - progress * 0.25, 0.25 - progress * 0.25, 0.25 - progress * 0.25]
          rocket2Pos = [0.3, 1.5, -3 - 1 + 2 * progress]
        } else if (p > pRocketDisappearEnd3 && p < pRocketEnd3) {
          const progress = calculateProgress(p, pRocketDisappear3, pRocketEnd3)
        }

        // wink
        if (p > pRightEyeCloseStart && p < pRightEyeCloseEnd) {
          const progress = calculateProgress(p, pRightEyeCloseStart, pRightEyeCloseEnd)
          rightEyeScale = [1, 1 - progress * 1, 1]
        } else if (p > pRightEyeCloseEnd && p < pRightEyeOpenEnd) {
          const progress = calculateProgress(p, pRightEyeCloseEnd, pRightEyeOpenEnd)
          rightEyeScale = [1, progress * 1, 1]
        }

        // glass
        if (p > pGlassShineStart && p < pGlassShineMax) {
          const progress = calculateProgress(p, pGlassShineStart, pGlassShineMax)
          glassOpacity = progress * glassOpacityMax + 0.1
        } else if (p > pGlassShineMax && p < pGlassShineEnd) {
          const progress = calculateProgress(p, pGlassShineMax, pGlassShineEnd)
          glassOpacity = (glassOpacityMax - progress * glassOpacityMax) + 0.1
        }

        api.set({
          rocketGroupPosition,
          rocketGroupScale,
          rocket0Pos,
          rocket0Scale,
          rocket1Pos,
          rocket1Scale,
          rocket2Pos,
          rocket2Scale,
          glassOpacity,
          rightEyeScale
        })

        shaderMaterial.uniforms.uProgress.value = p
      }
    })
    setShowGalaxy(false)
    setShowBlackhole(false)
    setShowRedGalaxy(true)
    setShowBlackhole2(false)
  }, [])
  
  const turquoise = new THREE.Color('turquoise')
  // apply color
  // draw particle by time - multiply opacity by time (converted from dependent value)
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: VertexShader,
    fragmentShader: FragmentShader,
    transparent: true,
    depthWrite: true,
    uniforms:
    {
      uOpacity: { value: 0.5 },
      uColor: {
        value: new THREE.Vector3(
          turquoise.r,
          turquoise.g,
          turquoise.b
        )
      },
      uProgress: new THREE.Uniform(progressRef.current.value)
    }
  })

  // Animation
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    ufo0.current.position.z = Math.cos(time) * 0.3
    ufo1.current.position.z = Math.cos(time + Math.PI/4) * 0.15
    ufoBoss.current.position.z = Math.cos(time + Math.PI/4) * 0.15 + layout[device].rocketsLoseScene.scene1.position[2]

    // rings ufo0
    for (let i = 0; i < numRings; i++) {
      let t = (time + i * shiftTime) % resetTime
      const ring = rings[i]
      if (ring.current) {
        ring.current.position.y = -t * 1.3 + 8
        ring.current.scale.x = 0.2 + t/1.5
        ring.current.scale.y = 0.2 + t/1.5
        ring.current.children[0].material.opacity = 0.8 - t/2
      }
    }
    // rings ufo1
    for (let i = 0; i < numRings1; i++) {
      let t = (time + i * shiftTime1) % resetTime1
      const ring = rings1[i]
      if (ring.current) {
        // spawn beam from ufo
        // shoot across rockets
        // fade out 
        ring.current.position.y = -t * 1.3 + 5
        ring.current.position.x = 1
        ring.current.position.z = 3
        ring.current.scale.x = 0.2 + t/2
        ring.current.scale.y = 0.2 + t/2
        ring.current.children[0].material.opacity = 0.8 - t/2
      }
    }
  })

  // Spring Animation
  const [{ rocketGroupScale, rocketGroupPosition, rocket0Pos, rocket0Scale, rocket1Pos, rocket1Scale, rocket2Pos, rocket2Scale, glassOpacity, rightEyeScale }, api] = useSpring(() => ({
    rocketGroupPosition: [0, 0, 10],
    rocketGroupScale: 1,
    rocket0Pos: [0,0,0],
    rocket0Scale: [0,0,0],
    rocket1Pos: [0,0,0],
    rocket1Scale: [0,0,0],
    rocket2Pos: [0,0,0],
    rocket2Scale: [0,0,0],
    glassOpacity: 0.1,
    rightEyeScale: [1, 1, 1],
    config: { tension: 70, friction: 20 },
  }))
  
  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  const params = useParams()
  return <group>
    {/* camera */}
    <group name='setup'>
      <GameCamera position={layout[device].camera.position}/>
    </group>
    {/* title */}
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].rocketsLoseScene.title.position}
      rotation={layout[device].rocketsLoseScene.title.rotation}
      size={layout[device].rocketsLoseScene.title.fontSize} 
      height={0.003} 
    >
      {`MISSION ABORT!`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    {/* score and player names */}
    <group name='teams' 
    position={layout[device].rocketsLoseScene.teams.position} 
    scale={layout[device].rocketsLoseScene.teams.scale}>
      <group name='score'>
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
              key={index}
            >
              {formatName(value.name)}
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
              key={index}
            >
              {formatName(value.name, 10)}
              <meshStandardMaterial color='turquoise'/>
            </Text3D>
          )}
        </group>
      </group>
    </group>
    {/* scene 0 */}
    <group name='scene-0' 
    position={layout[device].rocketsLoseScene.scene0.position} 
    scale={layout[device].rocketsLoseScene.scene0.scale}>
      <Earth showParticles={false} animate={false} scale={2.3} rotation={[-Math.PI/2, 0, 0]}/>
      <group ref={ufo0}>
        <UfoNew position={[0, 7, -1]} scale={3}/>
        {rings.map((value, index) => {
          return <group key={index} ref={value} rotation={[Math.PI/3, 0, 0]} position={[0, 0, 0]}>
            <mesh>
              <torusGeometry args={[1, 0.01, 24, 100]} />
              <meshStandardMaterial color='turquoise' transparent opacity={0.5} blending={THREE.NormalBlending} depthWrite={false}/>
            </mesh>
          </group>
        })}
      </group>
      <group ref={ufo1}>
        <UfoNew position={[1, 5, 3]} scale={1.5}/>
        {rings1.map((value, index) => {
          return <group key={index} ref={value} rotation={[Math.PI/3, 0, 0]} position={[0, 0, 0]}>
            <mesh>
              <torusGeometry args={[1, 0.01, 24, 100]} />
              <meshStandardMaterial color='turquoise' transparent opacity={0.5} blending={THREE.NormalBlending} depthWrite={false}/>
            </mesh>
          </group>
        })}
      </group>
    </group>
    {/* scene 1 */}
    <group name='scene-1' 
    position={layout[device].rocketsLoseScene.scene1.position}
    scale={layout[device].rocketsLoseScene.scene1.scale}
    ref={ufoBoss}>
      <animated.group name='rocket-group' scale={rocketGroupScale} position={rocketGroupPosition}>
        <Float speed={5} rotationIntensity={2} floatIntensity={1} floatingRange={[1, 2]} position={[-0.8, -2.8, -1]}>
          <Rocket rotation={[Math.PI/6, 0, -Math.PI/2]} animate={false} scale={1.5}/>
        </Float>
        <Float speed={5} rotationIntensity={2} floatIntensity={1} floatingRange={[1, 2]} position={[0.8, -2.8, -1]}>
          <Rocket rotation={[Math.PI/4, 0, Math.PI/18]} animate={false} scale={1.3}/>
        </Float>
        <Float speed={5} rotationIntensity={2} floatIntensity={1} floatingRange={[1, 2]} position={[1, -2.8, 1]}>
          <Rocket rotation={[-Math.PI/6, -Math.PI/6, -Math.PI/3]} animate={false} scale={1.7}/>
        </Float>
        <Float speed={5} rotationIntensity={2} floatIntensity={1} floatingRange={[1, 2]} position={[-1, -2.8, 1]}>
          <Rocket rotation={[-Math.PI/6, 0, -Math.PI/2]} animate={false} scale={1.5}/>
        </Float>
      </animated.group>
      <Float speed={5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[1, 2]}>
        <animated.group name='rocket-floating-0' position={rocket0Pos} scale={rocket0Scale}>
          <Rocket rotation={[0, 0, Math.PI/4]} animate={false} scale={1.5}/>
        </animated.group>
      </Float>
      <Float speed={5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[1, 2]}>
        <animated.group name='rocket-floating-1' position={rocket1Pos} scale={rocket1Scale}>
          <Rocket rotation={[0, 0, Math.PI/4]} animate={false} scale={1.5}/>
        </animated.group>
      </Float>
      <Float speed={5} rotationIntensity={0.2} floatIntensity={1} floatingRange={[1, 2]}>
        <animated.group name='rocket-floating-2' position={rocket2Pos} scale={rocket2Scale}>
          <Rocket rotation={[0, 0, Math.PI/4]} animate={false} scale={1.5}/>
        </animated.group>
      </Float>
      <group position={[0, 0, 0]} >
        <UfoNewBoss position={[0, 0, -4]} rotation={[-Math.PI/4, 0, 0]} scale={5} glassOpacity={glassOpacity} animate glassColor='turquoise' rightEyeScale={rightEyeScale}/>
        {/* has to be turned. one side of the lateral plane is where the ends of the plane meet;*/}
        {/* the other side is the center*/}
        <animated.mesh name='beam' rotation={[-Math.PI/2 + Math.PI/9, Math.PI, 0]} position={[0, -2.2, 3.3]} scale={1} material={shaderMaterial}>
          <cylinderGeometry args={[1, 3, 13, 32]}/>
        </animated.mesh>
      </group>
    </group>
    {/* room id and buttons */}
    <group name='action-buttons' 
    position={layout[device].rocketsLoseScene.actionButtons.position} 
    scale={layout[device].rocketsLoseScene.actionButtons.scale}>
      { device === 'landscapeDesktop' && <group name='room-id' >
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.03} 
          position={[0, 0, 0]} // camera is shifted up (y-axis)
        >
          ROOM ID: {`${params.id}`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group> }
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
    <Asteroids scale={1.3} position={[-10, -5, -20]}/>
  </group>
}