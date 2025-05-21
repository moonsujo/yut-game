import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useRef, useState } from 'react';
import { addingDeviceMotionAtom, clientAtom, deviceAtom, hasTurnAtom, pauseGameAtom, shakeToThrowEnabledAtom, showShakeMeshAtom, throwCountAtom, turnAtom, yootAnimationPlayingAtom } from './GlobalState';
import { socket } from './SocketManager';
import { useParams } from "wouter";
import layout from './layout';
import YootMesh from './meshes/YootMesh';
import { useAnimationPlaying } from './hooks/useAnimationPlaying';
import { animated, useSpring } from '@react-spring/three';
import Check from './meshes/Check';
import useShakeDetector from './hooks/useShakeDetector';
import axios from 'axios';

export default function YootButtonNew({ position, rotation, scale }) {
  const { nodes } = useGLTF("/models/rounded-rectangle.glb");
  let buttonRef = useRef();
  const params = useParams();

  const device = useAtomValue(deviceAtom)
  const setYootAnimationPlaying = useSetAtom(yootAnimationPlayingAtom)
  const hasTurn = useAtomValue(hasTurnAtom)
  const paused = useAtomValue(pauseGameAtom)
  const client = useAtomValue(clientAtom);
  const turn = useAtomValue(turnAtom);
  const throwCount = useAtomValue(throwCountAtom)
  const hasThrow = client.team === turn.team && throwCount > 0

  const animationPlaying = useAnimationPlaying()
  const enabled = !animationPlaying && hasTurn && hasThrow

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]

  const scaleYootArray=[0.2, 0.14, 0.14]

  const timeoutRef = useRef(null)

  useFrame((state, delta) => {
    if (enabled) {
      // buttonRef.current.scale.x = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
      // buttonRef.current.scale.y = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
      // buttonRef.current.scale.z = Math.sin(state.clock.elapsedTime * 3) * 0.07 + scale
    } else {
      // buttonRef.current.scale.x = scale
      // buttonRef.current.scale.y = scale
      // buttonRef.current.scale.z = scale
    }
  })

  function handlePointerEnter(e) {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  }
  function handlePointerLeave(e) {
    e.stopPropagation();
    document.body.style.cursor = "default";
  }

  const DEBOUNCE_DELAY = 300
  async function handleClick(e) {
    e.stopPropagation();

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      if (enabled && !paused) {
        setYootAnimationPlaying(true)
        socket.emit('throwYut', { roomId: params.id.toUpperCase() })
        console.log('click event emitted')
        const audio = new Audio('sounds/effects/throw-yut-2.mp3');
        audio.volume=1
        audio.play();
      }
            
      const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
        eventName: 'buttonClick',
        timestamp: new Date(),
        payload: {
          'button': 'throwYut',
        }
      })

      console.log('[YootButton] post log response', response)
    }, DEBOUNCE_DELAY)
  }

  function ThrowCount({position, orientation}) {
    function positionByOrientation(index, orientation) {
      if (orientation === 'downUp') {
        return [index*0.4, 0, 0]
      } else if (orientation === 'leftRight') {
        return [0, 0, index*0.5]
      }
    }

    const tempArray = [...Array(throwCount > 0 ? throwCount : 0)]
    return <group position={position}>
      {tempArray.map((_value, index) => {
        return <mesh key={index} position={positionByOrientation(index, orientation)}>
          <sphereGeometry args={[0.1, 32, 16]}/>
          <meshStandardMaterial color={ enabled ? 'yellow' : 'grey' }/>
        </mesh>
      })}
    </group>
  }

  // Error prevention - if device doesn't support the feature
  function ShakeToThrowButton(props) {
    const [shakeToThrowEnabled, setShakeToThrowEnabled] = useAtom(shakeToThrowEnabledAtom)
    const addingDeviceMotion = useAtomValue(addingDeviceMotionAtom)
    const [showShakeMesh, setShowShakeMesh] = useAtom(showShakeMeshAtom)
    function handler() {
      setShowShakeMesh(true)
    }
    const [enableShakeToThrow, disableShakeToThrow] = useShakeDetector(handler)
    const [pressed, setPressed] = useState(false)
    const { pressedScale } = useSpring({
      pressedScale: pressed ? 1.2 : 1 
    })
    function handlePointerEnter(e) {
      e.stopPropagation()
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setPressed(false)
    }
    function handlePointerDown(e) {
      e.stopPropagation()
      setPressed(true)
    }
    function handlePointerUp(e) {
      e.stopPropagation()
      if (shakeToThrowEnabled) {
        disableShakeToThrow()
        setShakeToThrowEnabled(false)
      } else {
        enableShakeToThrow()
        setShakeToThrowEnabled(true)
      }
      setPressed(false)
    }
    return <group name='shake-to-throw-button' {...props}>
      {/* background */}
      <animated.group name='animation-wrapper' scale={pressedScale}>
        <group name='shake-to-throw-background'>
          <mesh name='shake-to-throw-background-outer' scale={[1.1, 0.01, 1.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={YUT_BROWN}/>
          </mesh>
          <mesh name='shake-to-throw-background-outer' scale={[1.0, 0.02, 1.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='shake-to-throw-wrapper' scale={[1.1, 0.02, 1.9]}
          onPointerEnter={e=>handlePointerEnter(e)}
          onPointerLeave={e=>handlePointerLeave(e)}
          onPointerDown={e=>handlePointerDown(e)}
          onPointerUp={e=>handlePointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[0.07,0.02,-0.8]}
          rotation={[-Math.PI/2,0,-Math.PI/2]}
          size={0.27}
          height={0.01}
          lineHeight={0.8}
        >
          {`SHAKE TO\nTHROW`}
          <meshStandardMaterial color={YUT_BROWN}/>
        </Text3D>
        {/* checkbox */}
        <mesh name='shake-to-throw-status-icon' scale={[0.24, 0.12, 0.24]} position={[-0.23, 0.04, 0.66]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={ shakeToThrowEnabled ? 'green' : 'grey' }/>
        </mesh>
      </animated.group>
      { showShakeMesh && <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0.7,0.02,-1]}
        rotation={[-Math.PI/2, 0, -Math.PI/2]}
        size={0.26}
        height={0.01}>
          shake detected
        </Text3D> }
        
      { addingDeviceMotion && <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[1,0.02,-1]}
        rotation={[-Math.PI/2, 0, -Math.PI/2]}
        size={0.26}
        height={0.01}>
          adding device motion
        </Text3D> }
    </group>
  }

  const YUT_BROWN = '#EE9E26'
  return turn.team !== -1 && <group 
    position={position} 
    rotation={rotation} 
    scale={scale}
    ref={buttonRef}
  >
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleOuter}
      >
        <meshStandardMaterial color={ enabled ? YUT_BROWN : "grey" }/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={scaleInner}
      >
        <meshStandardMaterial color="#000B18"/>
      </mesh>
      <group position={[0.3, 0.1, 0]}>
        <YootMesh
          position={[-0.05,0.1,-0.535]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          active={enabled}
        />
        <YootMesh
          position={[-0.05,0.1,-0.19]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          active={enabled}
        />
        <YootMesh
          position={[-0.05,0.1,0.15]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          active={enabled}
        />
        <YootMesh
          position={[-0.05,0.1,0.49]}
          rotation={[0,0,-Math.PI/2]}
          scale={scaleYootArray}
          active={enabled}
        />
      </group>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        size={0.3} 
        height={0.01} 
        position={[-1.1, 0.2, -0.7]}
        rotation={[-Math.PI/2,-Math.PI/2,0, "YXZ"]}
      >
        THROW
        <meshStandardMaterial color={ !!enabled ? "#963600" : "grey" }/>
      </Text3D>
      <mesh name='wrapper'
        position={[0, 0.1, 0]} 
        onPointerEnter={e=>handlePointerEnter(e)}
        onPointerLeave={e=>handlePointerLeave(e)}
        onPointerUp={e=>handleClick(e)}
      >
        <boxGeometry args={[3, 0.2, 2]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh> 
    </group>
    { client.team === turn.team && <ThrowCount 
      position={layout[device].game.throwCount.position}
      orientation={layout[device].game.throwCount.orientation}
    /> }
    {/* { device === 'portrait' && <ShakeToThrowButton position={[2, 0, 0]}/> } */}
  </group>
}