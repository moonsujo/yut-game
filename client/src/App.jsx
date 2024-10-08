import React, { useEffect } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2 from './Home2';
import ParticleSystem from './particles/ParticleSystem';
import mediaValues from './mediaValues';
import { useSetAtom } from 'jotai';
import { deviceAtom } from './GlobalState';
import { Perf } from 'r3f-perf';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing'

export default function App () {

  console.log(ToneMappingMode)
  const created = ({ gl }) =>
  {
      gl.setClearColor('#030615', 1)
  }

  // Responsive UI
  const setDevice = useSetAtom(deviceAtom)
  const handleResize = () => {
    if (window.innerWidth < mediaValues.landscapeCutoff) {
      setDevice("portrait")
    } else {
      setDevice("landscapeDesktop")
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [window.innerWidth]);

  return (<>
    <Canvas
      className='r3f'
      onCreated={ created }
    >
      {/* <Perf/> */}
      {/* <directionalLight position={ [ 0, 10, 0 ] } intensity={ 4 } />
      <ambientLight intensity={ 0.9 } /> */}
      
      {/* <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } /> */}
      <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
      <ParticleSystem/>
      <SocketManager/>
      <EffectComposer>
        <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
        <Bloom mipmapBlur intensity={2} luminanceThreshold={0.5} opacity={0.2}/>
      </EffectComposer>
      <Route path="/">
        <Home2/>
      </Route>
      <Route path="/:id">
        <Experience/>
      </Route>
    </Canvas>
  </>)
}