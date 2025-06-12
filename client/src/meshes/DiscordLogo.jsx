import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function DiscordLogo(props) {
  const { nodes, materials } = useGLTF('./models/discord-logo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Skin_~BrushAlpha8_Skin_~BrushAlpha8_0'].geometry}
      >
        <meshStandardMaterial color={props.color}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('./models/discord-logo.glb')