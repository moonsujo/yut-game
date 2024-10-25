import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import starsVertexShader from './vertex.glsl'
import starsFragmentShader from './fragment.glsl'
import { useFrame, useThree } from "@react-three/fiber";

function randomNumberBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function StarsShader({ position=[0,0,0], count=1000 }) {

  const positions1 = new Float32Array(count * 3);
  const colors1 = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const isRainbowFlags = new Float32Array(count);  
  const colorOneHex = '#FFFFFF';
  const colorTwoHex = '#5F5FFB';
  const colorInitial = new THREE.Color(colorOneHex);
  const colorFinal = new THREE.Color(colorTwoHex);

  const rareStarRate = Math.floor(count * 0.007);
  // const numPatterns = 5;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
  
    const randomX1 = randomNumberBetween(-25, 25);
    const randomY1 = randomNumberBetween(-75, -25);
    const randomZ1 = randomNumberBetween(-35, 15);
  
    positions1[i3] = randomX1;
    positions1[i3 + 1] = randomY1;
    positions1[i3 + 2] = randomZ1;
    
    const mixedColor = colorInitial.clone();
    mixedColor.lerp(colorFinal, Math.random());

    if (i % rareStarRate === 0) {
      isRainbowFlags[i] = 1.0;
      // Scale
      scales[i] = 0.7
    } else {
      isRainbowFlags[i] = 0.0;
      // Scale
      scales[i] = 1.0
    }
  
    colors1[i3] = mixedColor.r;
    colors1[i3 + 1] = mixedColor.g;
    colors1[i3 + 2] = mixedColor.b;
  }

  const { gl } = useThree();
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 1))

  const uniforms = useMemo(() => ({
    uSize: { value: 400 * gl.getPixelRatio() },
    uTime: { value: 0 }
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
