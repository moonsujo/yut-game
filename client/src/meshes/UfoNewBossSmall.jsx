import { MeshDistortMaterial, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import React from "react";
import Star from "./Star";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function UfoNewBossSmall({
  //tile,
  position=[0,0,0],
  rotation=[0,0,0],
  scale=1,
  glassOpacity=0.1,
  animate=false,
  smiling=true,
  glassColor='grey',
  rightEyeScale=[1, 1, 1],
  enlightened=true
}) {
  const { scene, materials } = useGLTF("models/ufo-eyes-separate.glb");
  // const { scene, materials } = useGLTF("models/ufo.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const ufoGlassRef = useRef();
  const ballsRef = useRef();
  const ballsRef2 = useRef();

  useEffect(() => {
    // ufoGlassRef.current.material.opacity = glassOpacity;
  }, []);

  useFrame((state, delta) => {
    if (animate) {
      ballsRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      ballsRef.current.position.y = 0.3
      ballsRef2.current.rotation.y = state.clock.elapsedTime * 0.5;
      ballsRef2.current.position.y = 0.55
    }
  });

  const ballSpaceFactor = 1.5
  const ballSpaceFactor2 = 2.6 // hide balls
  const ballScaleFactor = 0.9
  const ballScaleFactor2 = 0.1  // hide balls
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <group
        dispose={null}
        scale={0.5}
      >
        <group rotation={[0,0,0]}>
          <mesh
            name='underbelly' // contains top plate side cover
            castShadow
            receiveShadow
            geometry={nodes.Circle024_1.geometry}
            material={materials.White}
            scale={[1, 0.7, 1]}
            position={[0, -0.02, 0]} // side and underneath put together
          >
            <meshStandardMaterial color='#C1E3CB' side={THREE.DoubleSide}/>
          </mesh>
          <mesh name='side-plate'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_2.geometry}
            material={materials.Blue}
          />
          {/* <mesh
            name='hole-cover'
            material={materials.Blue}
            scale={[1, 0.05, 1]}
            position={[0, -0.05, 0]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
          </mesh> */}
          <mesh name='top'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_3.geometry}
            material={materials.Grey}
            position={[0, -0.02, 0]}
          />
          {/* <mesh
            name='belly-inner-black-plate'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_4.geometry}
            material={materials["Alien Black"]}
          /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_5.geometry}
            material={materials["Inside Grey"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, -0.051, 0.411]}
            scale={[0.015, 0.047, 0.015]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials.Blue}
            position={[0, 0, 0.765]}
            scale={0.087}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Inside Grey"]}
            position={[0, -0.051, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024.geometry}
            material={materials.Blue}
            position={[0.765, 0, 0]}
            rotation={[0, 1.571, 0]}
            scale={0.087}
          />
          <group position={[0, -0.051, 0]} rotation={[0, -0.365, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038.geometry}
              material={materials["Panel Grey"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_1.geometry}
              material={materials.red}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_2.geometry}
              material={materials.Green}
            />
          </group>
          {/* mouth */}
          { smiling && <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath002.geometry}
            material={materials["Alien Black"]}
            position={[0.001, 0.182, 0.375]}
            scale={0.37}
          /> }
          <group ref={ballsRef} position={[0, 0.35, 0]} scale={1}>
            {/* ball front right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor, -0.592, 0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.356 * ballSpaceFactor, -0.592, 0]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor, -0.592, -0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, -0.356 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor, -0.592, -0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube030.geometry}
              material={materials.Blue}
              position={[-0.356 * ballSpaceFactor, -0.592, 0]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball front left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor, -0.592, 0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball front */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, 0.356 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
          </group>
          <group ref={ballsRef2} position={[0, 0.54, 0]} scale={1}>
            {/* ball front right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor2, -0.592, 0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            { enlightened && <Star name='head-hover' scale={0.05} position={[0, 0.35, 0]} rotation={[Math.PI/2, 0, 0]} color='turquoise'/> }
            {/* ball right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.356 * ballSpaceFactor2, -0.592, 0]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor2, -0.592, -0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, -0.356 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor2, -0.592, -0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube030.geometry}
              material={materials.Blue}
              position={[-0.356 * ballSpaceFactor2, -0.592, 0]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball front left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor2, -0.592, 0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball front */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, 0.356 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
          </group>
          <mesh name='alien-head'
            castShadow
            receiveShadow
            geometry={nodes.Roundcube002.geometry}
            material={materials["Blue Alien"]}
            position={[0, 0.492, 0.138]}
            scale={0.299}
          />
          <mesh
            name='alien-body'
            castShadow
            receiveShadow
            geometry={nodes.Roundcube003.geometry}
            material={materials["White Alien"]}
            position={[0, 0.096, 0.125]}
            scale={0.08}
            // scale={0.104}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube004.geometry}
            material={materials["White Alien"]}
            position={[0.138, 0.026, 0.324]}
            rotation={[1.869, -0.449, -0.197]}
            scale={[-0.037, -0.043, -0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube005.geometry}
            material={materials["Blue Alien"]}
            position={[0.163, -0.006, 0.397]}
            rotation={[2.426, -1.563, -2.477]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube027.geometry}
            material={materials["Blue Alien"]}
            position={[0.142, -0.022, 0.381]}
            rotation={[-2.03, -1.157, -0.683]}
            scale={[0.01, 0.023, 0.014]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube031.geometry}
            material={materials["White Alien"]}
            position={[-0.127, 0.026, 0.326]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.037, 0.043, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube032.geometry}
            material={materials["Blue Alien"]}
            position={[-0.165, 0.007, 0.389]}
            rotation={[-1.107, 0.274, -0.261]}
            scale={[0.029, 0.042, 0.042]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Roundcube033.geometry}
            material={materials["Blue Alien"]}
            position={[-0.139, 0.023, 0.389]}
            rotation={[-1.294, 0.655, -0.208]}
            scale={[0.01, 0.023, 0.014]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["Panel Grey"]}
            position={[-0.164, 0.062, 0.411]}
            scale={-0.041}
          />
          <animated.group name='right-eye' scale={rightEyeScale} position={[0.138, 0.361, 0.37]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere001.geometry}
              material={materials["Eyes Black"]}
              rotation={[1.401, -0.566, -0.511]}
              scale={[-0.08, -0.052, -0.115]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002.geometry}
              material={materials["Eyes White"]}
              position={[0.016, 0.026, 0.045]}
              rotation={[1.489, -0.121, -0.36]}
              scale={[0.037, 0.012, 0.037]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere003.geometry}
              material={materials["Eyes White"]}
              position={[-0.023, -0.053, 0.048]}
              rotation={[1.895, -0.107, -0.153]}
              scale={[0.017, 0.006, 0.017]}
            />
          </animated.group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere008.geometry}
            material={materials.Glass}
            position={[0, 0.33, 0]}
            scale={0.404}
            ref={ufoGlassRef}
          >
            <AnimatedMeshDistortMaterial
              speed={5}
              distort={0}
              color={glassColor}
              transparent
              opacity={glassOpacity}
            />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere010.geometry}
            material={materials['Eyes Black']}
            position={[0.138, 0.361, 0.37]}
            rotation={[1.401, -0.566, -0.511]}
            scale={[-0.08, -0.052, -0.115]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere011.geometry}
            material={materials['Eyes White']}
            position={[0.154, 0.387, 0.415]}
            rotation={[1.489, -0.121, -0.36]}
            scale={[0.037, 0.012, 0.037]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere012.geometry}
            material={materials['Eyes White']}
            position={[0.115, 0.308, 0.418]}
            rotation={[1.895, -0.107, -0.153]}
            scale={[0.017, 0.006, 0.017]}
          />
        </group>
      </group>
    </animated.group>
  );
}

useGLTF.preload("/models/ufo.glb");
