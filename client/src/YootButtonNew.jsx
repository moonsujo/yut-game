import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useRef } from 'react';
import { clientAtom, hasTurnAtom, pauseGameAtom, throwCountAtom, turnAtom, yootAnimationPlayingAtom } from './GlobalState';
import { socket } from './SocketManager';
import { useParams } from "wouter";
import layout from './layout';
import YootMesh from './meshes/YootMesh';
import { useAnimationPlaying } from './hooks/useAnimationPlaying';

export default function YootButtonNew({ position, rotation, scale, hasThrow, device }) {
  const { nodes } = useGLTF("/models/rounded-rectangle.glb");
  let buttonRef = useRef();
  const params = useParams();

  const setYootAnimationPlaying = useSetAtom(yootAnimationPlayingAtom)
  const animationPlaying = useAnimationPlaying()

  const hasTurn = useAtomValue(hasTurnAtom)
  const enabled = !animationPlaying && hasTurn && hasThrow
  const paused = useAtomValue(pauseGameAtom)
  const throwCount = useAtomValue(throwCountAtom)

  const client = useAtomValue(clientAtom);
  const turn = useAtomValue(turnAtom);

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]

  const scaleYootArray=[0.2, 0.14, 0.14]

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
  function handleClick(e) {
    e.stopPropagation();

    if (enabled && !paused) {
      setYootAnimationPlaying(true)
      socket.emit('throwYut', { roomId: params.id.toUpperCase() })
    }
  }

  function ThrowCount({position, orientation}) {

    function positionByOrientation(index, orientation) {
      if (orientation === 'downUp') {
        return [index*0.5, 0, 0]
      } else if (orientation === 'leftRight') {
        return [0, 0, index*0.4]
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

  const YUT_BROWN = '#EE9E26'
  return <group 
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
  </group>
}