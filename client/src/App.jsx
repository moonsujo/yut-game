import React, { Suspense } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import ParticleSystem from './particles/ParticleSystem';
import Home2Experience from './Home2Experience';
import LoadingScreen from './LoadingScreen';
import { Loader } from '@react-three/drei';
import MilkyWay from './shader/MilkyWay';
import StarsPatterns2Shader from './shader/starsPatterns2/StarsPatterns2Shader';
import * as THREE from 'three';
import Alert from './Alert';
import AssetLoader from './AssetLoader';

export default function App () {

  const created = ({ gl }) =>
  {
      gl.setClearColor('#090f16', 1)
  }

  return (<>
    <Canvas
      className='r3f'
      onCreated={ created }
    >
      <Suspense fallback={null}>
        {/* <Perf/> */}
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        <ParticleSystem/>
        <SocketManager/>
        <AssetLoader/>
        <Route path="/">
          <Home2Experience/>
        </Route>
        <Route path="/:id">
          <Experience/>
          <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/3.png'}/>
          <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/6.png'} size={2}/>
          <MilkyWay // will not show without a camera
            rotation={[-Math.PI/2, 0, -35.0]} 
            position={[0, -10, -4]}
            scale={5}
            brightness={0.5}
            colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
          />
          <Alert position={[0,2,0.5]} rotation={[0,0,0]}/>
        </Route>
      </Suspense>
    </Canvas>
    <Loader/>
  </>)
}