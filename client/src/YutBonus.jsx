import YootMesh from "./meshes/YootMesh"
import { Text3D } from "@react-three/drei"
import YootRhino from "./meshes/YootRhino"
import SparkleYutShader from "./shader/sparkleYut/SparkleYutShader"
import { useSpring } from "@react-spring/three"
import { useEffect } from "react"
import YootMeshUnrotated from "./meshes/YutMeshUnrotated"
import * as THREE from 'three';

export default function YutBonus({ position, rotation, scale }) {
  
  // rotation to quaternion

  // Euler angles for two different rotations (in radians)
  const euler1 = new THREE.Euler(0, Math.PI / 2, 0); // 45° pitch and yaw
  const euler2 = new THREE.Euler(0, Math.PI / 2, -Math.PI / 2, "ZYX"); // 90° pitch and yaw

  // Convert Euler angles to quaternions
  // const quaternion0 = new THREE.Quaternion().setFromEuler(euler1);
  // const quaternion1 = new THREE.Quaternion().setFromEuler(euler2);

  const yutSprings = useSpring({
    from: {
      yut0Position: [0, 0.2, 0],
      yut0Rotation: [0, 0, 0],
      // yut0Rotation: quaternion0,
      yut1Position: [0.4, 0, -0.2],
      yut1Rotation: [Math.PI/2+Math.PI/16, Math.PI/2+Math.PI/8, Math.PI/16],
      yut2Position: [0.8, 0.2, -0.1],
      yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/8, Math.PI/16],
      yut3Position: [1.1, -0.3, -0.1],
      yut3Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/4, Math.PI/8],
    },
    to: [
      {
        yut0Position: [0.1, 0, 0],
        yut0Rotation: [0, 0, -Math.PI/4],
        // yut0Rotation: quaternion1,
        yut1Position: [0.5, 0, -0.3],
        yut1Rotation: [Math.PI/2+Math.PI/8, Math.PI/2+Math.PI/8,  Math.PI/16],
        yut2Position: [0.6, 0.3, 0],
        yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI * 5 / 6, 0],
        yut3Position: [0.7, -0.2, -0.15],
        yut3Rotation: [Math.PI/2+Math.PI/16, Math.PI/2-Math.PI/12, Math.PI/8],
      },
      // Return to 0 (first position)
      {
        yut0Position: [0, 0.2, 0],
        yut0Rotation: [0, 0, 0],
        // yut0Rotation: quaternion0,
        yut1Position: [0.4, 0, -0.2],
        yut1Rotation: [Math.PI/2+Math.PI/16, Math.PI/2+Math.PI/8, Math.PI/16],
        yut2Position: [0.8, 0.2, -0.1],
        yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/8, Math.PI/16],
        yut3Position: [1.1, -0.3, -0.1],
        yut3Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/4, Math.PI/8],
      },
    ],
    loop: true,
    reset: true // Need this to loop
  })

  return <group name='yut-bonus' position={position} rotation={rotation} scale={scale}>
    <group>
      <YootMeshUnrotated scale={0.2} position={yutSprings.yut0Position} rotation={yutSprings.yut0Rotation}/>
      <YootMesh scale={0.2} position={yutSprings.yut1Position} rotation={yutSprings.yut1Rotation}/>
      <YootMesh scale={0.2} position={yutSprings.yut2Position} rotation={yutSprings.yut2Rotation}/>
      <YootRhino scale={0.2} position={yutSprings.yut3Position} rotation={yutSprings.yut3Rotation}/>
      <group name='label' position={[0.55, 0.5, 0.8]}> 
        <mesh scale={[0.9, 0.01, 0.3]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='#EE9E26'/>
        </mesh>
        <mesh scale={[0.85, 0.02, 0.25]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.5, 0.025, 0.13]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.24}
          height={0.01}
        >
          BONUS
          <meshStandardMaterial color='#EE9E26'/>
        </Text3D>
      </group>
      <SparkleYutShader texturePath={'./textures/particles/8.png'}/>
    </group>
    <group name='wrapper'>
      <mesh/>
      <sphereGeometry/>
    </group>
  </group>
}