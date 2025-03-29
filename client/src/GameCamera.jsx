import React, { useEffect, useRef, useState } from 'react';
import mediaValues from './mediaValues';
import { CameraControls, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function calcZoom() {
  if (window.innerWidth < mediaValues.landscapeCutoff) {
    const zoomMax = 42;
    const newZoom = zoomMax * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  } else {
    const zoomMin = 20;
    const newZoom = zoomMin * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  }
}

export default function GameCamera({ position=[0, 17, 7], lookAt=[0,0,0] }) {
  
  const [zoom, setZoom] = useState(calcZoom());
  
  function handleResize() {
    setZoom(calcZoom())
  }

  // Assign camera to renderer in different components
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  const camera = useRef();
  useFrame(() => {
    const lookAtVector3 = new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2])
    camera.current.lookAt(lookAtVector3)
  })

  return <>
    <CameraControls enabled={false}/>
    <OrthographicCamera
      makeDefault
      zoom={zoom}
      position={position}
      ref={camera}
    />
  </>
}