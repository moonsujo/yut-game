import React, { useState } from "react";
import { MeshStandardMaterial } from 'three';
import { Text3D } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { useFrame } from "@react-three/fiber";
import layout from "./layout.js";
import { pauseGameAtom } from "./GlobalState.jsx";
import { useAtomValue } from "jotai";

export default function ScoreButtons({ device, legalTiles, hasTurn }) {
  
  const params = useParams()
  const paused = useAtomValue(pauseGameAtom)

  function MoveToken({moveInfo, position}) {

    const [hover, setHover] = useState(false);
    const primaryMaterial = new MeshStandardMaterial({ color: 'limegreen' })
    // console.log(primaryMaterial.color.r) // 0.03190
    // console.log(primaryMaterial.color.g) // 0.6105

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

    function scorePointerEnter(event) {
      event.stopPropagation();
      if (hasTurn) {
        document.body.style.cursor = "pointer";
        setHover(true)
      }
    }
  
    function scorePointerOut(event) {
      event.stopPropagation();
      if (hasTurn) {
        document.body.style.cursor = "default";
        setHover(false)
      }
    }

    return <group position={position}>
      <mesh rotation={[-Math.PI/2, 0, 0]} material={primaryMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 0.1]}/>
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.11]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      height={0.01} 
      size={0.5} 
      position={[-0.17, -0.22, 0.05]}
      material={primaryMaterial}>
        {`${moveInfo.move}`}
      </Text3D>
      <mesh 
        name='wrapper' 
        position={[0,0,0]} 
        rotation={[-Math.PI/2, 0, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerLeave={scorePointerOut}
        onPointerDown={() => {
          if (hasTurn && !paused) {
            socket.emit("score", { roomId: params.id.toUpperCase(), selectedMove: moveInfo });
            setHover(false)
          }
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
    return <group
      position={layout[device].game.scoreButtons.multiple.position}
      rotation={layout[device].game.scoreButtons.rotation}>
      <Text3D 
        font="/fonts/Luckiest Guy_Regular.json" 
        height={layout[device].game.scoreButtons.height} 
        size={layout[device].game.scoreButtons.multiple.size}
        lineHeight={layout[device].game.scoreButtons.lineHeight}
      >
        {layout[device].game.scoreButtons.multiple.text}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <group 
      position={layout[device].game.scoreButtons.multiple.buttons.position}
      scale={layout[device].game.scoreButtons.multiple.buttons.scale}>
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
      if (hasTurn) {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        setHover(true)
      }
    }

    function handlePointerLeave(e) {
      if (hasTurn) {
        e.stopPropagation();
        document.body.style.cursor = "default";
        setHover(false)
      }
    }

    function handlePointerUp(e) {
      e.stopPropagation();
      setHover(false)
      if (hasTurn && !paused) {
        socket.emit("score", { roomId: params.id.toUpperCase(), selectedMove: legalTiles[29][0] });
      }
    }

    return <group
    position={layout[device].game.scoreButtons.single.position}
    rotation={[-Math.PI,0,0]}
    >
      <mesh
        name='background-outer'
        scale={[1.55, 0.01, 1.2]}
        material={primaryMaterial}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[1.5, 0.05, 1.15]}
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
        position={[-1, -0.05, 0.05]}
        rotation={[Math.PI/2, 0, 0]}
        size={layout[device].game.scoreButtons.single.size}
        lineHeight={layout[device].game.scoreButtons.lineHeight}
        height={layout[device].game.scoreButtons.height}
        material={primaryMaterial}
      >
        {layout[device].game.scoreButtons.single.text}
      </Text3D>
    </group>
  }

  return <group>
    { legalTiles[29].length > 1 ? <MultipleMoveButtonSet/> : <OneMoveButton/>}
  </group>
}