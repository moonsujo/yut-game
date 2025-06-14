import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function WolfConstellation({position, rotation, scale, opacity}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/wolf-constellation-dhazele-2-new-mat.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
      <group name="Scene">
        <mesh
          name="wolf"
          castShadow
          receiveShadow
          geometry={nodes.wolf.geometry}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.713}
        >
          <meshStandardMaterial color='#00ABBC' transparent opacity={opacity}/>
        </mesh>
      </group>
    </group>
  )
}
