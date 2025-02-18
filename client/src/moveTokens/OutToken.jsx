import { Text3D } from "@react-three/drei";

export default function OutToken(props) {

  return <group {...props}>
    <group name='move-token'>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.17,-0.01,-0.15]}
        size={0.35}
        height={0.1}
      >
        0
        <meshStandardMaterial color="white"/>
      </Text3D>
      <mesh name='ring-outer' rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1]}/>
        <meshStandardMaterial color='grey'/>
      </mesh>
      <mesh name='ring-inner' rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.11]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
    </group>
  </group>
}