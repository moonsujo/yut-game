import { animated } from "@react-spring/three";
import { Float } from "@react-three/drei";
import YootMesh from "./meshes/YootMesh";
import YootRhino from "./meshes/YootRhino";

export default function YootDisplay({position, rotation, scale}) {
  return <animated.group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    <Float floatIntensity={0.001} floatingRange={[0.05, 0.05]} speed={2} rotationIntensity={0.3}>
      <YootMesh scale={0.9} position={[0,0,-2.1]} rotation={[-Math.PI/8, Math.PI/16, -Math.PI/2 + Math.PI]}/>
      <YootMesh scale={0.9} position={[0.5,0,0]} rotation={[0, 0, -Math.PI/2 + Math.PI/16 + Math.PI]} />
      <YootMesh scale={0.9} position={[0.5,1.0,2]} rotation={[Math.PI/32, -Math.PI/32, -Math.PI/2 + Math.PI]} />
      <YootRhino scale={0.9} position={[0,1,4]} rotation={[Math.PI/6, -Math.PI/16, -Math.PI/2 + Math.PI]} />
    </Float>
  </animated.group>
}