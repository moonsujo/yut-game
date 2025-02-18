import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";

export default function GulAlert({ position, rotation, scale }) {
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        scale={[0.75, 0.065, 1.671]}
      >
        <cylinderGeometry args={[1, 1, 1, 64]}/>
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.2, 0, -1.1]}
        size={0.5}
        height={0.1}
      >
        GUL
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <group name='move-token' position={[0, 0.09, 0.7]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          rotation={[Math.PI/2, Math.PI, Math.PI/2]}
          position={[-0.17,-0.01,-0.13]}
          size={0.4}
          height={0.1}
        >
          3
          <meshStandardMaterial color="yellow"/>
        </Text3D>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.11]}/>
          <meshStandardMaterial color='black' opacity={0.9} transparent/>
        </mesh>
      </group>
    </animated.group>
  )
}