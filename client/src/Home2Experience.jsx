import { useLoader } from "@react-three/fiber";
import Home2 from "./Home2";
import useMeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';
import { TextureLoader } from 'three'
import { useEffect, useState } from "react";

export default function Home2Experience() {

    
    return <group>
        <Home2/>
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