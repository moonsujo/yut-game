import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import OutToken from "../moveTokens/OutToken";

export default function OutAlert({ position, rotation, scale }) {
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <mesh
        castShadow
        receiveShadow
        scale={[1, 0.055, 3.3]}
      >
        <cylinderGeometry args={[1, 1, 1, 64]}/>
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.28, 0.1, -2.7]}
        size={0.5}
        height={0.01}
        lineHeight={0.8}
      >
        {`LOST IN SPACE!`}
        <meshStandardMaterial color="yellow"/>
      </Text3D>
      <OutToken position={[-0.05, 0.1, 2.4]} scale={0.9}/>
    </animated.group>
  )
}