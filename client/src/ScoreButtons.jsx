import React, { useRef, useState } from "react";
import { MeshStandardMaterial } from 'three';
import { Text3D } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";

export default function ScoreButtons({ position, rotation, scale, legalTiles, buttonPos, textSingle, textMultiple, textSize, enabled, lineHeight, height }) {
  
  const params = useParams()

  function MoveToken({moveInfo, position}) {

    const buttonMatInner = useRef();

    function scorePointerEnter(event) {
      event.stopPropagation();
      if (enabled) {
        document.body.style.cursor = "pointer";
        buttonMatInner.current.color = new THREE.Color('green')
      }
    }
  
    function scorePointerOut(event) {
      event.stopPropagation();
      if (enabled) {
        document.body.style.cursor = "default";
        buttonMatInner.current.color = new THREE.Color('black')
      }
    }

    return <group position={position}>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1]}/>
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.11]}/>
        <meshStandardMaterial color='black' ref={buttonMatInner} />
      </mesh>
      <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      height={0.01} 
      size={0.5} 
      position={[-0.17, -0.22, 0.05]}>
        {`${moveInfo.move}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <mesh 
        name='wrapper' 
        position={[0,0,0]} 
        rotation={[-Math.PI/2, 0, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerLeave={scorePointerOut}
        onPointerDown={() => {
          if (enabled)
            socket.emit("score", { roomId: params.id.toUpperCase(), selectedMove: moveInfo });
        }}
      >
        <cylinderGeometry args={[0.5, 0.5, 0.15]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group> 
  }

  function tokenPositionShift(axis, index) {
    if (axis === 'x') {
      if (index === 0) {
        return 0
      } else if (index === 1) {
        return 1.1
      } else if (index === 2) {
        return 2.2
      } else if (index === 3) {
        return 0
      } else if (index === 4) {
        return 1.1
      } else if (index === 5) {
        return 2.2
      }
    } else if (axis === 'y') {
      if (index < 3) {
        return 0
      } else if (index < 6) {
        return 1.1
      }
    }
  }

  function MultipleMoveButtonSet () {
    return <group>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        height={0.01} 
        size={textSize}
        lineHeight={0.8}
      >
        {textMultiple}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <group position={buttonPos}>
        {legalTiles[29].map( (value, index) => ( // must use parentheses instead of brackets
          <MoveToken 
            moveInfo={value} 
            position={[
              0.4 + tokenPositionShift('x', index), 
              -0.7 - tokenPositionShift('y', index), 
              0
            ]} 
            key={index}
          />
        ))}
      </group>
    </group>
  }

  function OneMoveButton () {    
    const [hover, setHover] = useState(false);
    const primaryMaterial = new MeshStandardMaterial({ color: 'limegreen' })
    console.log(primaryMaterial.color.r) // 0.03190
    console.log(primaryMaterial.color.g) // 0.6105

    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (!hover) {
        primaryMaterial.color.g = 0.3105 + Math.cos(time * 5) * 0.2 + 0.1
      } else {
        primaryMaterial.color.r = 0.7
        primaryMaterial.color.g = 1
        primaryMaterial.color.b = 1
      }
    })

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = "default";
      setHover(false)
    }

    function handlePointerUp(e) {
      e.stopPropagation();
      setHover(false)
      socket.emit("score", { roomId: params.id.toUpperCase(), selectedMove: legalTiles[29][0] });
    }

    return <group rotation={rotation} position={position}>
      <mesh
        name='background-outer'
        scale={[1.95, 0.01, 0.7]}
        material={primaryMaterial}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[1.9, 0.05, 0.65]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color='#090f16'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}
        scale={[1.95, 0.05, 0.7]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.6, -0.05, -0.2]}
        rotation={[Math.PI/2, 0, 0]}
        size={textSize}
        lineHeight={lineHeight}
        material={primaryMaterial}
        height={height}
      >
        {textSingle}
      </Text3D>
    </group>
  }

  return <group 
    position={position} 
    rotation={rotation}
    scale={scale}
  >
    { legalTiles[29].length > 1 ? <MultipleMoveButtonSet/> : <OneMoveButton/>}
  </group>
}