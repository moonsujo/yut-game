// add this and YootButton into Game
// YootButton sends event to server
// server returns result and animation to Yoot
// Yoot plays the animation
// on finish, play the throw alert
// what about the move list?

import { useEffect, useRef } from 'react'
import { LoopOnce } from 'three'
import { useAnimations, useGLTF } from '@react-three/drei';
import { animated } from '@react-spring/three';

export default function YootNew({ animation, scale, position, rotation=[0,0,0] }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/yoot-animation-2-korean-darker-more.glb')
  // const { nodes, materials, animations } = useGLTF('/models/yoot-animation-3.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (animation) {
      for (let i = 0; i < 4; i++) {
        actions[`yoot${i}Throw${animation}`].clampWhenFinished = true
        actions[`yoot${i}Throw${animation}`].play().setLoop(LoopOnce);
      }
    }
  }, [animation])

  return <animated.group>
    <group ref={group} scale={scale} position={position} rotation={rotation} dispose={null}>
      <group name="Scene">
        <mesh
          name="yoot1"
          castShadow
          receiveShadow
          geometry={nodes.yoot1.geometry}
          material={materials['material-disabled']}
          position={[18.462, 18.952, 25.28]}
          rotation={[0.124, 0.688, -1.594]}
        />
        <mesh
          name="yoot0"
          castShadow
          receiveShadow
          geometry={nodes.yoot0.geometry}
          material={materials['Material.006']}
          position={[21.891, 19.815, 24.858]}
          rotation={[2.989, -0.578, 1.338]}
        />
        <mesh
          name="yoot2"
          castShadow
          receiveShadow
          geometry={nodes.yoot2.geometry}
          material={materials['Material.002']}
          position={[17.553, 19.724, 22.361]}
          rotation={[0.089, 0.217, -1.491]}
        />
        <mesh
          name="yoot3"
          castShadow
          receiveShadow
          geometry={nodes.yoot3.geometry}
          material={materials['Material.008']}
          position={[20.853, 18.429, 21.136]}
          rotation={[-0.205, 0.372, -1.518]}
        />
      </group>
    </group>
  </animated.group>
}