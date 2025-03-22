// add this and YootButton into Game
// YootButton sends event to server
// server returns result and animation to Yoot
// Yoot plays the animation
// on finish, play the throw alert
// what about the move list?

import React, { useEffect, useRef } from 'react'
import { LoopOnce } from 'three'
import { useAnimations, useGLTF } from '@react-three/drei';
import { yootAnimationAtom } from './GlobalState';
import { useAtomValue } from 'jotai';
import { useSpring, animated } from '@react-spring/three';

export default function YootNew({ animation, scale, position, rotation=[0,0,0] }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/yoot-animation-3.glb')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    if (animation) {
      for (let i = 0; i < 4; i++) {
        actions[`yoot${i}Throw${animation}`].clampWhenFinished = true
        actions[`yoot${i}Throw${animation}`].play().setLoop(LoopOnce);
      }
    }
  }, [animation])

  const { yutScale } = useSpring({
    yutScale: animation ? 1 : 0
  })

  return <animated.group scale={yutScale}>
    <group ref={group} scale={scale} position={position} rotation={rotation} dispose={null}>
      <group name="Scene">
        <mesh
          name="yoot1"
          castShadow
          receiveShadow
          geometry={nodes.yoot1.geometry}
          material={materials['material-disabled']}
          position={[19.534, 15.094, 21.846]}
          rotation={[0.116, -0.574, -1.317]}
        />
        <mesh
          name="yoot0"
          castShadow
          receiveShadow
          geometry={nodes.yoot0.geometry}
          material={materials['Material.006']}
          position={[16.01, 14.715, 19.09]}
          rotation={[0.074, -1.309, -1.29]}
        />
        <mesh
          name="yoot2"
          castShadow
          receiveShadow
          geometry={nodes.yoot2.geometry}
          material={materials['Material.002']}
          position={[19.534, 15.094, 14.766]}
          rotation={[0.068, -0.334, -1.363]}
        />
        <mesh
          name="yoot3"
          castShadow
          receiveShadow
          geometry={nodes.yoot3.geometry}
          material={materials['Material.008']}
          position={[23.029, 15.094, 18.171]}
          rotation={[0.116, -0.753, -1.391]}
        />
      </group>
    </group>
  </animated.group>
}