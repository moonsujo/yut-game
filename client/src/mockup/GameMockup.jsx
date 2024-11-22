import Board from "../Board";
import GameCamera from "../GameCamera";
import MilkyWay from "../shader/MilkyWay";
import StarsPatterns2Shader from "../shader/starsPatterns2/StarsPatterns2Shader";
import * as THREE from 'three';

export default function GameMockup() {
  return <group>
    
    <StarsPatterns2Shader count={3000} texturePath={'textures/particles/3.png'}/>
    <StarsPatterns2Shader count={3000} texturePath={'textures/particles/6.png'} size={2.0}/>
    <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[7, -10, -4]} 
      scale={3}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
    />
      <Board 
        position={[7,-15,-6]}
        scale={0.7}
        tiles={[]}
        legalTiles={[]}
        helperTiles={[]}
        interactive={true}
        showStart={true}
        device={'landscapeDesktop'}
      />
      <GameCamera/>
  </group>
}