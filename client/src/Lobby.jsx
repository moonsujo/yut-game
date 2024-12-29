import { useAtomValue } from "jotai";
import GameCamera from "./GameCamera";
import { deviceAtom } from "./GlobalState";
import useResponsiveSetting from "./hooks/useResponsiveSetting.jsx";
import layout from "./layout";
import HowToPlay from "./HowToPlay.jsx";
import BlueMoon from "./meshes/BlueMoon.jsx";
import { Image, Text3D } from "@react-three/drei";
import Star from "./meshes/Star.jsx";
import * as THREE from 'three';
import Ufo from "./meshes/Ufo.jsx";
import Rocket from "./meshes/Rocket.jsx";

export default function Lobby() {

  useResponsiveSetting();

  const device = useAtomValue(deviceAtom)
  
  return <group>
    {/* game camera */}
    {/* moon */}
    {/* rulebook */}
    {/* invite instructions */}
    {/* team info */}
    {/* settings button */}
    {/* start button */}
    <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={[1,0.5,-4.5]}
      rotation={[-Math.PI/2,0,0]}
      size={0.4}
      height={0.01}
    >
      {`GOAL: MOVE YOUR PIECES FROM THE START\nTO THE EARTH BEFORE THE OTHER TEAM!`}
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <Text3D
      font="fonts/Luckiest Guy_Regular.json"
      position={[8.75,0.5,-2.5]}
      rotation={[-Math.PI/2,0,0]}
      size={0.3}
      height={0.01}
    >
      {`rulebook`}
      <meshStandardMaterial color="yellow"/>
    </Text3D>
    <HowToPlay 
      device={'landscapeDesktop'}
      scale={0.8}
      position={[4.5, 0, 1]}
    />
    <BlueMoon position={[-6.5, -5, -2]} scale={2.3}/>
    <group name='invite-your-friends' position={[-6.5, 1, -4.3]} scale={0.9}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-5.9,0.5,0]}
        rotation={[-Math.PI/2,0,0]}
        size={0.8}
        height={0.01}
      >
        {`YUT NORI!`}
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.6,0.5,0]}
        rotation={[-Math.PI/2,0,0]}
        size={0.5}
        height={0.01}
      >
        {`game id: abcd`}
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <group name='invite instructions'>
        <group name='instruction-line-0' position={[-5.7, 0, 0.8]}>
          <Star position={[0,0,0]} scale={0.2}/>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[0.5, 0, 0.2]}
            rotation={[-Math.PI/2,0,0]}
            size={0.43}
            height={0.01}
            lineHeight={0.7}
          >
            {/* THE LINK SHOULD CHANGE COLORS TO DRAW ATTENTION */}
            {`GO TO YUTNORI.APP TO CHECK IN`}
            <meshStandardMaterial color="yellow"/>
          </Text3D>
        </group>
        <group name='instruction-line-1' position={[-5.7, 0, 1.8]} >
          <Star position={[0,0,0]} scale={0.2}/>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[0.5, 0, 0.2]}
            rotation={[-Math.PI/2,0,0]}
            size={0.43}
            height={0.01}
          >
            {`scan the qr code`}
            <meshStandardMaterial color="yellow"/>
          </Text3D>
        </group>
        <Image name='qr-code-sample' rotation={[Math.PI/2, 0, 0]} position={[5, 0, 1.3]} scale={[2.3, 2.3, 2.3]} url={'images/qr-code-sample.png'} side={THREE.DoubleSide}/>
        <group name='ufos-team-display' position={[1, 0, 0]}>
          <group name='join-ufos-button' position={[-4, 0, 4.0]}>
            <mesh scale={[1.9, 0.11, 0.9]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh scale={[1.95, 0.1, 0.95]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='turquoise'/>
            </mesh>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.35,0,0]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
              lineHeight={0.7}
            >
              {'play with\n      ufos'}
              <meshStandardMaterial color={'turquoise'}/>
            </Text3D>
          </group>
          {/* animation: on player join, ufo blips out, and blips in*/}
          {/* animation: on idle, floats around*/}
          <group name='ufo-display'>
            <Ufo position={[-5.7, 0, 5.5]} scale={1} rotation={[0, Math.PI/16, 0]}/>
            <Ufo position={[-4.3, 0, 5.9]} scale={2.2}/>
            <Ufo position={[-3.1, 0, 5.1]} scale={1.2} rotation={[0, -Math.PI/32, 0]}/>
            <Ufo position={[-3.25, 0, 6.8]} scale={1.2} rotation={[0, -Math.PI/64, 0]}/>
          </group>
          {/* replace with real player list */}
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-5.3,0,8.0]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
            lineHeight={0.7}
          >
            {'waiting\nfor\nplayers'}
            <meshStandardMaterial color={'grey'}/>
          </Text3D>
        </group>
        <group name='rockets-team-display' position={[2, 0, 0]}>
          <group name='join-rockets-button' position={[0.5, 0, 3.7]}>
            <mesh scale={[1.9, 0.11, 0.9]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh scale={[1.95, 0.1, 0.95]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='red'/>
            </mesh>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.35,0,-0.03]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
              lineHeight={0.7}
            >
              {'Play with\n  Rockets'}
              <meshStandardMaterial color={'red'}/>
            </Text3D>
          </group>
          <Rocket position={[-0.8, 0, 5.8]} scale={1.8}/>
          <Rocket position={[0.7, 0, 5.2]} scale={1.5}/>
          <Rocket position={[-0.3, 0, 6.6]} scale={1.9}/>
          <Rocket position={[1.0, 0, 6.2]} scale={1.6}/>
          <group name='rocket-player-one'>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.5,0,8.5]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
              lineHeight={0.7}
            >
              {'JISOO'}
              <meshStandardMaterial color={'red'}/>
            </Text3D>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[0.1,0,8.5]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
              lineHeight={0.7}
            >
              {'(host)'}
              <meshStandardMaterial color={'yellow'}/>
            </Text3D>
          </group>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.8,0,9.4]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
            lineHeight={0.7}
          >
            {'JENNIE'}
            <meshStandardMaterial color={'red'}/>
          </Text3D>
          {/* <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.2,0,10.5]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
            lineHeight={0.7}
          >
            {'LISA'}
            <meshStandardMaterial color={'red'}/>
          </Text3D>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-0.3,0,11.3]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
            lineHeight={0.7}
          >
            {'ROSE'}
            <meshStandardMaterial color={'red'}/>
          </Text3D> */}
        </group>
        <group name='settings-button' position={[-2.5, 0, 11]}>
          <mesh scale={[1.7, 0.11, 0.6]}>
            <cylinderGeometry args={[1, 1, 0.1, 64]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh scale={[1.75, 0.1, 0.65]}>
            <cylinderGeometry args={[1, 1, 0.1, 64]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.2,0,0.2]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
          >
            {'Settings'}
            <meshStandardMaterial color={'yellow'}/>
          </Text3D>
        </group>
        <group name='start-game-button' position={[1.5, 0, 11]}>
          <mesh scale={[1.7, 0.11, 0.6]}>
            <cylinderGeometry args={[1, 1, 0.1, 64]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh scale={[1.75, 0.1, 0.65]}>
            <cylinderGeometry args={[1, 1, 0.1, 64]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.1,0,0.25]}
            rotation={[-Math.PI/2,0,0]}
            size={0.52}
            height={0.01}
          >
            {'START!'}
            <meshStandardMaterial color={'yellow'}/>
          </Text3D>
        </group>
        {/* <group name='spectator-section' position={[5.3, 0, 7]}>
          <group name='spectate-button' position={[-0.5, 0, -3]}>
            <mesh scale={[1.5, 0.11, 0.5]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='black'/>
            </mesh>
            <mesh scale={[1.55, 0.1, 0.55]}>
              <cylinderGeometry args={[1, 1, 0.1, 64]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[-1.05,0,0.15]}
              rotation={[-Math.PI/2,0,0]}
              size={0.35}
              height={0.01}
            >
              {'SPECTATE'}
              <meshStandardMaterial color={'yellow'}/>
            </Text3D>
          </group>
          <group name='spectator-player-list' position={[3.5,0,8.1]}>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[0,0,0]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
            >
              {'spectate'}
              <meshStandardMaterial color={'grey'}/>
            </Text3D>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              position={[0,0,0.7]}
              rotation={[-Math.PI/2,0,0]}
              size={0.4}
              height={0.01}
            >
              {'james'}
              <meshStandardMaterial color={'grey'}/>
            </Text3D>
          </group>
        </group> */}
      </group>
    </group>
  </group>
}