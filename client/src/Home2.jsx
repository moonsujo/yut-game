import React, { useEffect, useState } from 'react';
import { Float, Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import { useAtom } from "jotai";
import layout from './layout';
import RocketAnimated from './meshes/RocketAnimated';
import UfoAnimated from './meshes/UfoAnimated';
import YootMesh from './meshes/YootMesh';
import { useLocation } from 'wouter';
import HowToPlay from './HowToPlay';
import Title from './Title';
import About from './About';
import { socket } from './SocketManager';
import { clientAtom, deviceAtom } from './GlobalState';
import Board from './Board';
import { Physics } from '@react-three/rapier';
import GameCamera from './GameCamera';
import Rocket from './meshes/Rocket';
import Ufo from './meshes/Ufo';
import useResponsiveSetting from './ResponsiveSetting';
import MeteorsRealShader from './shader/meteorsReal/MeteorsRealShader';
import { useSounds } from './hooks/useSounds';

export default function Home2() {

  useResponsiveSetting();
  const [playSound] = useSounds();
  const [device] = useAtom(deviceAtom)
  const [display, setDisplay] = useState('board')
  const [client] = useAtom(clientAtom)
  
  const { scene, materials } = useGLTF(
    "models/yoot.glb"
  );



  function Pieces() {
    return <group>
      {/* rocket on star 1 */}
      <Float 
        speed={3} 
        rotationIntensity={0.2}
        floatIntensity={0.1}
        floatingRange={[-0.1, 0.1]}
      >
        <RocketAnimated position={[1.7,0.5,4.3]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      {/* rocket on moon */}
      <Float 
        speed={3} 
        rotationIntensity={0.3}
        floatIntensity={0.1}
        floatingRange={[-1, 1]}
      >
        <RocketAnimated position={[0,2,-0.1]} rotation={[-Math.PI/4, 0, 0]} scale={0.4}/>
      </Float>
      {/* rocket home pieces */}
      <Rocket 
        position={layout[device].title.pieces.rocketHome0.position} 
        rotation={layout[device].title.pieces.rocketHome0.rotation} 
        scale={layout[device].title.pieces.rocketHome0.scale}
      />
      <Rocket 
        position={layout[device].title.pieces.rocketHome1.position} 
        rotation={layout[device].title.pieces.rocketHome1.rotation} 
        scale={layout[device].title.pieces.rocketHome1.scale}
      />
      {/* ufo home piece */}
      <Ufo 
        rotation={layout[device].title.pieces.ufoHome.rotation} 
        position={layout[device].title.pieces.ufoHome.position} 
        scale={layout[device].title.pieces.ufoHome.scale}
      />
      {/* ufo on mars */}
      <Float 
        rotationIntensity={0.05} 
        speed={4} 
        floatIntensity={1}
        floatingRange={[0, 0.2]}
      >
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[5.0, 0.8, -0.5]} scale={0.5}/>
      </Float>
      {/* ufo on saturn */}
      <Float rotationIntensity={0.03} speed={3} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[-3.3, 0.8, -4.3]} scale={0.5}/>
        <UfoAnimated rotation={[-Math.PI/4,0,0]} position={[-2.6, 0.8, -4.3]} scale={0.5}/>
      </Float>
    </group>
  }

  function Yoots({position, rotation, scale}) {
    return <animated.group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <Float floatIntensity={0.001} floatingRange={[0.05, 0.05]} speed={2} rotationIntensity={0.3}>
        <YootMesh scale={0.9} position={[0,0,-2.1]} rotation={[-Math.PI/8, Math.PI/16, -Math.PI/2]}/>
        <YootMesh scale={0.9} position={[0.5,0,0]} rotation={[0, 0, -Math.PI/2 + Math.PI/16]} />
        <YootMesh scale={0.9} position={[0.5,1.0,2]} rotation={[Math.PI/32, -Math.PI/32, -Math.PI/2]} />
        <YootMesh scale={0.9} position={[0,1,4]} rotation={[Math.PI/6, -Math.PI/16, -Math.PI/2]} />
      </Float>
    </animated.group>
  }

  const [_location, setLocation] = useLocation();

  function AboutButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setDisplay('about')
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.5, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.45, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.5, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.65, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        About
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  function HowToPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      setDisplay('howToPlay')
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[2.8, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.75, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.8, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.27, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        How To Play
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }

  function LetsPlayButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      playSound('sounds/effects/boot-up.mp3')
      e.stopPropagation();
      socket.emit('createRoom', { hostId: client._id }, ({ roomId }) => {
        setLocation(`/${roomId}`)
      })
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[3, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.95, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[2.8, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.37, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        Start a game
        <meshStandardMaterial color={ hover ? 'green': [0.8, 0.8, 0]}/>
      </Text3D>
    </group>
  }
  
  return <>
    <GameCamera 
    position={layout[device].title.camera.position}
    lookAt={layout[device].title.camera.lookAt}
    />
    <group>
      <Title 
        position={layout[device].title.text.position}
        rotation={layout[device].title.text.rotation}
        scale={layout[device].title.text.scale}
        setDisplay={setDisplay}
      />
      <Yoots 
        position={layout[device].title.yoots.position}
        rotation={layout[device].title.yoots.rotation}
        scale={layout[device].title.yoots.scale} 
      />
      <AboutButton 
        position={layout[device].title.about.position} 
        rotation={layout[device].title.about.rotation}
        scale={layout[device].title.about.scale}
      />
      <HowToPlayButton
        position={layout[device].title.howToPlay.position} 
        rotation={layout[device].title.howToPlay.rotation}
        scale={layout[device].title.howToPlay.scale}
      />
      <LetsPlayButton
        position={layout[device].title.letsPlay.position} 
        rotation={layout[device].title.letsPlay.rotation}
        scale={layout[device].title.letsPlay.scale}
      />
    </group>
    <group>
      { display === 'board' && <group position={layout[device].title.board.position} 
          scale={layout[device].title.board.scale}>
        <Board 
          showStart={true} 
          interactive={false}/>
        <Pieces/>
      </group> }
      { display === 'about' && <About 
        device={device}
        position={layout[device].about.position}
        rotation={layout[device].about.rotation}
        scale={layout[device].about.scale}
      />}
      <Physics>
        { display === 'howToPlay' && <HowToPlay 
          device={device}
          position={layout[device].howToPlay.position}
          rotation={[0,0,0]}
          scale={layout[device].howToPlay.scale}
        />}
      </Physics>
    </group>
    <MeteorsRealShader/>
  </>
}