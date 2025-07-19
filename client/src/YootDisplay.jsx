import { animated } from "@react-spring/three";
import { Float } from "@react-three/drei";
import YootMesh from "./meshes/YootMesh";
import YootRhino from "./meshes/YootRhino";
import { folder, Leva, useControls } from 'leva'

export default function YootDisplay({position, rotation, scale}) {
  const { yut0RotX, yut0RotY, yut0RotZ,
    yut0PosX, yut0PosY, yut0PosZ,
    yut1RotX, yut1RotY, yut1RotZ,
    yut1PosX, yut1PosY, yut1PosZ,
    yut2RotX, yut2RotY, yut2RotZ,
    yut2PosX, yut2PosY, yut2PosZ,
    yut3PosX, yut3PosY, yut3PosZ,
    yut3RotX, yut3RotY, yut3RotZ,
  } = useControls({ 
    yut0: folder({
      yut0RotX: {
        value: 0.49,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut0RotY: {
        value: 0.29,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut0RotZ: {
        value: 1.57,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut0PosX: {
        value: -0.1,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut0PosY: {
        value: -0.5,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut0PosZ: {
        value: -1.4,
        min: -5,
        max: 5,
        step: 0.1
      },
    }),
    yut1: folder({
      yut1RotX: {
        value: 0.68,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut1RotY: {
        value: 0.20,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut1RotZ: {
        value: 1.66,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut1PosX: {
        value: 0.4,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut1PosY: {
        value: 1.3,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut1PosZ: {
        value: -0.1,
        min: -5,
        max: 5,
        step: 0.1
      },
    }),
    yut2: folder({
      yut2RotX: {
        value: 5.60,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut2RotY: {
        value: 2.95,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut2RotZ: {
        value: 1.48,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut2PosX: {
        value: 0.5,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut2PosY: {
        value: 0.0,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut2PosZ: {
        value: 1.9,
        min: -5,
        max: 5,
        step: 0.1
      },
    }),
    yut3: folder({
      yut3RotX: {
        value: 5.59,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut3RotY: {
        value: 2.75,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut3RotZ: {
        value: 1.57,
        min: 0,
        max: Math.PI * 2,
        step: Math.PI/32
      },
      yut3PosX: {
        value: -1.2,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut3PosY: {
        value: 2.1,
        min: -5,
        max: 5,
        step: 0.1
      },
      yut3PosZ: {
        value: 3.4,
        min: -5,
        max: 5,
        step: 0.1
      },
    })
  })
  return <animated.group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    <Float floatIntensity={0.5} floatingRange={[0.1, 0.1]} speed={2} rotationIntensity={1}>
      <YootMesh scale={0.9} position={[yut0PosX, yut0PosY, yut0PosZ]} rotation={[yut0RotX, yut0RotY, yut0RotZ]}/>
      <YootMesh scale={0.9} position={[yut1PosX, yut1PosY, yut1PosZ]} rotation={[yut1RotX, yut1RotY, yut1RotZ]} />
      <YootMesh scale={0.9} position={[yut2PosX, yut2PosY, yut2PosZ]} rotation={[yut2RotX, yut2RotY, yut2RotZ]} />
      <YootRhino scale={0.9} position={[yut3PosX, yut3PosY, yut3PosZ]} rotation={[yut3RotX, yut3RotY, yut3RotZ]} />
    </Float>
    <Leva hidden/>
  </animated.group>
}