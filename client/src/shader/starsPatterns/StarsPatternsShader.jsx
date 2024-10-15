import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starsVertexShader from './vertex.glsl'
import starsFragmentShader from './fragment.glsl'
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function StarsPatternsShader({ position=[0,0,0], count=1000 }) {

  console.log('stars patterns shader')


  const { scene } = useThree();

  const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 1)
  }
  sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

  window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 1)
      sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
  })

  function CreateStarsPattern() {
    console.log('CreateStarsPattern', count)
    const positionsArray = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const scalesArray = new Float32Array(count);
    const colorOneHex = '#FFFFFF';
    const colorTwoHex = '#5F5FFB';
    const colorInitial = new THREE.Color(colorOneHex);
    const colorFinal = new THREE.Color(colorTwoHex);
    const texture = useLoader(TextureLoader, 'textures/particles/6.png')
  
    // const rareStarRate = Math.floor(count * 0.007);
    // const numPatterns = 5;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
    
      const spherical = new THREE.Spherical(
        100,
        Math.random() * Math.PI,
        Math.random() * Math.PI * 2
      )
      const position = new THREE.Vector3()
      position.setFromSpherical(spherical)

      positionsArray[i3] = position.x
      positionsArray[i3+1] = position.y
      positionsArray[i3+2] = position.z
      
      const mixedColor = colorInitial.clone();
      mixedColor.lerp(colorFinal, Math.random());
      // Scale
      scalesArray[i] = 0.7
    
      colorsArray[i3] = mixedColor.r;
      colorsArray[i3 + 1] = mixedColor.g;
      colorsArray[i3 + 2] = mixedColor.b;
    }
    
    texture.flipY = false;
  
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
    geometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scalesArray, 1))
    geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colorsArray, 3))
    const material = new THREE.ShaderMaterial({
      vertexShader: starsVertexShader,
      fragmentShader: starsFragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(3.0),
        uTexture: new THREE.Uniform(texture),
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    points.position.copy(position)

    scene.add(points)
    console.log('points added')


    // stars don't display. how to update uTime?
  }

  useEffect(() => {
    
    CreateStarsPattern()
  }, [])
}
