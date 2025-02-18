import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import BackdoToken from "../moveTokens/BackdoToken";

export default function BackdoAlert({ position, rotation, scale }) {
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        scale={[0.8, 0.065, 2.1]}
      >
        <cylinderGeometry args={[1, 1, 1, 64]}/>
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.2, 0, -1.6]}
        size={0.45}
        height={0.1}
      >
        BACKDO
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <BackdoToken position={[0, 0.09, 1.2]}/>
    </animated.group>
  )
}