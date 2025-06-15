import { Float, Text3D } from "@react-three/drei";
import GameCamera from "../GameCamera";
import layout from "../layout";
import { useAtomValue, useSetAtom } from "jotai";
import { deviceAtom, showBlackhole2Atom, showBlackholeAtom, showGalaxyBackgroundAtom, showRedGalaxyAtom, teamsAtom } from "../GlobalState";
import { formatName, generateRandomNumberInRange, getScore } from "../helpers/helpers";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { animated, useSpring } from "@react-spring/three";
import Rocket from "../meshes/Rocket";
import FragmentShader from '../shader/ufoBeam/fragment.glsl'
import VertexShader from '../shader/ufoBeam/vertex.glsl'
import FragmentShaderBeam2 from '../shader/beamShaderSimple/fragment.glsl'
import VertexShaderBeam2 from '../shader/beamShaderSimple/vertex.glsl'
import gsap from "gsap";
import UfoNewBoss from "../meshes/UfoNewBoss";
import EarthModified from "../meshes/EarthModified";
import { useBeamDustShader } from "../shader/beamDust/BeamDustShader";
import Wolf from "../meshes/Wolf";
import CyberTruck from "../meshes/CyberTruck";
import Barn from "../meshes/Barn";
import { useFireworksShader } from "../shader/fireworks/FireworksShader";
import { Llama } from "../meshes/Llama";
import Ruby from "../meshes/Ruby";
import MeteorsRealShader from "../shader/meteorsReal/MeteorsRealShader";
import PlayAgainButton from "./PlayAgainButton";
import ShareLinkButton from "./ShareLinkButton";
import DiscordButton from "./DiscordButton";
import useResponsiveSetting from "../hooks/useResponsiveSetting";
import { useParams } from "wouter";

