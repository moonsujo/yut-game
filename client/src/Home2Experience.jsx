import { useLoader } from "@react-three/fiber";
import Home2 from "./Home2";
import useMeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';
import { TextureLoader } from 'three'
import { useEffect, useState } from "react";
import StarsPatternsShader from "./shader/starsPatterns2/StarsPatternsShader";

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
    </group>
}