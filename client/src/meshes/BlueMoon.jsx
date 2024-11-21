import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import AtmosphereFragmentShader from '../shader/blueMoon/atmosphere/fragment.glsl'
import AtmosphereVertexShader from '../shader/blueMoon/atmosphere/vertex.glsl'
import FragmentShader from '../shader/blueMoon/fragment.glsl'
import VertexShader from '../shader/blueMoon/vertex.glsl'
import { useFrame } from "@react-three/fiber";

export default function BlueMoon({ position=[0,0,0], rotation=[0,0,0], scale=1 }) {
  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load("textures/moon/moon-color.jpg") // must use absolute path - string starts with a slash
  moonTexture.colorSpace = THREE.SRGBColorSpace

  const moon = useRef();
  useFrame((state) => {
    moon.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <animated.group
      ref={moon}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group scale={3.4}>
        <mesh>
          <sphereGeometry args={[0.6, 64, 64]} />
          <shaderMaterial
            vertexShader={VertexShader}
            fragmentShader={FragmentShader}
            uniforms={{
              uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,0)),
              uMoonTexture: new THREE.Uniform(moonTexture),
              uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#23A9F1')),
              uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#23A9F1'))
            }}
          />
        </mesh>
        {/* <mesh scale={1.5}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <shaderMaterial 
          side={THREE.BackSide} 
          transparent 
          vertexShader={AtmosphereVertexShader}
          fragmentShader={AtmosphereFragmentShader}
          uniforms={{
            uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,0)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#EFEFEF')),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#EFEFEF')),
          }}
          />
        </mesh> */}
      </group>
    </animated.group>
  );
}