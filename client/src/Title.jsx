import { Float, Text3D } from '@react-three/drei';
import React, { useMemo, useState } from 'react';
import Star from './meshes/Star';
import { useSpring, animated } from '@react-spring/three';
import TitleStarsShader from './shader/titleStars/TitleStarsShader';

export default function Title({ position, rotation, scale, setDisplay }) {

  const [hover, setHover] = useState(false);
  function handlePointerEnter() {
      setHover(true)
  }
  function handlePointerLeave() {
      setHover(false)
  }
  function handlePointerUp() {
      setDisplay('board')
  }

  return <group scale={scale} position={position} rotation={rotation}>
    {/* line 1 */}
    {/* line 2 */}
    {/* wrapper */}
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={0.4}
      height={0.01}
      position={[0, -0.5, 0]}
      letterSpacing={0.04}
    >
      YUT
      <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={0.4}
      height={0.01}
      position={[0, -1, 0]}
      letterSpacing={0.03}
    >
      NORI
      <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
    </Text3D>
    <mesh 
      position={[0.7, -0.5, 0]} 
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[1.5, 1, 0.1]}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    {/* <TitleStarsShader texturePath={'/textures/particles/6.png'}/> */}
  </group>
}