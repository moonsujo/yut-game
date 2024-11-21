import GameCamera from "./GameCamera";
import Lobby from "./Lobby";
import Moon from "./meshes/Moon";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';

// just to separate shader from stopping when Lobby re-renders
export default function LobbyExperience() {
  return <group>
    {/* milky way */}
    <Lobby/>
    <MilkyWay
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[4, -10, -4]} 
      scale={4}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
    />
  </group>
}