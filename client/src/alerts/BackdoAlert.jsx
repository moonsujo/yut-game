import { Text3D, useGLTF } from "@react-three/drei";
import { animated } from "@react-spring/three";
import BackdoToken from "../moveTokens/BackdoToken";

export default function BackdoAlert({ position, rotation, scale }) {
  const { nodes, materials } = useGLTF('models/alert-background.glb')
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[0.9, 0.055, 2.3]}
      >
        <meshStandardMaterial color='yellow'/>
      </mesh> */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        scale={[0.8, 0.065, 2.1]}
      >
        <meshStandardMaterial color='black' opacity={0.9} transparent/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
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