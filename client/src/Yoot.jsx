import { useEffect, useRef, useState } from "react";
import { RigidBody, CuboidCollider, Physics } from "@react-three/rapier";
import { useGLTF, /*useKeyboardControls*/ } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import { socket } from "./SocketManager.jsx";
import { useAtom } from "jotai";
import layout from "./layout.js";
import TextButton from "./components/TextButton.jsx";
import YootButton from "./YootButton.jsx";
import meteorSettings from "./particles/Meteors.js";
import { particleSettingAtom, gamePhaseAtom, yootThrowValuesAtom, initialYootThrowAtom, lastMoveAtom, yootThrownAtom, mainAlertAtom, pregameAlertAtom, throwAlertAtom } from "./GlobalState.jsx";
import { useParams } from "wouter";
import HtmlElement from "./HtmlElement.jsx";
import PracticeYootButton from "./PracticeYootButton.jsx";
import { roundNum } from "./helpers/helpers.js";
import Decimal from 'decimal.js';

THREE.ColorManagement.legacyMode = false;

export default function Yoot({ device }) {
  const nodes = useGLTF("/models/yoot.glb").nodes;
  const materials = useGLTF("/models/yoot.glb").materials;
  const nodesRhino = useGLTF("/models/yoot-rhino.glb").nodes;
  const materialsRhino = useGLTF("/models/yoot-rhino.glb").materials;
  
  const [yootThrowValues] = useAtom(yootThrowValuesAtom);
  const [initialYootThrow] = useAtom(initialYootThrowAtom);
  const [yootThrown] = useAtom(yootThrownAtom)
  const [gamePhase] = useAtom(gamePhaseAtom);
  const [sleepCount, setSleepCount] = useState(0);
  const [_outOfBounds, setOutOfBounds] = useState(false);
  const [_lastMove, setLastMove] = useAtom(lastMoveAtom)
  const [timer, setTimer] = useState(null)
  // hide alert
  const [_mainAlert, setMainAlert] = useAtom(mainAlertAtom)
  const [_throwAlert, setThrowAlert] = useAtom(throwAlertAtom)
  const params = useParams()

  const NUM_YOOTS = 4;
  let yoots = [];
  let yootMeshes = [];
  for (let i = 0; i < NUM_YOOTS; i++) {
    yoots.push(useRef());
    yootMeshes.push(useRef());
  }

  useEffect(() => {
    // set timer
    // clear on yoot rest
    // clear on throw
    // on timer expire, record throw
    setTimer((prevTimer) => {
      clearTimeout(prevTimer);
      return setTimeout(() => {
        console.log('record yoot')
        recordThrow();
      }, 4000)
    })

    // Show yoot
    for (let i = 0; i < yootMeshes.length; i++) {
      yootMeshes[i].current.material.visible = true
    }

    setMainAlert({ type: '' })
    setThrowAlert({ type: '' })
    // setPregameAlert({ type: '' })

    // client lags if you emit here
    if (yootThrowValues !== null && document.visibilityState === "visible") {
      for (let i = 0; i < 4; i++) {
        yoots[i].current.setLinvel({ 
          x: Decimal(0), 
          y: Decimal(0), 
          z: Decimal(0)
        })
        yoots[i].current.setAngvel({ 
          x: Decimal(0), 
          y: Decimal(0), 
          z: Decimal(0)
        })
        yoots[i].current.setTranslation(yootThrowValues[i].positionInHand);
        yoots[i].current.setRotation(yootThrowValues[i].rotation, true);
        yoots[i].current.applyImpulse({
          x: Decimal(0),
          y: Decimal(yootThrowValues[i].yImpulse),
          z: Decimal(0),
        });
        yoots[i].current.applyTorqueImpulse({
          x: Decimal(yootThrowValues[i].torqueImpulse.x),
          y: Decimal(yootThrowValues[i].torqueImpulse.y),
          z: Decimal(yootThrowValues[i].torqueImpulse.z),
        });
      }
      setSleepCount(0);
    }

  }, [yootThrowValues]);

  useEffect(() => {
    if (gamePhase === 'lobby' || gamePhase === 'pregame') {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = true
      } 
    } else {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = false
      } 
    }
  }, [gamePhase])

  function getMoveText(move) {
    const moveToText = {
      "0": "OUT",
      "1": "1-STEP",
      "2": "2-STEPS",
      "3": "3-STEPS",
      "4": "4-STEPS",
      "5": "5-STEPS",
      "-1": "BACK-1"
    }
    return moveToText[move]
  }

  const [_particleSetting, setParticleSetting] = useAtom(particleSettingAtom)
  
  function recordThrow() {

    let move = observeThrow();
    // Uncomment to test what happens on Yoot or Mo
    // move = 4

    // Show or hide yoot
    if (gamePhase === 'lobby' || gamePhase === 'pregame') {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = true
      } 
    } else {
      for (let i = 0; i < yootMeshes.length; i++) {
        yootMeshes[i].current.material.visible = false
      } 
    }
    
    if (gamePhase === 'lobby') {
      setLastMove(getMoveText(move))
    } else if (gamePhase === 'pregame' || gamePhase === 'game') {  

      // Don't emit meteors when client renders for the first time
      if (!initialYootThrow) {
        if (move === 4 || move === 5) {
          // setBoomText('bonus turn')
          setParticleSetting({emitters: meteorSettings(device)})
        }

        setLastMove(getMoveText(move))
        
        socket.emit("recordThrow", { move, roomId: params.id })
      } else {
        setLastMove(null)
      }
    }
  }

  // useEffect(() => {
  //   // console.log("[Yoots] sleepCount", sleepCount)
  //   if (sleepCount == 4) {
  //     recordThrow();
  //   }
  // }, [sleepCount])

  useFrame((state, delta) => {
    let allYootsOnFloor = true;
    for (let i = 0; i < yoots.length; i++) {
      if (yoots[i].current && yoots[i].current.translation().y < 0) {
        setOutOfBounds(true);
        allYootsOnFloor = false
      }
    }
    if (allYootsOnFloor) {
      setOutOfBounds(false);
    }
  })

  function observeThrow() {
    let result = 0

    // nak
    let nak = false;
    for (let i = 0; i < yoots.length; i++) {
      if (yoots[i].current.translation().y < 0) {
        nak = true;
      }
    }
    if (!nak) {
      let countUps = 0
      let backdoUp = false

      yoots.forEach(yoot => {
        let vector = new THREE.Vector3( 0, 1, 0 );
        vector.applyQuaternion( yoot.current.rotation() );
        if (vector.y < 0) {
          countUps++
          if (yoot.current.userData === "backdo") {
            backdoUp = true;
          }
        }
      });
  
      if (countUps == 0) {
        result = 5
      } else if (countUps == 1) {
        if (backdoUp == true) {
          result = -1
        } else {
          result = countUps
        }
      } else {
        result = countUps
      }
      // test: set all result to the same value
      // if (gamePhase === "game") {
      //   result = 5
      // }
    }
      
    return result
  }

  function onSleepHandler() {
    setSleepCount((count) => count+1);
  }

  return (
    <Physics>
      {/* Floor */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, 1.5, 2]}
        friction={0.9}
      >
        {/* Height has to be thick enough for Yoot to not fall through the collider */}
        <CuboidCollider args={[8, 0.5, 8]} restitution={0.2} friction={1} />
        <mesh>
          <boxGeometry args={[16, 1, 16]} />
          <meshStandardMaterial 
            transparent 
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </RigidBody>
      {/* Nak catcher */}
      <RigidBody
        type="fixed"
        restitution={0.01}
        position={[0, -5, 0]}
        friction={0.9}
      >
        <CuboidCollider args={[50, 1, 50]} restitution={0.2} friction={1} />
        <mesh>
          <boxGeometry args={[100, 2, 100]} />
          <meshStandardMaterial 
            transparent 
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </RigidBody>
      {yoots.map((ref, index) => {
        return (
          <RigidBody
            ref={ref}            
            position={[-1.5 + 1*index, 30, 2]}
            rotation={[0, Math.PI/2, 0]}
            colliders="hull"
            restitution={0.3}
            friction={0.6}
            name={`yoot${index}`}
            linearDamping={0.3}
            angularDamping={0.1} // when this value is high, yoots spin more
            scale={0.15}
            gravityScale={7}
            key={index}
            onSleep={onSleepHandler}
            userData={index != 0 ? "regular" : "backdo"} // tried setting this as an object. it woke up the object when it fell asleep
          >
            {index != 0 ? (
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007.geometry}
                material={materials["Texture wrap.005"]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[2.5, 14, 2.5]}
                ref={yootMeshes[index]}
              />
            ) : (
              <mesh
                castShadow
                receiveShadow
                geometry={nodesRhino.Cylinder007.geometry}
                material={materialsRhino["Texture wrap.005"]}
                ref={yootMeshes[index]}
                rotation={[0, 0, -Math.PI / 2]} 
                scale={[2.5, 14, 2.5]}
              />
            )}
          </RigidBody>
        );
      })}
      { gamePhase === 'lobby' && <PracticeYootButton
        position={layout[device].practiceThrowButton.position}
        rotation={layout[device].practiceThrowButton.rotation}
        fontSize={layout[device].practiceThrowButton.fontSize}
        scale={1}
      />}
      { (gamePhase === "pregame" || gamePhase === "game") && <YootButton 
        position={layout[device].throwButton.position}
        rotation={layout[device].throwButton.rotation}
        scale={layout[device].throwButton.scale}
      />}
    </Physics>
  );
}