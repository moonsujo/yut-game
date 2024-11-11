// js
import React from "react";
import * as THREE from "three";

// server
import MilkyWay from "./shader/MilkyWay.jsx";
import Game from "./Game.jsx";
import Alert from "./Alert.jsx";
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader.jsx";

export default function Experience() {

  return <group>
    <Game/>
    <StarsPatterns2Shader count={3000} texturePath={'textures/particles/3.png'}/>
    <StarsPatterns2Shader count={3000} texturePath={'textures/particles/6.png'} size={2.0}/>
    <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -10, -4]} 
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
      colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
    />
    <Alert position={[0,2,0.5]} rotation={[0,0,0]}/>
  </group>
}