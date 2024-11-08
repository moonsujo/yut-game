import { useLoader } from "@react-three/fiber";
import Home2 from "./Home2";
import useMeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';
import { TextureLoader } from 'three'
import { useEffect, useState } from "react";
import StarsPatternsShader from "./shader/starsPatterns2/StarsPatternsShader";
import WolfConstellationBufferGeometry from "./shader/wolf/BullConstellation";
import SaturnConstellation from "./shader/saturn/SaturnConstellation";
import BullConstellation from "./shader/wolf/BullConstellation";
import Constellation from "./shader/constellation/Constellation";
import { Float } from "@react-three/drei";

export default function Home2Experience() {

    return <group>
        <Home2/>
        {/* <StarsPatternsShader count={2000} texturePath={'textures/particles/1.png'}/> */}
        <StarsPatternsShader count={3000} texturePath={'textures/particles/3.png'}/>
        {/* <StarsPatternsShader count={3000} texturePath={'textures/particles/5.png'}/> */}
        <StarsPatternsShader count={3000} texturePath={'textures/particles/6.png'} size={2.0}/>
        <MilkyWay
            rotation={[-Math.PI/2, 0, -35.0]} 
            position={[0,-1,0]} 
            scale={4}
            brightness={0.5}
            colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
        />
        {/* <SaturnConstellation position={[-12.1,0,-6]} rotation={[-Math.PI/2, 0, 0]} scale={3}/> */}
        {/* <WolfConstellationBufferGeometry position={[-10.1,0,2]} rotation={[-Math.PI/2, 0, 0]} scale={2.5}/> */}
        {/* <Float rotationIntensity={0.02} speed={2} floatingRange={[0.1, 0.1]}> */}
            <Constellation omitFactor={2} position={[-15.5,-1,-6.5]} rotation={[-Math.PI/2, 0, Math.PI/16]} scale={1.3} modelPath={'models/star.glb'}/>
        {/* </Float> */}
        {/* <Float rotationIntensity={0.05} speed={2} floatingRange={[0.1, 0.1]}>         */}
            <Constellation omitFactor={4} position={[-8.7,-1,-7.1]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={0.9} modelPath={'models/star.glb'}/>
        {/* </Float> */}
        {/* <Float rotationIntensity={0.02} speed={2} floatingRange={[0.1, 0.1]}>        
            <Constellation omitFactor={4} position={[-16,-1,-2]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1} modelPath={'models/star.glb'}/>
        </Float> */}
        {/* <Float rotationIntensity={0.05} speed={2} floatingRange={[0.1, 0.1]}> */}
        <Constellation omitFactor={2} position={[-15.5,-1,3.5]} rotation={[-Math.PI/2, 0, Math.PI/6]} scale={1.2} modelPath={'models/star.glb'}/>

        {/* </Float> */}
        {/* <Float rotationIntensity={0.05} speed={2} floatingRange={[0.1, 0.1]}> */}
        <Constellation omitFactor={2} position={[-9,-1,-1.3]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.3} modelPath={'models/star.glb'}/>

        {/* </Float> */}
        {/* <Float rotationIntensity={0.1} speed={2} floatingRange={[0.1, 0.1]}> */}
            <Constellation omitFactor={2} position={[5,-1,-6]} rotation={[-Math.PI/2, 0, Math.PI/4]} scale={1.5} modelPath={'models/star.glb'}/>

        {/* </Float> */}
            <Constellation omitFactor={2} position={[-6.1,-1,3]} rotation={[-Math.PI/2, 0, Math.PI/12]} scale={1.2} modelPath={'models/star.glb'}/>
    </group>
}