import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import titleStarsVertexShader from './vertex.glsl'
import titleStarsFragmentShader from './fragment.glsl'
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

// sparkle around the title
export default function SparkleYutShader({ position=[0,0,0], size=1.0, texturePath }) {

  const count = 20;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const delays = new Float32Array(count);
  const texture = useLoader(TextureLoader, texturePath)

  // Scales the particle by screen height.
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }

  sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
  window.addEventListener('resize', () =>
  {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
      sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
  })

  // #region particle attributes
  positions[0] = 1.5
  positions[1] = 1.0
  positions[2] = 1.2
  colors[0] = 1.0
  colors[1] = 1.0
  colors[2] = 0.7
  scales[0] = 0.1
  delays[0] = 0.0
  
  positions[3] = -0.2
  positions[4] = 1.0
  positions[5] = 1.3
  colors[3] = 1.0
  colors[4] = 0.7
  colors[5] = 0.7
  scales[1] = 0.1
  delays[1] = 0.3

  positions[6] = -0.1
  positions[7] = 1.0
  positions[8] = 0.6
  colors[6] = 1.0
  colors[7] = 1.0
  colors[8] = 0.7
  scales[2] = 0.1
  delays[2] = 0.6

  positions[6] = -0.15
  positions[7] = 1.0
  positions[8] = 0.6
  colors[6] = 1.0
  colors[7] = 1.0
  colors[8] = 0.7
  scales[2] = 0.1
  delays[2] = 0.9
  
  positions[9] = 0.4
  positions[10] = 1.0
  positions[11] = 1.4
  colors[9] = 1.0
  colors[10] = 1.0
  colors[11] = 0.7
  scales[3] = 0.1
  delays[3] = 1.2
  
  positions[12] = 0.7
  positions[13] = 1.0
  positions[14] = 1.45
  colors[12] = 1.0
  colors[13] = 1.0
  colors[14] = 0.7
  scales[4] = 0.1
  delays[4] = 1.5
  
  positions[15] = 1.2
  positions[16] = 1.0
  positions[17] = 1.4
  colors[15] = 0.2
  colors[16] = 2.3
  colors[17] = 2.3
  scales[5] = 0.1
  delays[5] = 1.8
  
  positions[18] = 1.6
  positions[19] = 1.0
  positions[20] = 0.9
  colors[18] = 0.2
  colors[19] = 2.3
  colors[20] = 2.3
  scales[6] = 0.1
  delays[6] = 2.1
  
  positions[21] = -0.5
  positions[22] = 1.0
  positions[23] = 0.9
  colors[21] = 0.2
  colors[22] = 2.3
  colors[23] = 2.3
  scales[7] = 0.1
  delays[7] = 2.4
  // #endregion

  const { gl } = useThree();
  gl.setSize(sizes.width, sizes.height)
  gl.setPixelRatio(sizes.pixelRatio)

  const uniforms = useMemo(() => ({
    uSize: { value: 3 },
    uTime: { value: 0 },
    uTexture: { value: texture },
    uResolution: new THREE.Uniform(sizes.resolution)
  }), []);
  
  const shaderRef = useRef();
  useFrame((state) => {
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
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
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
            attach="attributes-aDelay" // must prepend with 'attributes'
            count={delays.length}
            array={delays}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors={true}
          vertexShader={titleStarsVertexShader}
          fragmentShader={titleStarsFragmentShader}
          ref={shaderRef}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
}
