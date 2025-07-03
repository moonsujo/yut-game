import { useAtomValue } from "jotai"
import { backdoLaunchAtom, clientAtom, gamePhaseAtom, hostAtom, nakAtom, timerAtom, yutMoCatchAtom } from "./GlobalState"
import { useState } from "react"
import { socket } from "./SocketManager"
import { useParams } from "wouter"
import { useSpring, animated } from "@react-spring/three"
import { MeshDistortMaterial, Text3D } from '@react-three/drei'
import MeshColors from "./MeshColors"

export default function GameRules({ position=[0,0,0], scale=1 }) {
  const host = useAtomValue(hostAtom)
  const client = useAtomValue(clientAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const isHost = client.socketId === host.socketId
  const params = useParams()

  // hover states
  const [setting0Hover, setSetting0Hover] = useState(false)
  const [setting1Hover, setSetting1Hover] = useState(false)
  const [setting2Hover, setSetting2Hover] = useState(false)
  const [setting3Hover, setSetting3Hover] = useState(false)
  // toggle states (global)
  // pointer handlers (enter, leave, and up for each rule)
  const backdoLaunch = useAtomValue(backdoLaunchAtom)
  const timer = useAtomValue(timerAtom)
  const nak = useAtomValue(nakAtom)
  const yutMoCatch = useAtomValue(yutMoCatchAtom)
  const { 
    setting0TogglePosition, 
    setting0ToggleBackgroundColor,
    setting1TogglePosition, 
    setting1ToggleBackgroundColor,
    setting2TogglePosition, 
    setting2ToggleBackgroundColor,
    setting3TogglePosition, 
    setting3ToggleBackgroundColor,
  } = useSpring({
    setting0TogglePosition: !backdoLaunch ? [0,0,0] : [0.4, 0, 0],
    setting0ToggleBackgroundColor: !isHost ? '#454200' : (gamePhase !== 'lobby' && !backdoLaunch) ? '#5C5800' : 'green',
    setting1TogglePosition: !timer ? [0,0,0] : [0.4, 0, 0],
    setting1ToggleBackgroundColor: !isHost ? '#454200' : (gamePhase !== 'lobby' && !timer) ? '#5C5800' : 'green',
    setting2TogglePosition: !nak ? [0,0,0] : [0.4, 0, 0],
    setting2ToggleBackgroundColor: !isHost ? '#454200' : (gamePhase !== 'lobby' && !nak) ? '#5C5800' : 'green',
    setting3TogglePosition: !yutMoCatch ? [0,0,0] : [0.4, 0, 0],
    setting3ToggleBackgroundColor: !isHost ? '#454200' : (gamePhase !== 'lobby' && !yutMoCatch) ? '#5C5800' : 'green',
    config: {
      tension: 170,
      friction: 26
    },
  })
  
  // #region pointerHandlers
  function handleSetting0PointerEnter(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'pointer'
      setSetting0Hover(true)
    }
  }
  function handleSetting0PointerLeave(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'default'
      setSetting0Hover(false)
    }
  }
  function handleSetting0PointerUp(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      if (!backdoLaunch) {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: true }))
      } else {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: false }))
      }
    }
  }
  function handleSetting1PointerEnter(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'pointer'
      setSetting1Hover(true)
    }
  }
  function handleSetting1PointerLeave(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'default'
      setSetting1Hover(false)
    }
  }
  function handleSetting1PointerUp(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      if (!timer) {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: true }))
      } else {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: false }))
      }
    }
  }
  function handleSetting2PointerEnter(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'pointer'
      setSetting2Hover(true)
    }
  }
  function handleSetting2PointerLeave(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'default'
      setSetting2Hover(false)
    }
  }
  function handleSetting2PointerUp(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      if (!nak) {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'nak', flag: true }))
      } else {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'nak', flag: false }))
      }
    }
  }
  function handleSetting3PointerEnter(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'pointer'
      setSetting3Hover(true)
    }
  }
  function handleSetting3PointerLeave(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      document.body.style.cursor = 'default'
      setSetting3Hover(false)
    }
  }
  function handleSetting3PointerUp(e) {
    e.stopPropagation()
    if (isHost && gamePhase === 'lobby') {
      if (!yutMoCatch) {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'yutMoCatch', flag: true }))
      } else {
        socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'yutMoCatch', flag: false }))
      }
    }
  }
  // #endregion
  
  const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

  return <group position={position} scale={scale}>
    <group name='setting-0' position={[5.2, 0, -3.2]}>
      <group name='setting-0-background'>
        { isHost && gamePhase === 'lobby' && <mesh
        name='setting-0-background-outer'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 2.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> }
        <mesh 
        name='setting-0-background-inner'
        position={[3.25, 0, 0]}
        scale={[7.05, 0.1, 2.85]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          color={ !setting0Hover ? MeshColors.disabledGreyBackground : '#444444' } 
          transparent 
          opacity={1}/>
        </mesh>
        <mesh 
        name='setting-0-background-wrapper'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 2.9]}
        onPointerEnter={e=>handleSetting0PointerEnter(e)}
        onPointerLeave={e=>handleSetting0PointerLeave(e)}
        onPointerUp={e=>handleSetting0PointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          transparent 
          opacity={0}/>
        </mesh>
      </group>
      <Text3D 
      name='setting-0-title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,-0.8]}
      rotation={[-Math.PI/2,0,0]}
      size={0.4}
      height={0.01}>
        BACKDO LAUNCH
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group 
      name='setting-0-toggle' 
      position={[5.95, 0.1, -1]}>
        <group name='setting-0-toggle-background'>
          <mesh 
          name='setting-0-toggle-background-left-circle'
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting0ToggleBackgroundColor}
            />
          </mesh>
          <mesh
          name='setting-0-toggle-background-block'
          position={[0.2, 0, 0]}
          scale={[0.4, 0.01, 0.5]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting0ToggleBackgroundColor}
            />
          </mesh>
          <mesh 
          name='setting-0-toggle-background-right-circle'
          position={[0.4, 0, 0]}
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting0ToggleBackgroundColor}
            />
          </mesh>
        </group>
        <animated.mesh
        name='setting-0-toggle-switch'
        scale={[0.15, 0.02, 0.15]}
        position={setting0TogglePosition}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
        </animated.mesh>
      </group>
      <Text3D 
      name='setting-0-description'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,-0.2]}
      rotation={[-Math.PI/2,0,0]}
      size={0.3}
      height={0.01}
      lineHeight={0.8}>
        {`IF A TEAM THROWS A BACKDO (-1)\nAND HAS NO PIECES ON THE BOARD,\nTHEY CAN PUT A PIECE ON THE STAR\nBEHIND EARTH.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
    <group name='setting-1' position={[5.2, 0, -0.9]}>
      <group name='setting-1-background'>
        { isHost && gamePhase === 'lobby' && <mesh
        name='setting-1-background-outer'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 1.5]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> }
        <mesh 
        name='setting-1-background-inner'
        position={[3.25, 0, 0]}
        scale={[7.05, 0.1, 1.45]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          color={ !setting1Hover ? MeshColors.disabledGreyBackground : '#444444' } 
          transparent 
          opacity={1}/>
        </mesh>
        <mesh 
        name='setting-1-background-wrapper'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.1, 1.5]}
        onPointerEnter={e=>handleSetting1PointerEnter(e)}
        onPointerLeave={e=>handleSetting1PointerLeave(e)}
        onPointerUp={e=>handleSetting1PointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          transparent 
          opacity={0}/>
        </mesh>
      </group>
      <Text3D
      name='setting-1-title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,-0.1]}
      rotation={[-Math.PI/2,0,0]}
      size={0.4}
      height={0.01}>
        TIMER
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group 
      name='setting-1-toggle' 
      position={[5.95, 0.1, -0.3]}>
        <group name='setting-1-toggle-background'>
          <mesh 
          name='setting-1-toggle-background-left-circle'
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting1ToggleBackgroundColor}
            />
          </mesh>
          <mesh
          name='setting-1-toggle-background-block'
          position={[0.2, 0, 0]}
          scale={[0.4, 0.01, 0.5]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting1ToggleBackgroundColor}
            />
          </mesh>
          <mesh 
          name='setting-1-toggle-background-right-circle'
          position={[0.4, 0, 0]}
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting1ToggleBackgroundColor}
            />
          </mesh>
        </group>
        <animated.mesh
        name='setting-1-toggle-switch'
        scale={[0.15, 0.02, 0.15]}
        position={setting1TogglePosition}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
        </animated.mesh>
      </group>
      <Text3D 
      name='setting-1-description'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,0.5]}
      rotation={[-Math.PI/2,0,0]}
      size={0.3}
      height={0.01}
      lineHeight={0.8}>
        {`1 MINUTE TIME LIMIT PER TURN.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
    <group name='setting-2' position={[5.2, 0, 0.95]}>
      <group name='setting-2-background'>
        { isHost && gamePhase === 'lobby' && <mesh
        name='setting-2-background-outer'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 2]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> }
        <mesh 
        name='setting-2-background-inner'
        position={[3.25, 0, 0]}
        scale={[7.05, 0.1, 1.95]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          color={ !setting2Hover ? MeshColors.disabledGreyBackground : '#444444' } 
          transparent 
          opacity={1}/>
        </mesh>
        <mesh 
        name='setting-2-background-wrapper'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 2]}
        onPointerEnter={e=>handleSetting2PointerEnter(e)}
        onPointerLeave={e=>handleSetting2PointerLeave(e)}
        onPointerUp={e=>handleSetting2PointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          transparent 
          opacity={0}/>
        </mesh>
      </group>
      <Text3D 
      name='setting-2-title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,-0.35]}
      rotation={[-Math.PI/2,0,0]}
      size={0.4}
      height={0.01}>
        NAK THROW
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group 
      name='setting-2-toggle' 
      position={[5.95, 0.1, -0.55]}>
        <group name='setting-2-toggle-background'>
          <mesh 
          name='setting-2-toggle-background-left-circle'
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting2ToggleBackgroundColor}
            />
          </mesh>
          <mesh
          name='setting-2-toggle-background-block'
          position={[0.2, 0, 0]}
          scale={[0.4, 0.01, 0.5]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting2ToggleBackgroundColor}
            />
          </mesh>
          <mesh 
          name='setting-2-toggle-background-right-circle'
          position={[0.4, 0, 0]}
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting2ToggleBackgroundColor}
            />
          </mesh>
        </group>
        <animated.mesh
        name='setting-2-toggle-switch'
        scale={[0.15, 0.02, 0.15]}
        position={setting2TogglePosition}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
        </animated.mesh>
      </group>
      <Text3D 
      name='setting-2-description'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,0.25]}
      rotation={[-Math.PI/2,0,0]}
      size={0.3}
      height={0.01}
      lineHeight={0.8}>
        {`THE STICKS WILL SOMETIMES FALL\nOUT OF BOUNDS.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
    <group name='setting-3' position={[5.2, 0, 3.05]}>
      <group name='setting-3-background'>
        { isHost && gamePhase === 'lobby' && <mesh
        name='setting-3-background-outer'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.05, 2]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh> }
        <mesh 
        name='setting-3-background-inner'
        position={[3.25, 0, 0]}
        scale={[7.05, 0.1, 1.95]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          color={ !setting3Hover ? MeshColors.disabledGreyBackground : '#444444' } 
          transparent 
          opacity={1}/>
        </mesh>
        <mesh 
        name='setting-3-background-wrapper'
        position={[3.25, 0, 0]}
        scale={[7.1, 0.1, 2]}
        onPointerEnter={e=>handleSetting3PointerEnter(e)}
        onPointerLeave={e=>handleSetting3PointerLeave(e)}
        onPointerUp={e=>handleSetting3PointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial 
          transparent 
          opacity={0}/>
        </mesh>
      </group>
      <Text3D 
      name='setting-3-title'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,-0.35]}
      rotation={[-Math.PI/2,0,0]}
      size={0.4}
      height={0.01}>
        BONUS THROW CATCH
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <group 
      name='setting-3-toggle' 
      position={[5.95, 0.1, -0.55]}>
        <group name='setting-3-toggle-background'>
          <mesh 
          name='setting-3-toggle-background-left-circle'
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting3ToggleBackgroundColor}
            />
          </mesh>
          <mesh
          name='setting-3-toggle-background-block'
          position={[0.2, 0, 0]}
          scale={[0.4, 0.01, 0.5]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting3ToggleBackgroundColor}
            />
          </mesh>
          <mesh 
          name='setting-3-toggle-background-right-circle'
          position={[0.4, 0, 0]}
          scale={[0.25, 0.01, 0.25]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={setting3ToggleBackgroundColor}
            />
          </mesh>
        </group>
        <animated.mesh
        name='setting-3-toggle-switch'
        scale={[0.15, 0.02, 0.15]}
        position={setting3TogglePosition}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
        </animated.mesh>
      </group>
      <Text3D 
      name='setting-3-description'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-0.1,0.1,0.25]}
      rotation={[-Math.PI/2,0,0]}
      size={0.3}
      height={0.01}
      lineHeight={0.8}>
        {`GET ANOTHER TURN, EVEN WHEN\nYOU CATCH WITH A YUT OR MO.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  </group>
}