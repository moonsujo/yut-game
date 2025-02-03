import { Float, MeshDistortMaterial, Text3D } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import { useFrame } from '@react-three/fiber';
import Cursor from './meshes/Cursor';
import Earth from './meshes/Earth';
import Mars from './meshes/Mars';
import Saturn from './meshes/Saturn';
import Neptune from './meshes/Neptune';
import Moon from './meshes/Moon';
import Star from './meshes/Star';
import layout from './layout';
import Rocket from './meshes/Rocket';
import Pointer from './meshes/Pointer';
import { useSpring, animated } from '@react-spring/three';
import Cursor2 from './meshes/Cursor2';
import Check from './meshes/Check';
import * as THREE from 'three';
import Ufo from './meshes/Ufo';
import ArrowBlender from './meshes/ArrowBlender';
import YootSet from './meshes/YootSet';
import GulToken from './moveTokens/GulToken';
import GeToken from './moveTokens/GeToken';
import YootToken from './moveTokens/YootToken';
import YootMesh from './meshes/YootMesh';
import YootRhino from './meshes/YootRhino';
import Board from './Board';
import YootDisplay from './YootDisplay';

export default function HowToPlay({ 
  device, 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  closeButton=false,
  setShowRulebook=null
}) {
  
  const [page, setPage] = useState(3)

  const [pageTimeout, setPageTimeout] = useState(null)
  useEffect(() => {
    clearTimeout(pageTimeout)
    if (page === 0) { // Overview
      const page1Timeout = setTimeout(() => {
        setPage(1)
      }, 23000)
      setPageTimeout(page1Timeout)
    } else if (page === 1) { // Throw the dice
      const page2Timeout = setTimeout(() => {
        setPage(2)
      }, 10000)
      setPageTimeout(page2Timeout)
    } else if (page === 2) { // Catch enemies
      const page3Timeout = setTimeout(() => {
        setPage(3)
      }, 10500)
      setPageTimeout(page3Timeout)
    } else if (page === 3) { // Piggyback
      const page4Timeout = setTimeout(() => {
        setPage(4)
      }, 1040000)
      setPageTimeout(page4Timeout)
    } else if (page === 4) { // Score
      const page5Timeout = setTimeout(() => {
        setPage(5)
      }, 12900)
      setPageTimeout(page5Timeout)
    } else if (page === 5) { // Read the dice
      const page6Timeout = setTimeout(() => {
        setPage(6)
      }, 11500)
      setPageTimeout(page6Timeout)
    } else if (page === 6) { // Shortcut
      const page7Timeout = setTimeout(() => {
        setPage(0)
      }, 15500)
      setPageTimeout(page7Timeout)
    }
  }, [page])
  
  function ThrowTheYutPage() {

    const [startTime, setStartTime] = useState(0)
    const yoot0 = useRef();
    const yoot0Wrapper = useRef();
    const yoot0Mat = useRef();
    const yoot1 = useRef();
    const yoot1Wrapper = useRef();
    const yoot1Mat = useRef();
    const yoot2 = useRef();
    const yoot2Wrapper = useRef();
    const yoot2Mat = useRef();
    const yoot3 = useRef();
    const yoot3Wrapper = useRef();
    const yoot3Mat = useRef();
    const textRef = useRef()
    const [textVisible, setTextVisible] = useState(false)
    const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
    const restTime = 2 // time: 0 - 2
    const throwTime = restTime + 3 // time: 2 - 5
    const lieTime = throwTime + 1 // time: 5 - 7
    const highlightYoot0Time = lieTime + 0.5 // time: 7 - 7.5
    const highlightYoot1Time = highlightYoot0Time + 0.5 // time: 7.5 - 8
    const highlightYoot2Time = highlightYoot1Time + 0.5 // time: 8 - 8.5
    const recordTime = highlightYoot2Time + 0.5 // time: 8.5 - 9
    const loopTime = recordTime + 2 // time: 9 - 11

    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (yoot0.current) {
        if (startTime === 0) {
          setStartTime(time)
        } else {
          if (startTime + loopTime > time) {
  
            if (startTime + restTime > time) { // held in a hand
  
              // set up
              setYootButtonTurnedOn(true)
              yoot0Mat.current.opacity = 0
              yoot1Mat.current.opacity = 0
              yoot2Mat.current.opacity = 0
              setTextVisible(false)

              // yoot 0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.z
              const eulerRotation0 = new THREE.Euler(-Math.PI/8*6, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = quaternionRotation0.x;
              yoot0.current.rotation.y = quaternionRotation0.y;
              yoot0.current.rotation.z = quaternionRotation0.z;
              yoot0.current.rotation.w = quaternionRotation0.w;

              // yoot 1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.z
              const eulerRotation1 = new THREE.Euler(-Math.PI/2 + Math.PI/4, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = quaternionRotation1.x;
              yoot1.current.rotation.y = quaternionRotation1.y;
              yoot1.current.rotation.z = quaternionRotation1.z;
              yoot1.current.rotation.w = quaternionRotation1.w;

              // yoot 2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.z
              const eulerRotation2 = new THREE.Euler(Math.PI/2 + Math.PI/4, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = quaternionRotation2.x;
              yoot2.current.rotation.y = quaternionRotation2.y;
              yoot2.current.rotation.z = quaternionRotation2.z;
              yoot2.current.rotation.w = quaternionRotation2.w;

              // yoot 3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.z
              const eulerRotation3 = new THREE.Euler(Math.PI/2 - Math.PI/4, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = quaternionRotation3.x;
              yoot3.current.rotation.y = quaternionRotation3.y;
              yoot3.current.rotation.z = quaternionRotation3.z;
              yoot3.current.rotation.w = quaternionRotation3.w;
  
            } else if (startTime + throwTime > time) { // spinning
              setYootButtonTurnedOn(false)

              // yoot 0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.throwPos.z
              const eulerRotation0 = new THREE.Euler(time*5, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = eulerRotation0.x;
              yoot0.current.rotation.y = eulerRotation0.y;
              yoot0.current.rotation.z = eulerRotation0.z;
              yoot0.current.rotation.w = eulerRotation0.w;
              yoot0.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4
              
              // yoot 1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.throwPos.z
              const eulerRotation1 = new THREE.Euler(time*6.9 + Math.PI/4 + Math.PI/32, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = eulerRotation1.x;
              yoot1.current.rotation.y = eulerRotation1.y;
              yoot1.current.rotation.z = eulerRotation1.z;
              yoot1.current.rotation.w = eulerRotation1.w;
              yoot1.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
              // yoot 2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.throwPos.z
              const eulerRotation2 = new THREE.Euler(time*5.7 + Math.PI/4 + Math.PI/16, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = eulerRotation2.x;
              yoot2.current.rotation.y = eulerRotation2.y;
              yoot2.current.rotation.z = eulerRotation2.z;
              yoot2.current.rotation.w = eulerRotation2.w;
              yoot2.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
              // yoot 3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.throwPos.z
              const eulerRotation3 = new THREE.Euler(time*7.4 + Math.PI/4 + Math.PI/8, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = eulerRotation3.x;
              yoot3.current.rotation.y = eulerRotation3.y;
              yoot3.current.rotation.z = eulerRotation3.z;
              yoot3.current.rotation.w = eulerRotation3.w;
              yoot3.current.position.y = Math.sin((startTime + throwTime - time - Math.PI + Math.PI/2 + Math.PI/2 + Math.PI/8) * 1) * 4.5 + 0.8
              
            } else if (startTime + lieTime > time) {
  
              // yoot0
              yoot0Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/16
              yoot0Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.x
              yoot0Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.y
              yoot0Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.liePos.z
              const eulerRotation0 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation0 = new THREE.Quaternion();
              quaternionRotation0.setFromEuler(eulerRotation0);
              yoot0.current.rotation.x = eulerRotation0.x;
              yoot0.current.rotation.y = eulerRotation0.y;
              yoot0.current.rotation.z = eulerRotation0.z;
              yoot0.current.rotation.w = eulerRotation0.w;
              yoot0.current.position.y = 0
              
              // yoot1
              yoot1Wrapper.current.rotation.y = Math.PI/4 + Math.PI/4 + Math.PI/32
              yoot1Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.x
              yoot1Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.y
              yoot1Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.liePos.z
              const eulerRotation1 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation1 = new THREE.Quaternion();
              quaternionRotation1.setFromEuler(eulerRotation1);
              yoot1.current.rotation.x = eulerRotation1.x;
              yoot1.current.rotation.y = eulerRotation1.y;
              yoot1.current.rotation.z = eulerRotation1.z;
              yoot1.current.rotation.w = eulerRotation1.w;
              yoot1.current.position.y = 0
              
              // yoot2
              yoot2Wrapper.current.rotation.y = Math.PI/2
              yoot2Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.x
              yoot2Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.y
              yoot2Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.liePos.z
              const eulerRotation2 = new THREE.Euler(Math.PI, 0, 0);
              const quaternionRotation2 = new THREE.Quaternion();
              quaternionRotation2.setFromEuler(eulerRotation2);
              yoot2.current.rotation.x = eulerRotation2.x;
              yoot2.current.rotation.y = eulerRotation2.y;
              yoot2.current.rotation.z = eulerRotation2.z;
              yoot2.current.rotation.w = eulerRotation2.w;
              yoot2.current.position.y = 0
              
              // yoot3
              yoot3Wrapper.current.rotation.y = Math.PI/2 - Math.PI/32
              yoot3Wrapper.current.position.x = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.x
              yoot3Wrapper.current.position.y = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.y
              yoot3Wrapper.current.position.z = layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.liePos.z
              const eulerRotation3 = new THREE.Euler(0, 0, 0);
              const quaternionRotation3 = new THREE.Quaternion();
              quaternionRotation3.setFromEuler(eulerRotation3);
              yoot3.current.rotation.x = eulerRotation3.x;
              yoot3.current.rotation.y = eulerRotation3.y;
              yoot3.current.rotation.z = eulerRotation3.z;
              yoot3.current.rotation.w = eulerRotation3.w;
              yoot3.current.position.y = 0
              
            } else if (startTime + highlightYoot0Time > time) {
              yoot0Mat.current.opacity = 1
            } else if (startTime + highlightYoot1Time > time) {
              yoot1Mat.current.opacity = 1
            } else if (startTime + highlightYoot2Time > time) {
              yoot2Mat.current.opacity = 1
            } else if (startTime + recordTime > time) {
              setTextVisible(true)
            }
          } else {
            setStartTime(0);
          }
        }
      }
    })

    return <group name='throw-the-yut-page' scale={layout[device].howToPlay.throwingTheDicePage.scale}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.throwingTheDicePage.text.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.text.rotation}
        size={layout[device].howToPlay.throwingTheDicePage.text.size}
        height={layout[device].howToPlay.throwingTheDicePage.text.height}
      >
        {`THROW THE YUT (DICE) TO DETERMINE HOW\nMANY STARS TO JUMP. EACH FLAT SIDE IS\nONE STAR.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* <Physics/> component is in <Home2/> */}
      <group 
        ref={yoot0Wrapper} 
        position={[
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.x,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.y,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot0Wrapper.restPos.z,
        ]}
        rotation={[0, Math.PI/4 + Math.PI/4 + Math.PI/16, 0]}
        scale={1.2}
      >
        <group
          ref={yoot0}
          scale={0.5}
          rotation={[-Math.PI/8*6, 0, 0]}
        >
          <YootMesh
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh scale={[6, 0.1, 1]} position={[0, -0.5, 0]} rotation={[0, 0, -Math.PI/100]}>
            <cylinderGeometry args={[1, 1, 0.01]}/>
            <meshStandardMaterial 
              color="#B9B9B9" 
              transparent 
              opacity={0}
              ref={yoot0Mat}
            />
          </mesh>
        </group>
      </group>
      <group 
        ref={yoot1Wrapper}
        position={[
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.x,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.y,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot1Wrapper.restPos.z,
        ]}
        rotation={[0, Math.PI/4 + Math.PI/4 + Math.PI/32, 0]}
        scale={1.2}
      >
        <group
          ref={yoot1}
          scale={0.5}
          rotation={[-Math.PI/2 + Math.PI/4, 0, 0]}
        >
          <YootMesh
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh scale={[6, 0.1, 1]} position={[0, -0.5, 0]} rotation={[0, 0, -Math.PI/100]}>
            <cylinderGeometry args={[1, 1, 0.01]}/>
            <meshStandardMaterial 
              color="#B9B9B9" 
              transparent 
              opacity={0}
              ref={yoot1Mat}
            />
          </mesh>
        </group>
      </group>
      <group 
        ref={yoot2Wrapper}
        position={[
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.x,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.y,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot2Wrapper.restPos.z,
        ]}
        rotation={[0, Math.PI/2, 0]}
        scale={1.2}
      >
        <group
          ref={yoot2}
          scale={0.5}
          rotation={[Math.PI/2 + Math.PI/4, 0, 0]}
        >
          <YootMesh
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh scale={[6, 0.1, 1]} position={[0, -0.5, 0]} rotation={[0, 0, -Math.PI/100]}>
            <cylinderGeometry args={[1, 1, 0.01]}/>
            <meshStandardMaterial 
              color="#B9B9B9" 
              transparent 
              opacity={0}
              ref={yoot2Mat}
            />
          </mesh>
        </group>
      </group>
      <group 
        ref={yoot3Wrapper}
        position={[
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.x,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.y,
          layout[device].howToPlay.throwingTheDicePage.yoot.yoot3Wrapper.restPos.z,
        ]}
        rotation={[0, Math.PI/2 - Math.PI/32, 0]}
        scale={1.2}
      >
        <group 
          ref={yoot3}
          scale={0.5}
          rotation={[Math.PI/2 - Math.PI/4, 0, 0]}
        >
          <YootRhino
            position={[0, 0.3, 0]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh scale={[6, 0.1, 1]} position={[0, -0.5, 0]} rotation={[0, 0, -Math.PI/100]}>
            <cylinderGeometry args={[1, 1, 0.01]}/>
            <meshStandardMaterial 
              color="#B9B9B9" 
              transparent 
              opacity={0}
              ref={yoot3Mat}
            />
          </mesh>
        </group>
      </group>
      { textVisible && <group
        position={layout[device].howToPlay.throwingTheDicePage.moveText.position}
        ref={textRef}
      >
        <Text3D
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={layout[device].howToPlay.throwingTheDicePage.moveText.size} 
          height={0.01}
        >
          {layout[device].howToPlay.throwingTheDicePage.moveText.text}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GulToken 
          scale={layout[device].howToPlay.throwingTheDicePage.gulToken.scale} 
          position={layout[device].howToPlay.throwingTheDicePage.gulToken.position} 
          rotation={layout[device].howToPlay.throwingTheDicePage.gulToken.rotation}
        />
      </group> }
      <YootButtonModel
        position={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.rotation}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={layout[device].howToPlay.throwingTheDicePage.cursor.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.cursor.rotation}
        scale={layout[device].howToPlay.throwingTheDicePage.cursor.scale}
      />
    </group>
  }

  function MovingPiecesPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos0,
        rocket3Scale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.5,
        pointerOpacity: 0,
        rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos0,
        moveTokenScale: 0,
        moveToken1Scale: 1
      },
      to: [
        {
          cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos1,
          delay: 100000
        },
        {
          rocket3Scale: 2.5,
          cursorEffectOpacity: 1,
          legalTileScale: 0.8,
          pointerOpacity: 1,
          moveTokenScale: 0.7,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          cursorPos: layout[device].howToPlay.movingPiecesPage.cursorPos2,
          delay: 800,
        },
        {
          cursorEffectOpacity: 1,
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos1,
          moveTokenScale: 0,
          moveToken1Scale: 0,
          rocket3Scale: 1.5,
          legalTileScale: 0.5,
          pointerOpacity: 0,
          delay: 1000,
          config: {
            tension: 0,
            friction: 1
          }
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos2,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos3,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket3Pos: layout[device].howToPlay.movingPiecesPage.rocket3Pos4,
          delay: 100,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })
    
    function FirstCornerTiles({ position }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 6; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];``
        if (i == 0) {
          tiles.push(<Earth position={position} key={i} scale={0.4}/>);
        } else {
          if (i === 3) {
            tiles.push(
              <group 
                position={position}
                key={i}
              >
                <Star
                  tile={i}
                  scale={springs.legalTileScale}
                  device={device}
                />
                <Pointer color='red' position={[0,1.7,0]} scale={2.5} opacity={springs.pointerOpacity}/>
              </group>
            )
          } else {            
            tiles.push(
              <Star
                position={position}
                tile={i}
                key={i}
                scale={layout[device].howToPlay.star.scale}
                device={device}
              />
            )
          }
        }
      }
  
      return <group position={position}>
        { tiles }
        <animated.group position={[5,0,2.5]} rotation={[0, Math.PI/2, 0]} scale={springs.moveTokenScale}>
          <GulToken />
        </animated.group>
      </group>;
    }
    
    const rocket0 = useRef()
    const rocket1 = useRef()
    const rocket2 = useRef()
    const rocket3 = useRef()
    const cursorRef = useRef()
    function HomePieces({ position }) {
      return <group position={position}>
        <group name='rocket-0' ref={rocket0}>
          <Rocket position={[-0.4,-0.5,-0.5]} scale={1.5}/>
        </group>
        <group name='rocket-1' ref={rocket1}>
          <Rocket position={[0.8,-0.5,-0.5]} scale={1.5}/>
        </group>
        <group name='rocket-2' ref={rocket2}>
          <Rocket position={[-0.4,-0.5,0.7]} scale={1.5}/>
        </group>
        <animated.group name='rocket-3' ref={rocket3} position={springs.rocket3Pos} scale={springs.rocket3Scale}>
          <Rocket />
        </animated.group>
      </group>
    }

    function MoveDisplay({ position }) {
      return <group position={position}>
        <Text3D
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.4} 
          height={0.01}
        >
          MOVES:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <animated.group position={[2.4, 0, -0.2]} rotation={[0, Math.PI/2, 0]} scale={springs.moveToken1Scale}>
          <GulToken/>
        </animated.group>
      </group>
    }

    return <group name='moving-pieces-page'>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.movingPiecesPage.text.position}
        rotation={layout[device].howToPlay.movingPiecesPage.text.rotation}
        size={layout[device].howToPlay.movingPiecesPage.text.size}
        height={0.01}
      >
        {'1. START YOUR TOKENS FROM\nEARTH.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <FirstCornerTiles position={layout[device].howToPlay.movingPiecesPage.firstCornerTiles.position}/>
      <HomePieces position={layout[device].howToPlay.movingPiecesPage.homePieces.position}/>
      <MoveDisplay position={layout[device].howToPlay.movingPiecesPage.moveDisplay.position}/>
      <group ref={cursorRef}>
        <Cursor
          position={springs.cursorPos}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group>
    </group>
  }

  function createSprite(texturePath) {
    var map = new THREE.TextureLoader().load(texturePath);
    var material = new THREE.SpriteMaterial({
      map: map,
      color: 0xfffff,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    return new THREE.Sprite(material);
  }

  function ScoringPage() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

    function WelcomeBackText({ position, scale }) {
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.1
      const width = 1.8
      useFrame((state, delta) => {
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
          borderMeshRefs[i].current.position.y = 0.05
          borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
        }
      })

      return <animated.group
        position={position}
        scale={scale}
      >
        <mesh scale={[width, 1,height]}>
          <cylinderGeometry args={[1, 1, 0.01, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.9}/>
        </mesh>
        <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            position={[-1.2, 0.1, -0.1]}
            rotation={[-Math.PI/2, 0, 0]}
            height={0.01}
            lineHeight={0.9} 
            size={0.33}
        >
            {`Finished\nthe route!`}
            <meshStandardMaterial color='yellow'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
        <group ref={borderMesh1Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
        <group ref={borderMesh2Ref}>
            <Star scale={0.1} color='yellow'/>
        </group>
        <group ref={borderMesh3Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
        <group ref={borderMesh4Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
        <group ref={borderMesh5Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
        <group ref={borderMesh6Ref}>
            <Star scale={0.1} color='yellow' />
        </group>
      </animated.group>
    }

    // place on top of tiles with .map
    // adjust neptune particle size
    function Tiles({ device, rotation }) {
      const TILE_RADIUS = layout[device].howToPlay.tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
      let rocket3AnimationsArray = []
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        if (i == 0 || i >= 5) {
          let position = [
            -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
            0,
            Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          ];
          if (i == 0) {
            tiles.push(<Earth position={position} scale={0.4} key={i}/>);
          } else if (i == 5) {
            tiles.push(
              <Mars
                position={position}
                scale={0.4}
                key={i}
              />
            );
          } else if (i == 10) {
            tiles.push(<Saturn position={position} scale={0.4} key={i}/>);
          } else if (i == 15) {
            tiles.push(<Neptune position={position} scale={0.4} key={i}/>);
          } else {
            tiles.push(
              <Star
                position={position}
                key={i}
                scale={layout[device].howToPlay.star.scale}
                device={device}
              />
            );
          }
          rocket3AnimationsArray.push(
            {
              rocket3Pos: [
                position[0]-0.2,
                position[1]+1,
                position[2]
              ],
              delay: 100,
              config: {
                tension: 300,
                clamp: true
              },
            },
          )
        }
      }

      // doesn't trigger re-render
      const springs = useSpring({
        from: {
          rocket3Pos: rocket3AnimationsArray[1].rocket3Pos,
          rocket3Scale: 1,
          tilesScale: layout[device].howToPlay.scoringPage.tilesScale0,
          tilesPos: layout[device].howToPlay.scoringPage.tilesPos0,
          rocketHomeScale: 0,
          shortcutStarScale: layout[device].howToPlay.star.scale,
          moveScale: 0,
          scoreScale: 0,
          scoreColor: '#ffff00',
          cursorScale: 0,
          cursorPos: layout[device].howToPlay.scoringPage.cursorPos[0],
          cursorEffectOpacity: 0,
          checkmarkColor: '#808080',
          checkmarkScale: 0,
          scoreTextScale: 0,
        },
        to: [
          ...rocket3AnimationsArray.slice(2), 
          rocket3AnimationsArray[0],
          {
            tilesScale: layout[device].howToPlay.scoringPage.tilesScale1,
            tilesPos: layout[device].howToPlay.scoringPage.tilesPos1,
            rocketHomeScale: layout[device].howToPlay.scoringPage.rocketHomeScale1,
            checkmarkScale: 0.3,
            shortcutStarScale: 0,
            moveScale: 1,
            cursorScale: 2,
            delay: 500
          },
          {
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[1],
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            rocket3Scale: 1.5,
            scoreScale: 1,
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            delay: 200,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[2],
            scoreColor: '#ffffff',
            delay: 500
          },
          {
            cursorEffectOpacity: 1,
            cursorPos: layout[device].howToPlay.scoringPage.cursorPos[3],
            scoreScale: 0,
            moveScale: 0,
            rocket3Scale: 0,
            checkmarkColor: '#ff0000',
            delay: 500,
            config: {
              tension: 0,
              clamp: true
            },
          },
          {
            cursorEffectOpacity: 0,
            scoreTextScale: 1,
            // delay: 100,
            config: {
              friction: 26,
              tension: 170,
              // tension: 0,
              clamp: true
            },
          },
          {
            delay: 20000,
          },
        ],
        loop: true
      })

      function HomePieces({ position }) {
        return <group position={position}>
          <animated.group name='rocket-0' position={layout[device].howToPlay.scoringPage.rocket0Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-1' position={layout[device].howToPlay.scoringPage.rocket1Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <animated.group name='rocket-2' position={layout[device].howToPlay.scoringPage.rocket2Pos} scale={springs.rocketHomeScale}>
            <Rocket/>
          </animated.group>
          <Check 
            position={layout[device].howToPlay.scoringPage.checkPos} 
            rotation={[Math.PI/8, 0, 0]}
            scale={springs.checkmarkScale} 
            color={springs.checkmarkColor}
          />
        </group>
      }
      // add components that use springs
  
      //shortcuts
      const radiusShortcut1 = layout[device].howToPlay.tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].howToPlay.tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].howToPlay.star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={i == 5 ? springs.shortcutStarScale : layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          scale={0.4}
          key={100}
        />
      );
      // shoot fireworks
      // change color on 'lets go' text into rainbow
      return <animated.group position={springs.tilesPos} rotation={rotation} scale={springs.tilesScale}>
        {tiles}
        <animated.group name='rocket-3' position={springs.rocket3Pos} scale={springs.rocket3Scale}>
          <Rocket/>
        </animated.group>
        <group name='rocket-home'>
          <HomePieces position={[-2, 0, 2]}/>
        </group>
        <animated.group scale={springs.moveScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].howToPlay.scoringPage.moveText.position}
            rotation={layout[device].howToPlay.scoringPage.moveText.rotation}
            size={0.4}
            height={0.01}
          >
            {'MOVE: 1-STEP'}
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            position={layout[device].howToPlay.scoringPage.scoreText.position}
            rotation={layout[device].howToPlay.scoringPage.scoreText.rotation}
            size={layout[device].howToPlay.scoringPage.scoreText.size} 
            height={0.01}
          >
            SCORE
            <AnimatedMeshDistortMaterial color={springs.scoreColor} distort={0}/>
          </Text3D>
        </animated.group>
        <WelcomeBackText 
        scale={springs.scoreTextScale} 
        position={layout[device].howToPlay.scoringPage.welcomeBackText.position}
        />
        <group>
          <Cursor2
            position={springs.cursorPos}
            rotation={[0,0,0]}
            scale={springs.cursorScale}
            effectOpacity={springs.cursorEffectOpacity}
            effect={true}
          />
        </group>
      </animated.group>;
    }

    return <group 
      name='scoring-page' 
      position={layout[device].howToPlay.scoringPage.position}
      scale={layout[device].howToPlay.scoringPage.scale}
    >
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.scoringPage.text.position}
        rotation={layout[device].howToPlay.scoringPage.text.rotation}
        size={layout[device].howToPlay.scoringPage.text.size}
        height={layout[device].howToPlay.scoringPage.text.height}
        lineHeight={layout[device].howToPlay.scoringPage.text.lineHeight}
      >
        {`5. Bring the piece\nhome to score.\nFirst team to score\nfour pieces wins!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <Tiles device={device}/>
      {/* <Fireworks position={position}/> */}
    </group>
  }

  // capture
  function CatchEnemiesPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[0],
        rocketScale: 1.5,
        cursorEffectOpacity: 0,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[0],
        ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[0],
        ufoScale: 1.5,
        moveTextScale: 1,
        bonusAlertScale: 0,
        yootButtonScale: 0,
        moveTokenScale: 1,
        moveToken1Scale: 0,
        catchTokenHomeScale: 0
      },
      to: [
        // {
        //   cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[1],
        //   delay: 1000
        // },
        {
          // cursorEffectOpacity: 1,
          moveToken1Scale: 1,
          rocketScale: 2.1,
          pointerOpacity: 1,
          ufoScale: 2,
          delay: 500,
          config: {
            tension: 170,
            friction: 26
          }
        },
        // {
        //   cursorEffectOpacity: 0,
        //   delay: 200,
        // },
        // {
        //   cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[2],
        //   delay: 1000,
        // },
        {
          cursorEffectOpacity: 1,
          moveTokenScale: 0,
          moveToken1Scale: 0,
          rocketScale: 1.5,
          legalTileScale: 0.4,
          pointerOpacity: 0,
          ufoScale: 1.5,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: 0,
          cursorPos: layout[device].howToPlay.catchingPiecesPage.cursorPos[3],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[1],
          ufoScale: 0,
          config: {
            tension: 100,
            friction: 26
          }
        },
        {
          catchTokenHomeScale: 1,
          moveTextScale: 0,
          bonusAlertScale: 1,
          yootButtonScale: 1,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position, scale }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 4; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 3) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star
                tile={i}
                scale={springs.legalTileScale}
                device={device}
              />
              <Pointer color='red' position={layout[device].howToPlay.catchingPiecesPage.pointer.position} scale={2} opacity={springs.pointerOpacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          )
        }
      }
  
      return <animated.group position={position} scale={scale}>
        { tiles }
        <animated.group name='rocket' position={springs.rocketPos} scale={springs.rocketScale} >
          <Rocket onBoard/>
        </animated.group>
        <animated.group name='ufo' position={springs.ufoPos} scale={springs.ufoScale} >
          <Ufo onBoard/>
        </animated.group>
          <GulToken position={[5,0,4]} rotation={[0, Math.PI/2, 0]} scale={springs.moveToken1Scale}/>
      </animated.group>;
    }

    function BonusAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.3
      const width = 1.9
      const starScale = 0.1
      const starColor = 'limegreen'
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.1,0,-0.15]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}
        lineHeight={0.8}>
          {`BONUS\n TURN!`}
          <meshStandardMaterial color={starColor}/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
      </animated.group>
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group name='catching-pieces-page'>
      <FirstCornerTiles position={[0,0,-6.5]} scale={1.3}/>
      <group name='ufo-home' position={[0.3, 0, 3]} scale={1.2}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='turquoise' transparent opacity={0.05}/>
        </mesh>
        <Ufo position={[-0.5,0,-0.4]}/>
        <Ufo position={[0.5,0,-0.4]}/>
        <Ufo position={[-0.5,0,0.4]}/>
        <animated.group scale={springs.catchTokenHomeScale}>
          <Ufo position={[0.5,0,0.4]}/>
        </animated.group>
      </group>
      {/* <animated.group scale={springs.moveTextScale}>
        <Text3D
          position={layout[device].howToPlay.catchingPiecesPage.moveText.position}
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          MOVE:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <animated.group scale={springs.moveTokenScale}>
          <GulToken 
            position={layout[device].howToPlay.catchingPiecesPage.gulToken.position} 
            rotation={layout[device].howToPlay.catchingPiecesPage.gulToken.rotation}
          />
        </animated.group>
      </animated.group> */}
      {/* <group>
        <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        />
      </group> */}
      {/* <Float> */}
        <YootButtonModel scale={springs.yootButtonScale} rotation={[Math.PI/16, Math.PI/2, 0]} position={layout[device].howToPlay.catchingPiecesPage.yootButtonModel.position} turnedOn={true}/>

      {/* </Float> */}
      <BonusAlert position={[7, 0, 3]} scale={springs.bonusAlertScale}/>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.catchingPiecesPage.text.position}
        rotation={layout[device].howToPlay.catchingPiecesPage.text.rotation}
        size={layout[device].howToPlay.catchingPiecesPage.text.size}
        height={layout[device].howToPlay.catchingPiecesPage.text.height}
        lineHeight={layout[device].howToPlay.catchingPiecesPage.text.lineHeight}
      >
        {`KICK ENEMIES BACK HOME BY LANDING ON\nTHEIR STAR. YOU GET A BONUS THROW TOO!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function PiggybackPage() {    
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[0],
        rocket0Scale: 1.2,
        rocket1Scale: 1.2,
        cursorEffectOpacity: 0,
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        pointer0Opacity: 0,
        pointer1Opacity: 0,
        rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[0],
        rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[0],
        moveText0Scale: 1,
        moveText1Scale: 0,
        bonusTurnScale: 0,
        yootButtonScale: 0,
        moveTokenScale: 0,
        moveToken1Scale: 0,
        gulTokenScale: 1,
        geTokenScale: 1
      },
      to: [
        // {
        //   cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[1],
        //   delay: 1000
        // },
        {
          // cursorEffectOpacity: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile0Scale: 0.6,
          pointer0Opacity: 1,
          moveTokenScale: 1,
          // delay: 500,
        },
        // {
        //   cursorEffectOpacity: 0,
        //   delay: 200,
        // },
        // {
        //   cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[2],
        //   delay: 1000,
        // },
        {
          // cursorEffectOpacity: 1,
          moveTokenScale: 0,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile0Scale: 0.4,
          pointer0Opacity: 0,
          gulTokenScale: 0,
          delay: 1000,
        },
        {
          cursorEffectOpacity: 0,
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[3],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[1],
          // cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        // {
        //   cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[4],
        //   delay: 1000
        // },
        {
          // cursorEffectOpacity: 1,
          moveToken1Scale: 1,
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile1Scale: 0.7,
          pointer1Opacity: 1,
          delay: 500,
          // config: {
          //   tension: 0,
          // }
        },
        // {
        //   cursorEffectOpacity: 0,
        //   delay: 200,
        // },
        // {
        //   cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[5],
        //   delay: 1000
        // },
        {
          // cursorEffectOpacity: 1,
          moveToken1Scale: 0,
          rocket0Scale: 1.2,
          rocket1Scale: 1.2,
          legalTile1Scale: 0.4,
          geTokenScale: 0,
          pointer1Opacity: 0,
          delay: 500,
          // config: {
          //   tension: 0,
          // }
        },
        {
          // cursorEffectOpacity: 0,
          // cursorPos: layout[device].howToPlay.combiningPiecesPage.cursorPos[6],
          // delay: 200,
          // config: {
          //   tension: 0,
          // }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[4],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[5],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[3],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position, scale }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = -1; i < 5; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 2) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star scale={springs.legalTile0Scale}/>
              <Pointer color='red' position={layout[device].howToPlay.combiningPiecesPage.pointer0.position} scale={2} opacity={springs.pointer0Opacity}/>
            </group>
          )
        } else if (i === 4) {
          tiles.push(
            <group
              position={position}
              key={i}
            >
              <Mars
                scale={springs.legalTile1Scale}
              />
              <Pointer color='red' position={layout[device].howToPlay.combiningPiecesPage.pointer1.position} scale={2.3} opacity={springs.pointer1Opacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              scale={layout[device].howToPlay.star.scale}
              key={i}
            />
          )
        }
      }
  
      return <group position={position} scale={scale}>
        { tiles }
        <animated.group name='rocket-0' position={springs.rocket0Pos} scale={springs.rocket0Scale} >
          <Rocket onBoard/>
        </animated.group>
        <animated.group name='rocket-1' position={springs.rocket1Pos} scale={springs.rocket1Scale} >
          <Rocket onBoard/>
        </animated.group>
        {/* <Cursor
          position={springs.cursorPos}
          rotation={[0,0,0]}
          scale={[3, 3, 0.1]}
          effectOpacity={springs.cursorEffectOpacity}
          effect={true}
        /> */}
        <animated.group>
          <GulToken scale={springs.moveTokenScale} position={[4,0,5]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
        <animated.group >
          <GeToken scale={springs.moveToken1Scale} position={[6,0,0]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
      </group>;
    }

    return <group>
      <FirstCornerTiles 
      position={layout[device].howToPlay.combiningPiecesPage.firstCornerTiles.position}
      scale={1.3}/>
      <animated.group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText0.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText0.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText0.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText0.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText0.lineHeight}
        >
          {`JUMPS:`}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken0.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken0.rotation}
          scale={springs.geTokenScale}
        />
        <GulToken 
          position={layout[device].howToPlay.combiningPiecesPage.gulToken.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.gulToken.rotation}
          scale={springs.gulTokenScale}
        />
      </animated.group>
      <animated.group scale={springs.moveText1Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText1.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText1.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText1.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText1.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText1.lineHeight}
        >
          MOVES:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken1.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken1.rotation}
        />
      </animated.group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.combiningPiecesPage.text.position}
        rotation={layout[device].howToPlay.combiningPiecesPage.text.rotation}
        size={layout[device].howToPlay.combiningPiecesPage.text.size}
        height={layout[device].howToPlay.combiningPiecesPage.text.height}
        lineHeight={layout[device].howToPlay.combiningPiecesPage.text.lineHeight}
      >
        {'LAND ON YOUR OWN TOKEN TO PIGGYBACK\nTHEM. THEY WILL MOVE TOGETHER ON THEIR\nNEXT JUMP.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }
  
  function ShortcutsPage() {
    const springs = useSpring({
      from: {
        cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[0],
        cursorScale: layout[device].howToPlay.shortcutsPage.cursor.scale[0],
        cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[0],
        rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[0],
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        legalTile2Scale: 0.5,
        legalTile3Scale: 0.5,
        pointer0Scale: 0,
        pointer1Scale: 0,
        pointer2Scale: 0,
        pointer3Scale: 0,
        pointer4Scale: 0,
        rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[0],
        scoreScale: 0,
        tilesScale: layout[device].howToPlay.shortcutsPage.tilesScale[0],
        tilesPos: layout[device].howToPlay.shortcutsPage.tilesPos[0],
        tilesRotation: [0,0,0],
        ruleTextScale: layout[device].howToPlay.shortcutsPage.text.scales[0],
        noteTextScale: 0,
        moveTextScale: layout[device].howToPlay.shortcutsPage.moveText.scale[0],
        moveTokenScale: 0
      },
      to: [
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[1],
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[2],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[3],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[4],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[1],
          legalTile0Scale: 0.6,
          pointer0Scale: 1.5,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[5],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[2],
          legalTile0Scale: 0.4,
          pointer0Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[6],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[3],
          delay: 500,
          scoreScale: 1,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[8],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[4],
          scoreScale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[9],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[10],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[11],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[5],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[12],
          legalTile1Scale: 0.6,
          pointer1Scale: 1,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[6],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[13],
          legalTile1Scale: 0.4,
          pointer1Scale: 0,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[14],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[15],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[16],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[17],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[18],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 1,
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[7],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          scoreScale: 0,
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[8],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[19],
          tilesScale: layout[device].howToPlay.shortcutsPage.tilesScale[1],
          tilesPos: layout[device].howToPlay.shortcutsPage.tilesPos[1],
          tilesRotation: [0, -Math.PI/16, 0],
          ruleTextScale: layout[device].howToPlay.shortcutsPage.text.scales[1],
          noteTextScale: 1,
          cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[1],
          cursorScale: layout[device].howToPlay.shortcutsPage.cursor.scale[1],
          moveTextScale: layout[device].howToPlay.shortcutsPage.moveText.scale[1],
          delay: 1000
        },
        {
          cursorPos: layout[device].howToPlay.shortcutsPage.cursor.position[2],
          delay: 1000
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[1],
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[9],
          legalTile2Scale: 0.4,
          legalTile3Scale: 0.8,
          pointer2Scale: 1,
          pointer3Scale: 1,
          pointer4Scale: 2.5,
          moveTokenScale: 1,
          delay: 1000,
          config: {
            tension: 0,
          }
        },
        {
          cursorEffectOpacity: layout[device].howToPlay.shortcutsPage.cursor.effectOpacity[2],
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Scale: layout[device].howToPlay.shortcutsPage.rocket0Scale[10],
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[20],
          delay: 2000,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[21],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[22],
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.shortcutsPage.rocket0Pos[23],
          moveTokenScale: 0,
          pointer4Scale: 0,
          legalTile3Scale: 0.4,
          delay: 500,
          config: {
            tension: 0,
          }
        },
        {
          delay: 5000
        }
      ],
      loop: true
    })

    function Tiles(props) {
      const TILE_RADIUS = layout[device].howToPlay.tileRadius.ring
      const NUM_STARS = 20;
      let tiles = [];
  
      //circle
      for (let i = 0; i < NUM_STARS; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i == 0) {
          tiles.push(<Earth position={position} scale={0.4} key={i}/>);
        } else if (i == 3) {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={springs.legalTile2Scale}
              device={device}
            />
          );
        } else if (i == 7) {
          tiles.push(
            <group 
            key={i}>
              <Star
                position={position}
                scale={springs.legalTile3Scale}
              />
              <Pointer color='red' position={[position[0], position[1] + 2, position[2]]} scale={springs.pointer4Scale}/>
            </group>
          );
        } else if (i == 5) {
          tiles.push(
            <Mars
              position={position}
              scale={0.4}
              key={i}
            />
          );
        } else if (i == 10) {
          tiles.push(
            <Saturn position={position} scale={springs.legalTile1Scale} key={i}/>
          );
        } else if (i == 15) {
          tiles.push(<Neptune position={position} scale={0.4} key={i}/>);
        } else {
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
  
      //shortcuts
      const radiusShortcut1 = layout[device].howToPlay.tileRadius.shortcut1;
      const radiusShortcut2 = layout[device].howToPlay.tileRadius.shortcut2;
      for (let i = 0; i < NUM_STARS; i++) {
        let indexShortcut1;
        let indexShortcut2;
        if (i == 0) {
          indexShortcut1 = 24;
          indexShortcut2 = 23;
        } else if (i == 5) {
          indexShortcut1 = 28;
          indexShortcut2 = 27;
        } else if (i == 10) {
          indexShortcut1 = 20;
          indexShortcut2 = 21;
        } else if (i == 15) {
          indexShortcut1 = 25;
          indexShortcut2 = 26;
        }
        if (i == 0 || i == 5 || i == 10 || i == 15) {
          let position1 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut1,
          ]
          tiles.push(
            <Star
              position={position1}
              tile={indexShortcut1}
              key={i + 30}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
          let position2 = [
            Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
            0,
            Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
              radiusShortcut2,
          ]
          tiles.push(
            <Star
              position={position2}
              tile={indexShortcut2}
              key={i + 41}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          );
        }
      }
      // center piece
      tiles.push(
        <Moon
          position={[0,0,0]}
          intensity={3}
          key={100}
          tile={22}
          device={device}
          scale={springs.legalTile0Scale}
        />
      );
      return <animated.group {...props}>
        {tiles}
        <animated.group name='rocket-0' scale={springs.rocket0Scale} position={springs.rocket0Pos}>
          <Rocket />
        </animated.group>
        <animated.group name='moon-arrow' scale={springs.pointer0Scale}>
          <ArrowBlender
            position={[0, 0.5, 1.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='saturn-arrow' scale={springs.pointer1Scale}>
          <ArrowBlender
            position={[0, 0.5, -3.5]}
            rotation={[0, -Math.PI/2, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group name='mars-arrow-wrong' scale={springs.pointer2Scale}>
          <ArrowBlender
            position={[3.5, 0.5, 0]}
            rotation={[0, -Math.PI, 0]}
            scale={0.5}
            color='grey'
          />
        </animated.group>
        <animated.group name='mars-arrow-correct' scale={springs.pointer3Scale}>
          <ArrowBlender
            position={[4.6, 0.5, -1.5]}
            rotation={[0, -Math.PI/8 * 11, 0]}
            scale={0.5}
            color='red'
          />
        </animated.group>
        <animated.group scale={springs.scoreScale}>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json" 
            size={0.5} 
            height={0.01}
            position={layout[device].howToPlay.shortcutsPage.scoreText.position}
            rotation={layout[device].howToPlay.shortcutsPage.scoreText.rotation}
          >
            SCORE!
            <meshStandardMaterial color='limegreen'/>
          </Text3D>
        </animated.group>
      </animated.group>;
    }

    return <group name='shortcuts-page'>
      <animated.group name='text' 
        scale={springs.ruleTextScale}
      >
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.shortcutsPage.text.position} 
          rotation={layout[device].howToPlay.shortcutsPage.text.rotation}
          size={layout[device].howToPlay.shortcutsPage.text.size}
          height={layout[device].howToPlay.shortcutsPage.text.height}
          lineHeight={layout[device].howToPlay.shortcutsPage.text.lineHeight}
        >
          {`8. When you start a move\nfrom a planet or the Moon,\nyou can take a shortcut.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <animated.group 
      name='note-text' 
      position={layout[device].howToPlay.shortcutsPage.noteText.position} 
      rotation={layout[device].howToPlay.shortcutsPage.noteText.rotation} 
      scale={springs.noteTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[0,0,0]}
          rotation={[0, 0, 0]}
          size={0.4}
          height={0.01}
        >
          {'NOTE: you cannot\nbend in the middle\nof a move.'}
          <meshStandardMaterial color='yellow'/>
        </Text3D> 
      </animated.group>
      <animated.group 
        name='move-text' 
        position={layout[device].howToPlay.shortcutsPage.moveText.position}
        rotation={layout[device].howToPlay.shortcutsPage.moveText.rotation}
        scale={springs.moveTextScale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          size={0.5} 
          height={0.01}
        >
          {'MOVE:'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <YootToken position={layout[device].howToPlay.shortcutsPage.yootToken.position} rotation={[Math.PI/2, Math.PI/2, 0]} />
      </animated.group>
      <Cursor2
        position={springs.cursorPos}
        rotation={[0,0,0]}
        scale={springs.cursorScale}
        effectOpacity={springs.cursorEffectOpacity}
        effect={true}
      />
      <Tiles 
        position={springs.tilesPos} 
        rotation={springs.tilesRotation} 
        scale={springs.tilesScale}
      />
      <animated.group scale={springs.moveTokenScale}>
        <YootToken 
          position={layout[device].howToPlay.shortcutsPage.tileHelper.position} 
          rotation={layout[device].howToPlay.shortcutsPage.tileHelper.rotation} 
        />
      </animated.group>
    </group>
  }

  function ReadingTheDicePage() {
    return <group>
      <animated.group name='text'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.text.position}
          rotation={layout[device].howToPlay.readingTheDicePage.text.rotation}
          size={layout[device].howToPlay.readingTheDicePage.text.size}
          height={layout[device].howToPlay.readingTheDicePage.text.height}
        >
          {'3. How to read the dice'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.do.position} 
      scale={layout[device].howToPlay.readingTheDicePage.do.scale}>     
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line0.height}
        >
          {'DO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line1.height}
        >
          {'1 Step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="do" 
          scale={layout[device].howToPlay.readingTheDicePage.do.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.do.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.ge.position} 
      scale={layout[device].howToPlay.readingTheDicePage.ge.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line0.height}
        >
          {'GE'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line1.height}
        >
          {'2 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="ge" 
          scale={layout[device].howToPlay.readingTheDicePage.ge.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.ge.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.gul.position} 
      scale={layout[device].howToPlay.readingTheDicePage.gul.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line0.height}
        >
          {'GUL'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line1.height}
        >
          {'3 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="gul" 
        scale={layout[device].howToPlay.readingTheDicePage.gul.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.gul.yootSet.position}/>
        </Float>
      </group>
      <group
      position={layout[device].howToPlay.readingTheDicePage.yoot.position} 
      scale={layout[device].howToPlay.readingTheDicePage.yoot.scale}>            
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.height}
        >
          {'YOOT'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.height}
        >
          {'4 Steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="yoot" 
          scale={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.position}/>
        </Float>
      </group>
      <group       
      position={layout[device].howToPlay.readingTheDicePage.mo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.mo.scale}>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line0.height}
        >
          {'MO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line1.height}
        >
          {'5 steps'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line2.height}
        >
          {'bonus turn'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="mo" 
        scale={layout[device].howToPlay.readingTheDicePage.mo.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.mo.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.backdo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.backdo.scale}>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.height}
        >
          {'backdo'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>         
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.height}
        >
          {'-1 step'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.height}
        >
          {'backward'}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="backdo" 
          scale={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.position}/>
        </Float>
      </group>
    </group>
  }

  function Tabs({ position=[0,0,0], scale=1 }) {
    const [overviewHover, setOverviewHover] = useState(false)
    const [throwTheYutHover, setThrowTheYutHover] = useState(false)
    const [catchEnemiesHover, setCatchEnemiesHover] = useState(false)
    const [piggybackHover, setPiggybackHover] = useState(false)
    const [scoreHover, setScoreHover] = useState(false)
    const [readTheDiceHover, setReadTheDiceHover] = useState(false)
    const [shortcutHover, setShortcutHover] = useState(false)

    function handleOverviewClick() {
      setPage(0)
    }
    function handleOverviewPointerEnter() {
      setOverviewHover(true)
    }
    function handleOverviewPointerLeave() {
      setOverviewHover(false)
    }
    function handleThrowTheYutClick() {
      setPage(1)
    }
    function handleThrowTheYutPointerEnter() {
      setThrowTheYutHover(true)
    }
    function handleThrowTheYutPointerLeave() {
      setThrowTheYutHover(false)
    }
    function handleCatchEnemiesClick() {
      setPage(2)
    }
    function handleCatchEnemiesPointerEnter() {
      setCatchEnemiesHover(true)
    }
    function handleCatchEnemiesPointerLeave() {
      setCatchEnemiesHover(false)
    }
    function handlePiggybackClick() {
      setPage(3)
    }
    function handlePiggybackPointerEnter() {
      setPiggybackHover(true)
    }
    function handlePiggybackPointerLeave() {
      setPiggybackHover(false)
    }
    function handleScoreClick() {
      setPage(4)
    }
    function handleScorePointerEnter() {
      setScoreHover(true)
    }
    function handleScorePointerLeave() {
      setScoreHover(false)
    }
    function handleReadTheDiceClick() {
      setPage(5)
    }
    function handleReadTheDicePointerEnter() {
      setReadTheDiceHover(true)
    }
    function handleReadTheDicePointerLeave() {
      setReadTheDiceHover(false)
    }
    function handleShortcutClick() {
      setPage(6)
    }
    function handleShortcutPointerEnter() {
      setShortcutHover(true)
    }
    function handleShortcutPointerLeave() {
      setShortcutHover(false)
    }


    return <group name='tabs' position={position} scale={scale}>
      <group name='tab-0' position={[0,0,0]} scale={0.8}>
        <mesh position={[1.55, -0.1, -0.2]}>
          <boxGeometry args={[3.4, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.55, -0.1, -0.2]}>
          <boxGeometry args={[3.5, 0.04, 0.85]}/>
          <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-0-wrapper' 
          position={[1.55, -0.1, -0.2]}
          onClick={handleOverviewClick}
          onPointerEnter={handleOverviewPointerEnter}
          onPointerLeave={handleOverviewPointerLeave}
        >
          <boxGeometry args={[3.5, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          1. OVERVIEW
          <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-1' position={[2.9,0,0]} scale={0.8}>
        <mesh position={[2.3, -0.1, -0.2]}>
          <boxGeometry args={[4.9, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.3, -0.1, -0.2]}>
          <boxGeometry args={[5, 0.04, 0.85]}/>
          <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-1-wrapper' 
          position={[2.3, -0.1, -0.2]}
          onClick={handleThrowTheYutClick}
          onPointerEnter={handleThrowTheYutPointerEnter}
          onPointerLeave={handleThrowTheYutPointerLeave}
        >
          <boxGeometry args={[5, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          2. THROW THE YUT
          <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-2' position={[7,0,0]} scale={0.8}>
        <mesh position={[2.15, -0.1, -0.2]}>
          <boxGeometry args={[4.6, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.15, -0.1, -0.2]}>
          <boxGeometry args={[4.7, 0.04, 0.85]}/>
          <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-2-wrapper' 
          position={[2.15, -0.1, -0.2]}
          onClick={handleCatchEnemiesClick}
          onPointerEnter={handleCatchEnemiesPointerEnter}
          onPointerLeave={handleCatchEnemiesPointerLeave}
        >
          <boxGeometry args={[4.7, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          3. CATCH ENEMIES
          <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-3' position={[0,0,0.8]} scale={0.8}>
        <mesh position={[1.75, -0.1, -0.2]}>
          <boxGeometry args={[3.8, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.75, -0.1, -0.2]}>
          <boxGeometry args={[3.9, 0.04, 0.85]}/>
          <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-3-wrapper' 
          position={[1.7, -0.1, -0.2]}
          onClick={handlePiggybackClick}
          onPointerEnter={handlePiggybackPointerEnter}
          onPointerLeave={handlePiggybackPointerLeave}
        >
          <boxGeometry args={[3.8, 0.1, 0.7]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          4. PIGGYBACK
          <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-4' position={[3.2,0,0.8]} scale={0.8}>
        <mesh position={[1.1, -0.1, -0.2]}>
          <boxGeometry args={[2.45, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.1, -0.1, -0.2]}>
          <boxGeometry args={[2.55, 0.04, 0.85]}/>
          <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-4-wrapper' 
          position={[1.1, -0.1, -0.2]} 
          onClick={handleScoreClick}
          onPointerEnter={handleScorePointerEnter}
          onPointerLeave={handleScorePointerLeave}
        >
          <boxGeometry args={[2.5, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          5. SCORE
          <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-5' position={[5.35,0,0.8]} scale={0.8}>
        <mesh position={[2.05, -0.1, -0.2]}>
          <boxGeometry args={[4.4, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[2.05, -0.1, -0.2]}>
          <boxGeometry args={[4.5, 0.04, 0.85]}/>
          <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-5-wrapper' 
          position={[2.05, -0.1, -0.2]}
          onClick={handleReadTheDiceClick}
          onPointerEnter={handleReadTheDicePointerEnter}
          onPointerLeave={handleReadTheDicePointerLeave}
        >
          <boxGeometry args={[4.5, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          6. READ THE YUT
          <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
      <group name='tab-6' position={[0,0,1.6]} scale={0.8}>
        <mesh position={[1.6, -0.1, -0.2]}>
          <boxGeometry args={[3.5, 0.05, 0.75]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh position={[1.6, -0.1, -0.2]}>
          <boxGeometry args={[3.6, 0.04, 0.85]}/>
          <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
        </mesh>
        <mesh 
          name='tab-6-wrapper' 
          position={[1.6, -0.1, -0.2]}
          onClick={handleShortcutClick}
          onPointerEnter={handleShortcutPointerEnter}
          onPointerLeave={handleShortcutPointerLeave}
        >
          <boxGeometry args={[3.6, 0.1, 0.85]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
        >
          7. SHORTCUT
          <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
        </Text3D>
      </group>
    </group>
  }

  function Pagination({ position, scale }) {

    function handlePageLeft() {
      setPage(page => {
        if (page === 0) {
          return 7
        } else {
          return page-1
        }
      })
    }

    function handlePageRight() {
      setPage(page => {
        if (page === 7) {
          return 0
        } else {
          return page+1
        }
      })
    }
    
    function handlePage0() {
      setPage(0)
    }
    function handlePage1() {
      setPage(1)
    }
    function handlePage2() {
      setPage(2)
    }
    function handlePage3() {
      setPage(3)
    }
    function handlePage4() {
      setPage(4)
    }
    function handlePage5() {
      setPage(5)
    }
    function handlePage6() {
      setPage(6)
    }
    function handlePage7() {
      setPage(7)
    }

    const space = layout[device].howToPlay.pagination.elementSpace
    const startX = layout[device].howToPlay.pagination.startX
    return <group name='pagination' position={position} scale={scale}>
      <mesh position={[startX, 0, 6]} rotation={[0, 0, Math.PI/2]} onPointerUp={handlePageLeft}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, layout[device].howToPlay.pagination.arrowHeight, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh position={[startX + space*1, 0, 6]} onPointerUp={handlePage0}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 0 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*2, 0, 6]} onPointerUp={handlePage1}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 1 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*3, 0, 6]} onPointerUp={handlePage2}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 2 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*4, 0, 6]} onPointerUp={handlePage3}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 3 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*5, 0, 6]} onPointerUp={handlePage4}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 4 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*6, 0, 6]} onPointerUp={handlePage5}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 5 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*7, 0, 6]} onPointerUp={handlePage6}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 6 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*8, 0, 6]} onPointerUp={handlePage7}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 7 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*9, 0, 6]} rotation={[0, 0, -Math.PI/2]} onPointerUp={handlePageRight}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, layout[device].howToPlay.pagination.arrowHeight, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
    </group>
  }

  function CloseButton({position, scale}) {
    const rulebookCloseButtonWrapper = useRef();
    const [rulebookCloseButtonHover, setRulebookCloseButtonHover] = useState(false);
    function handleRulebookCloseButtonPointerEnter() {
      setRulebookCloseButtonHover(true)
    }
    function handleRulebookCloseButtonPointerLeave() {
      setRulebookCloseButtonHover(false)
    }
    function handleRulebookCloseButtonPointerClick() {
      setShowRulebook(false)
    }

    return <group 
      name='rulebook-close-button' 
      position={position}
      scale={scale}
    >
      <mesh rotation={[Math.PI/2, 0, Math.PI/4]}>
        <capsuleGeometry args={[0.06, 0.35, 4, 32]}/>
        <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
      </mesh>
      <mesh rotation={[Math.PI/2, 0, -Math.PI/4]}>
        <capsuleGeometry args={[0.06, 0.35, 4, 32]}/>
        <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
      </mesh>
      <group name='rulebook-close-button'>
        <mesh>
          <boxGeometry args={[0.6, 0.02, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh>
          <boxGeometry args={[0.7, 0.01, 0.7]}/>
          <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh 
          name='rulebook-close-button-wrapper' 
          ref={rulebookCloseButtonWrapper}
          onPointerEnter={handleRulebookCloseButtonPointerEnter}
          onPointerLeave={handleRulebookCloseButtonPointerLeave}
          onClick={handleRulebookCloseButtonPointerClick}
        >
          <boxGeometry args={[0.7, 0.02, 0.7]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
      </group>
    </group>
  }

  function Overview() {
    const TILE_RADIUS = 5
    const springs = useSpring({
      from: {
        catchTokenPosition: [
          -Math.cos(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          1.5,
          Math.sin(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
        ],
        catchTokenScale: 1.5,
        piggybackTokenPosition: [-4.1,1,-3.1],
        movingTokenPosition: [1.6,0,2.4],
        movingTokenScale: 1,
        catchAlertScale: 0,
        catchTokenHomeScale: 0,
        piggybackAlertScale: 0,
        piggybackTokenScale: 1,
        welcomeHomeAlertScale: 0,
        scoredIndicator0Scale: 0,
        scoredIndicator1Scale: 0,
      },
      to: [
        {
          movingTokenPosition: [
            -Math.cos(((5) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            2.5,
            Math.sin(((5) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          movingTokenScale: 1.4,
        },
        {
          movingTokenPosition: [
            -Math.cos(((6) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((6) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((7) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((7) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((8) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((8) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((9) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((9) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((10) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((10) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((11) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((11) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          catchAlertScale: 1,
        },
        {
          catchTokenPosition: [-1, 0, 1.9],
          catchTokenScale: 0,
          delay: 500
        },
        {
          catchTokenHomeScale: 1,
        },
        {
          movingTokenPosition: [
            -Math.cos(((13) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((13) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          catchAlertScale: 0
        },
        {
          movingTokenPosition: [
            -Math.cos(((14) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((14) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((15) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((15) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((16) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((16) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((17) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((17) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackAlertScale: 0.85
        },
        {
          movingTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenScale: 1.4,
          delay: 500
        },
        {
          movingTokenPosition: [
            -Math.cos(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackAlertScale: 0
        },
        {
          movingTokenPosition: [
            -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          welcomeHomeAlertScale: 1
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5 + 2,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 - 4,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5 + 2,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 - 4,
          ],
          movingTokenScale: 0,
          piggybackTokenScale: 0,
          welcomeHomeAlertScale: 0,
          delay: 500
        },
        {
          scoredIndicator0Scale: 0.4,
          scoredIndicator1Scale: 0.4,
        }
      ],
      delay: 1000,
      config: {
        tension: 170,
        friction: 26
      }
    })

    function CatchAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1
      const width = 2
      const starScale = 0.1
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.1,0,0.2]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}>
          CATCH!
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    function PiggybackAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1
      const width = 2.5
      const starScale = 0.1
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.8,0,0.2]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}>
          PIGGYBACK!
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    function WelcomeHomeAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.3
      const width = 2.4
      const starScale = 0.12
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.8}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.45,0,-0.1]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}
        lineHeight={0.8}>
          {`WELCOME\n    HOME!`}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    return <group>
      <CatchAlert position={[7, 1, -6]} scale={springs.catchAlertScale}/>
      <PiggybackAlert position={[-1.7, 1, -5.6]} scale={springs.piggybackAlertScale}/>
      <WelcomeHomeAlert position={[2.8,1,2]} scale={springs.welcomeHomeAlertScale}/>
      <group position={[2.8, 0, -0.5]}>
        <Board constellations={false} showStart/>
        {/* Catch token */}
        <animated.group position={springs.catchTokenPosition} scale={springs.catchTokenScale}>
          <Ufo onBoard/>
        </animated.group>
        {/* Piggyback token */}
        <animated.group scale={springs.piggybackTokenScale} position={springs.piggybackTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
        {/* Moving token */}
        <animated.group scale={springs.movingTokenScale} position={springs.movingTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
      </group>
      <group name='ufo-home' position={[0.6, 0, 1.5]}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='turquoise' transparent opacity={0.05}/>
        </mesh>
        <Ufo position={[-0.5,0,-0.4]}/>
        <Ufo position={[0.5,0,-0.4]}/>
        <Ufo position={[-0.5,0,0.4]}/>
        <animated.group scale={springs.catchTokenHomeScale}>
          <Ufo position={[0.5,0,0.4]}/>
        </animated.group>
        {/* Add hologram Ufo */}
      </group>
      <group name='rocket-home' position={[5, 0, 1.5]}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='red' transparent opacity={0.1}/>
        </mesh>
        <Rocket position={[-0.6,0,-0.5]}/>
        <Rocket position={[0.4,0,-0.5]}/>
        {/* Moving token */}
        {/* Add hologram Rocket */}
        <animated.group name='scored-indicator-0' position={[-0.5, 0, 0.5]} scale={springs.scoredIndicator0Scale}>
          <Star color='red'/>
        </animated.group>
        <animated.group name='scored-indicator-1' position={[0.5, 0, 0.5]} scale={springs.scoredIndicator1Scale}>
          <Star color='red'/>
        </animated.group>
      </group>
      <group name='yoot-display' position={[6.8, 0, 5.5]}>
        <Text3D 
        name='goal'
        font="fonts/Luckiest Guy_Regular.json"
        position={[1.3,0,0.2]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.4}
        height={layout[device].game.whoGoesFirst.title.height}>
          {`YUT\n(DICE)`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <YootDisplay rotation={[0, Math.PI/2, 0]} scale={0.2}/>
      </group>
      <Text3D 
      name='goal'
      font="fonts/Luckiest Guy_Regular.json"
      position={[-2.5, 0, 8]}
      rotation={layout[device].game.whoGoesFirst.title.rotation}
      size={0.4}
      height={layout[device].game.whoGoesFirst.title.height}>
        {`MOVE SHIPS AROUND THE STARS FROM START\nTO FINISH. FINISH 4 SHIPS FIRST TO WIN!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  const pages = [<Overview/>, <ThrowTheYutPage/>, <CatchEnemiesPage/>, <PiggybackPage/>, <ScoringPage/>, <ReadingTheDicePage/>, <ShortcutsPage/>]

  return <group position={position} rotation={rotation} scale={scale}>
    {pages[page]}
    { device === 'portrait' && <Pagination 
      position={layout[device].howToPlay.pagination.position}
      scale={layout[device].howToPlay.pagination.scale}
    /> }
    { device === 'landscapeDesktop' && <Tabs position={[-2.3, 0, 10]}/> }
    { closeButton && <CloseButton
      position={layout[device].game.rulebook.closeButton.position} 
      scale={layout[device].game.rulebook.closeButton.scale
    }/> }
  </group>
}