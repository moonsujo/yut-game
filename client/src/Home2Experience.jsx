import Home2 from "./Home2";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader";
import Constellation from "./shader/constellation/Constellation";

export default function Home2Experience() {

    return <group>
        <Home2/>
        <StarsPatterns2Shader count={3000} texturePath={'textures/particles/3.png'}/>
        <StarsPatterns2Shader count={3000} texturePath={'textures/particles/6.png'} size={2.0}/>
        <MilkyWay
            rotation={[-Math.PI/2, 0, -35.0]} 
            position={[0,-1,0]} 
            scale={4}
            brightness={0.5}
            colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
        />
        <Constellation omitFactor={2} position={[-15.5,-1,-6.5]} rotation={[-Math.PI/2, 0, Math.PI/16]} scale={1.3} modelPath={'models/star.glb'}/>
        <Constellation omitFactor={4} position={[-8.7,-1,-7.1]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={0.9} modelPath={'models/star.glb'}/>
        <Constellation omitFactor={2} position={[-15.5,-1,3.5]} rotation={[-Math.PI/2, 0, Math.PI/6]} scale={1.2} modelPath={'models/star.glb'}/>
        <Constellation omitFactor={2} position={[-9,-1,-1.3]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.3} modelPath={'models/star.glb'}/>
        <Constellation omitFactor={2} position={[5,-1,-6]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.3} modelPath={'models/star.glb'}/>
        <Constellation omitFactor={2} position={[-6.8,-1,3.4]} rotation={[-Math.PI/2, 0, Math.PI/12]} scale={0.8} modelPath={'models/star.glb'}/>
    </group>
}