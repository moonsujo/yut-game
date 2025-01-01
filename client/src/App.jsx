import React, { Suspense } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import ParticleSystem from './particles/ParticleSystem';
import Home2Experience from './Home2Experience';
import LoadingScreen from './LoadingScreen';
import { Loader } from '@react-three/drei';

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
        <Route path="/">
          <Home2Experience/>
        </Route>
        <Route path="/:id">
          <Experience/>
        </Route>
      </Suspense>
    </Canvas>
    <Loader/>
  </>)
}