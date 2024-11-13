import { Text3D, useGLTF } from '@react-three/drei';
import { useFrame, useGraph } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { SkeletonUtils } from 'three-stdlib';
import HtmlElement from '../HtmlElement';
import YootMesh from './YootMesh';

export default function YootButtonModel({
  position,
  rotation,
  scale,
  turnedOn
}) {
  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");
  const { scene } = useGLTF("/models/yoot-for-button.glb");
  const yootMaterials = useGLTF("/models/yoot-for-button.glb").materials
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const yootNodes = useGraph(clone).nodes
  let buttonRef = useRef();

  const scaleOuter = [1.4, -0.079, 1]
  const scaleInner = [scaleOuter[0] - 0.1, scaleOuter[1]+0.2, scaleOuter[2]-0.1]
  const scaleYoot = 0.15
  const scaleYootArray=[0.2, 0.14, 0.14]

  useFrame((state, delta) => {
    if (turnedOn) {
      // expand with time
    }
  })
  return <group 
    position={position} 
    rotation={rotation} 
    scale={scale} 
    ref={buttonRef}
  >
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Cube.geometry}
      rotation={[-Math.PI, 0, -Math.PI]}
      scale={scaleOuter}
    >
      <meshStandardMaterial color={ turnedOn ? "yellow" : "grey" }/>
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
        active={turnedOn}
      />
      <YootMesh
        position={[-0.05,0.1,-0.19]}
        rotation={[0,0,-Math.PI/2]}
        scale={scaleYootArray}
        active={turnedOn}
      />
      <YootMesh
        position={[-0.05,0.1,0.15]}
        rotation={[0,0,-Math.PI/2]}
        scale={scaleYootArray}
        active={turnedOn}
      />
      <YootMesh
        position={[-0.05,0.1,0.49]}
        rotation={[0,0,-Math.PI/2]}
        scale={scaleYootArray}
        active={turnedOn}
      />
    </group>
    <Text3D
      position={[-1.1, 0.2, -0.7]}
      rotation={[-Math.PI/2,0,-Math.PI/2]}
      font="fonts/Luckiest Guy_Regular.json" 
      size={0.3} 
      height={0.01}
    >
      THROW
      <meshStandardMaterial color={ turnedOn ? "yellow" : "grey" }/>
    </Text3D>
  </group>
}


useGLTF.preload('/models/rounded-rectangle.glb')
useGLTF.preload('/models/yoot-for-button.glb')