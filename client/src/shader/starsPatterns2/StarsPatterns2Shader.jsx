import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starsVertexShader from './vertex.glsl'
import starsFragmentShader from './fragment.glsl'
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function StarsPatterns2Shader({ position=[0,0,0], size=1.0, count=1000, texturePath }) {

  const positions1 = new Float32Array(count * 3);
  const colors1 = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const isRainbowFlags = new Float32Array(count);  
  const colorOneHex = '#FFFFFF';
  const colorTwoHex = '#8484FA';
  const colorInitial = new THREE.Color(colorOneHex);
  const colorFinal = new THREE.Color(colorTwoHex);
  const texture = useLoader(TextureLoader, texturePath)

  const rareStarRate = Math.floor(count * 0.007);
  // const numPatterns = 5;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
  
    const radius = 40.0;
    const spherical = new THREE.Spherical(
      radius * (0.8 + Math.random() * 0.2),
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2
    )
    const position = new THREE.Vector3()
    position.setFromSpherical(spherical)

    positions1[i3] = position.x
    positions1[i3+1] = position.y
    positions1[i3+2] = position.z
      
    const mixedColor = colorInitial.clone();
    mixedColor.lerp(colorFinal, Math.random());

    if (i % rareStarRate === 0) {
      isRainbowFlags[i] = 1.0;
      // Scale
      scales[i] = 0.7
    } else {
      isRainbowFlags[i] = 0.0;
      // Scale
      scales[i] = size
    }
  
    colors1[i3] = mixedColor.r;
    colors1[i3 + 1] = mixedColor.g;
    colors1[i3 + 2] = mixedColor.b;
  }

  const { gl } = useThree();
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 1))

  const uniforms = useMemo(() => ({
    uSize: { value: 400 * gl.getPixelRatio() },
    uTime: { value: 0 },
    uTexture: { value: texture }
  }), []);
  
  const shaderRef = useRef();
  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  })

  return (
    <group position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions1.length / 3}
            array={positions1}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors1.length / 3}
            array={colors1}
            itemSize={3}
            normalized
          />
          <bufferAttribute
            attach="attributes-aScale" // must prepend with 'attributes'
            count={scales.length}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aIsRainbowFlag"
            count={isRainbowFlags.length}
            array={isRainbowFlags}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors={true}
          vertexShader={starsVertexShader}
          fragmentShader={starsFragmentShader}
          ref={shaderRef}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
}