// add falling rocket parts in the background
export default function UfosWin2New() {

  // State
  const params = useParams();
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
  const ufoBoss = useRef()
  const ufoBoss00 = useRef()
  const scene1 = useRef()

  // Hooks - particles
  const [CreateBeamDust] = useBeamDustShader();
  const [CreateFirework] = useFireworksShader();

  // Animation - useEffect, gsap progress
  const progressRef = useRef({ value: 0 })
  const progressRef2 = useRef({ value: 0 })
  const pMax0 = 0.1
  const pMax1 = 0.2
  const pMax2 = 0.7
  const pMax3 = 0.9
  const pMax4 = 1.0
  
  // Wolf Absorbed
  const pWolfRise = 0.0
  const pWolfAbsorbed = 0.2
  const pCybertruckRise = 0.2
  const pCybertruckAbsorbed = 0.4
  const pCakeRise = 0.4
  const pCakeAbsorbed = 0.6
  const pHamRise = 0.6
  const pHamAbsorbed = 0.8
  const pPigRise = 0.8
  const pPigAbsorbed = 1.0

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
        wolfPosition,
        wolfScale

        function calculateProgress(value, start, finish) {
          return (value - start) / (finish - start)
        }
        // Rocket Absorbed
        if (p < pMax0) { // 0.0 - 0.2
          rocketGroupPosition = [0, -4, 10]
          rocketGroupScale = 1
        } else if (p > pMax0 && p < pMax1) { // 0.2 - 0.4
          const progress = calculateProgress(p, pMax0, pMax1)
          rocketGroupPosition = [0, -4 + 3 * progress, 10 - 6 * progress]
        } else if (p > pMax1 && p < pMax2) { // 0.4 - 0.8
        } else if (p > pMax2 && p < pMax3) { // 0.8 - 1.0; 264 - 297
          const progress = calculateProgress(p, pMax2, pMax3)
          rocketGroupPosition = [0, -4 + 3, 10 - 6 - progress * 7]
          rocketGroupScale = 1 - progress
        } else if (p > pMax3 && p < pMax4) {
          rocketGroupScale = 0
        }

        api.set({
          rocketGroupPosition,
          rocketGroupScale,
        })

        shaderMaterial.uniforms.uProgress.value = p
      }
    })

    // Absorb animation
    gsap.to(progressRef2.current, {
      value: 1,
      duration: 7,
      ease: 'linear',
      repeat: -1,
      onUpdate: () => {
        const p = progressRef2.current.value

        // Interpolate position and scale manually
        let wolfPosition,
        wolfScale,
        cybertruckPosition,
        cybertruckScale,
        cakePosition,
        cakeScale,
        hamPosition,
        hamScale,
        pigPosition,
        pigScale

        function calculateProgress(value, start, finish) {
          return (value - start) / (finish - start)
        }
        // Wolf
        if (p < pWolfAbsorbed) { // 0.0 - 0.2
          let progress = calculateProgress(p, 0, pWolfAbsorbed)
          wolfPosition = [0, -2, 1 - progress * 6]
          wolfScale = 1 - progress
        }

        // Cybertruck
        if (p > pCybertruckRise && p < pCybertruckAbsorbed) { // 0.0 - 0.2
          let progress = calculateProgress(p, pCybertruckRise, pCybertruckAbsorbed)
          cybertruckPosition = [0, -2, 1 - progress * 6]
          cybertruckScale = 1 - progress
        }

        // Cake
        if (p > pCakeRise && p < pCakeAbsorbed) { // 0.0 - 0.2
          let progress = calculateProgress(p, pCakeRise, pCakeAbsorbed)
          cakePosition = [0, -2, 1 - progress * 6]
          cakeScale = 1 - progress
        }
        
        // Llama
        if (p > pHamRise && p < pHamAbsorbed) { // 0.0 - 0.2
          let progress = calculateProgress(p, pHamRise, pHamAbsorbed)
          hamPosition = [0, -2, 1 - progress * 6]
          hamScale = 1 - progress
        }

        // Pig
        if (p > pPigRise && p < pPigAbsorbed) { // 0.0 - 0.2
          let progress = calculateProgress(p, pPigRise, pPigAbsorbed)
          pigPosition = [0, -2, 1 - progress * 6]
          pigScale = 1 - progress
        }

        api2.set({
          wolfPosition,
          wolfScale,
          cybertruckPosition,
          cybertruckScale,
          cakePosition,
          cakeScale,
          hamPosition,
          hamScale,
          pigPosition,
          pigScale
        })
      }
    })

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
              -10,
              Math.sin(angle) * radiusCircle - 3
          )
          size = 0.3 + Math.random() * 0.3
          radius = 1.0 + Math.random() * 1.0
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
    const intervalBeamDust = setInterval(() => {
      const position = new THREE.Vector3(
        Math.random() * 3.5 * (Math.random() > 0.5 ? 1 : -1),
        -7.5,
        Math.random() * 1.0 * (Math.random() > 0.5 ? 1 : -1),
      )
      const size = 300.0 + Math.random() * 200 * (Math.random() > 0.5 ? 1 : -1);
      const speed = 15.0 + Math.random() * 5.0 * (Math.random() > 0.5 ? 1 : -1);
      CreateBeamDust({ position, size, speed });
    }, 70)

    setShowGalaxy(true)
    setShowBlackhole(false)
    setShowRedGalaxy(false)
    setShowBlackhole2(false)
    return (() => {
      clearInterval(intervalFireworks);
      clearInterval(intervalBeamDust);
    })
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
      uOpacity: { value: 0.7 },
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
  const beamBrightness = 0.2
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    ufoBoss.current.position.z = Math.cos(time + Math.PI/4) * 0.15 + 3 + layout[device].ufoWinScene.scene0.position[2]
    shaderMaterialBeam2.uniforms.uOpacity.value = Math.sin(time * 3) * 0.05 + beamBrightness
    scene1.current.position.z = Math.cos(time + Math.PI/4) * 0.15 + layout[device].ufoWinScene.scene1.position[2]
    if (ufoBoss00.current) {
      ufoBoss00.current.position.z = Math.cos(time + Math.PI/4) * 0.15 + 3 + layout[device].ufoWinScene.scene0.position[2]
    }
  })

  // Spring Animation
  // Rockets Absorbed
  const [{ rocketGroupScale, rocketGroupPosition }, api] = useSpring(() => ({
    rocketGroupPosition: [0, 0, 10],
    rocketGroupScale: 1,
    config: { tension: 70, friction: 20 },
  }))
  // Animals on Earth
  const [{ wolfScale, wolfPosition, cybertruckPosition, cybertruckScale, cakePosition, cakeScale, hamPosition, hamScale, pigPosition, pigScale }, api2] = useSpring(() => ({
    wolfPosition: [0, -2, 2],
    wolfScale: [0, 0, 0],
    cybertruckPosition: [0, -2, 2],
    cybertruckScale: [0, 0, 0],
    cakePosition: [0, -2, 2],
    cakeScale: [0, 0, 0],
    hamPosition: [0, -2, 2],
    hamScale: [0, 0, 0],
    pigPosition: [0, -2, 2],
    pigScale: [0, 0, 0],
    config: { tension: 70, friction: 20 },
  }))

  const shaderMaterialBeam2 = new THREE.ShaderMaterial({
    vertexShader: VertexShaderBeam2,
    fragmentShader: FragmentShaderBeam2,
    transparent: true,
    uniforms:
    {
      uOpacity: { value: 0 }
    }
  })

  const meteorShaderColor = new THREE.Color();
  meteorShaderColor.setHSL(0.05, 0.7, 0.4)
  return <group>
    {/* camera */}
    <group name='setup'>
      <GameCamera position={layout[device].camera.position}/>
    </group>
    {/* title */}
    <Text3D name='title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].ufoWinScene.title.position}
      rotation={layout[device].ufoWinScene.title.rotation}
      size={layout[device].ufoWinScene.title.fontSize} 
      height={0.003} 
    >
      {`ALIEN INVASION!`}
      <meshStandardMaterial color='yellow'/>
    </Text3D>
    {/* score and player names */}
    <group name='teams' 
    position={layout[device].ufoWinScene.teams.position}
    scale={layout[device].ufoLoseScene.teams.scale}>
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
        <group name='player-names-ufos' position={[4.2, 0, 0]}>
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
    position={layout[device].ufoWinScene.scene0.position} 
    scale={layout[device].ufoWinScene.scene0.scale} 
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
      <group>
        <UfoNewBoss position={[0, 0, -4]} rotation={[-Math.PI/4, 0, 0]} scale={5} animate glassColor='turquoise'/>
        {/* has to be turned. one side of the lateral plane is where the ends of the plane meet;*/}
        {/* the other side is the center*/}
        <mesh name='beam' rotation={[-Math.PI/2 + Math.PI/9, Math.PI, 0]} position={[0, -2.2, 3.3]} scale={1} material={shaderMaterialBeam2}>
          <cylinderGeometry args={[1, 3, 13, 32]}/>
        </mesh>
      </group>
    </group>
    { device === 'portrait' && <group name='scene-00' 
    position={layout[device].ufoWinScene.scene00.position} 
    scale={layout[device].ufoWinScene.scene00.scale} 
    ref={ufoBoss00}>
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
      <group>
        <UfoNewBoss position={[0, 0, -4]} rotation={[-Math.PI/4, 0, 0]} scale={5} animate glassColor='turquoise'/>
        {/* has to be turned. one side of the lateral plane is where the ends of the plane meet;*/}
        {/* the other side is the center*/}
        <mesh name='beam' rotation={[-Math.PI/2 + Math.PI/9, Math.PI, 0]} position={[0, -2.2, 3.3]} scale={1} material={shaderMaterialBeam2}>
          <cylinderGeometry args={[1, 3, 13, 32]}/>
        </mesh>
      </group>
    </group>}
    {/* scene 1 */}
    <group name='scene-1' 
    position={layout[device].ufoWinScene.scene1.position} 
    scale={layout[device].ufoWinScene.scene1.scale}
    ref={scene1}>
      <UfoNewBoss position={[0, 1, -4]} rotation={[-Math.PI/4, 0, 0]} scale={5} animate glassColor='turquoise'/>
      {/* beam */}
      <mesh position={[0, 0, 2]} rotation={[-Math.PI/2 + Math.PI/32, 0, 0]} material={shaderMaterialBeam2}>
        <cylinderGeometry args={[1.2, 3.6, 12, 32]}/>
      </mesh>
      <Float floatIntensity={2} speed={5} >
        <EarthModified 
          position={[0,-3.5,2]} 
          scale={1.1} 
          rotation={[-Math.PI/2,Math.PI/2,0]}
        />
        <animated.group name='wolf' position={wolfPosition} scale={wolfScale}>
          <Wolf rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.5}/>
        </animated.group>
        <animated.group name='cybertruck' position={cybertruckPosition} scale={cybertruckScale}>
          <CyberTruck rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.4}/>
        </animated.group>
        <animated.group name='barn' position={cakePosition} scale={cakeScale}>
          <Barn rotation={[-Math.PI/8, Math.PI/4, -Math.PI/4]} scale={0.5}/>
        </animated.group>
        <animated.group name='llama' position={hamPosition} scale={hamScale}>
          <Llama rotation={[-Math.PI/4, Math.PI/2, 0]} scale={0.5}/>
        </animated.group>
        <animated.group name='pig' position={pigPosition} scale={pigScale} rotation={[-Math.PI/16, 0, 0]}>
          <Ruby rotation={[-Math.PI/4, Math.PI/2, 0]} scale={1}/>
          <Ruby position={[1, 0, 0.5]} rotation={[-Math.PI/6, Math.PI, 0]} scale={0.5} color='#0055FF'/>
          <Ruby position={[-0.7, 0, 0.5]} rotation={[Math.PI/3, Math.PI, Math.PI/6]} scale={0.3} color='green'/>
        </animated.group>
      </Float>
    </group>
    {/* room id and buttons */}
    <group name='action-buttons' 
    position={layout[device].ufoWinScene.actionButtons.position} 
    scale={layout[device].ufoWinScene.actionButtons.scale}>
      { device === 'landscapeDesktop' && <group name='room-id'>
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
  </group>
}