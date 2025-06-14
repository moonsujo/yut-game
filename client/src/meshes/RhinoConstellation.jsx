
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function RhinoConstellation({position, rotation, scale, opacity}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/rhino-constellation-dhazele-2.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
      <group name="Scene">
        <mesh
          name="rhino"
          castShadow
          receiveShadow
          geometry={nodes.rhino.geometry}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.713}
        >
          <meshStandardMaterial color='#00ABBC' transparent opacity={opacity}/>
        </mesh>
      </group>
    </group>
  )
}
