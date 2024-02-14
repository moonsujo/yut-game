import React from "react";
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Pointer({ color, scale=4, position=[0, 1.5, 0], opacity=1 }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    ref.current.rotation.y = state.clock.elapsedTime
  })

  return <mesh 
    ref={ref} 
    receiveShadow 
    position={position} 
    rotation={[Math.PI, 0, 0]}
    scale={scale}>
    <coneGeometry args={[0.1, 0.3, 3]}/>
    <AnimatedMeshDistortMaterial color={color} transparent opacity={opacity}/>
  </mesh>
}