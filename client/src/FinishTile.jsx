import { Text3D } from "@react-three/drei"
import Star from "./meshes/Star"
import FinishMarkerSelectable from "./FinishMarkerSelectable"
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { useRef, useState } from "react";
import { clientAtom, gamePhaseAtom, hasTurnAtom, pauseGameAtom, selectionAtom, showFinishMovesAtom, turnAtom } from "./GlobalState";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useAnimationPlaying } from "./hooks/useAnimationPlaying";
import { getLegalTiles } from "./helpers/legalTiles";
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { MeshStandardMaterial } from "three";

export default function FinishTile({ legalTileInfo }) {
  const tile = 29

  const selection = useAtomValue(selectionAtom);
  const hasTurn = useAtomValue(hasTurnAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const animationPlaying = useAnimationPlaying()
  const paused = useAtomValue(pauseGameAtom)
  const client = useAtomValue(clientAtom)
  const [showFinishMoves, setShowFinishMoves] = useAtom(showFinishMovesAtom)
  const params = useParams()
  const { wrapperScale } = useSpring({
    wrapperScale: (selection != null && legalTileInfo) ? 0.5 : 0, // want the animation to start again when status changes
  })
  const wrapperMat = useRef();
  const wrapper = useRef();
  const starMatRef = useRef();
  const borderMatRef = useRef();
  const finishMovesPointerRef = useRef()

  let time = 0
  const finishMovesPointerPositionX = 0.2
  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime
    time += delta
    if (wrapperMat.current && wrapper.current && starMatRef.current && borderMatRef.current) {
      if (selection != null && legalTileInfo) {
        // if (turn.team === 0) {
        //   wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.02 + 0.03, 0.8, 0.5);
        // } else {
        //   wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.06 + 0.55, 1, 0.3);
        // }
        wrapperMat.current.opacity = 0.2;
        wrapper.current.scale.x = Math.sin(time * 3) * 0.05 + 1.1;
        wrapper.current.scale.y = Math.sin(time * 3) * 0.05 + 1.1;
        wrapper.current.scale.z = Math.sin(time * 3) * 0.05 + 1.1;
  
        // Star shine
        starMatRef.current.color.setHSL(Math.cos(time * 5) * 0.2 + 0.3, Math.cos(time * 5) * 0.06 + 1, Math.cos(time * 5) * 0.06 + 0.3);
        borderMatRef.current.color.setHSL(Math.cos(time * 5) * 0.2 + 0.3, Math.cos(time * 5) * 0.06 + 1, Math.cos(time * 5) * 0.06 + 0.3);
        wrapperMat.current.color.setHSL(Math.cos(time * 5) * 0.15 + 0.5, Math.cos(time * 5) * 0.3 + 1, Math.cos(time * 6) * 0.1 + 0.4);

      } else {
        wrapperMat.current.opacity = 0;
        starMatRef.current.color.r = 0.031
        starMatRef.current.color.g = 0.61
        starMatRef.current.color.b = 0.031
        borderMatRef.current.color.r = 0.031
        borderMatRef.current.color.g = 0.61
        borderMatRef.current.color.b = 0.031
      }
    } else if (showFinishMoves && finishMovesPointerRef.current) { // Pointer point animation
      finishMovesPointerRef.current.position.x = Math.cos(time * 5) * 0.05 + finishMovesPointerPositionX
    }
  })

  function handleFinishPointerEnter(e) {
    e.stopPropagation()
    document.body.style.cursor = "pointer";
  }
  function handleFinishPointerLeave(e) {
    e.stopPropagation()
    document.body.style.cursor = "default";
  }
  function handleFinishPointerUp(e) {
    e.stopPropagation()
    document.body.style.cursor = "default";
    if (gamePhase === "game" && hasTurn && !animationPlaying && !paused) {
      // if legalTileInfo.length === 1: click scores
      // if it's greater than 1: click selects tile
        // select doesn't clear. it sends 'display finish moves' event
      if (selection.tile !== tile && legalTileInfo) {
        // Server clears legalTiles and selection
        // When they're called separately, the order of operation is not kept
        if (legalTileInfo.length === 1) {
          socket.emit("score", { roomId: params.id.toUpperCase(), selectedMove: legalTileInfo[0], playerName: client.name });
        } else if (legalTileInfo.length > 1) {
          setShowFinishMoves(true)
        }
      } else {
        socket.emit("select", { roomId: params.id.toUpperCase(), selection: null, legalTiles: {} });
      }
    }
  }

  const finishMarkerRadius = 3.5
  return <group name='finish-marker' key={29} scale={1.67}>
    { !legalTileInfo && <group name='finish-marker-normal'>
      <group name='dots-normal'>
        <mesh name='dot-0' position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (24/32))+0.19, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (24/32)), 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (25/32))+0.17, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (25/32))-0.04, 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (26/32))+0.13, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (26/32))-0.05, 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (27/32))+0.08, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (27/32))-0.02, 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (28/32))+0.02, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (28/32))+0.03, 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (29/32))-0.05, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (29/32))+0.1, 
          ]}>
          <sphereGeometry args={[0.04, 32, 16]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh>
        <mesh name='arrow' rotation={[0, Math.PI * 2 * 4/32, 0]}
          position={[
          finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (30/32))-0.1, 
          0, 
          -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (30/32))+0.2, 
          ]}>
          <cylinderGeometry args={[0, 0.1, 0.01, 3]}/>
          <meshStandardMaterial color='limegreen'/>
        </mesh >
      </group>
      <Text3D name='text-normal'
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-1.6,0,4.1]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
      >
        FINISH
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
    </group> }
    { legalTileInfo && <FinishMarkerSelectable legalTileInfo={legalTileInfo} selection={selection} /> }
    { !showFinishMoves && <group name='finish-pad' position={[0, 0, 3.9]}>
      <mesh name='finish-pad-background-outer' position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.01, 32]}/>
        <meshStandardMaterial color='limegreen' ref={borderMatRef}/>
      </mesh>
      <mesh name='finish-pad-background-inner' position={[0, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.011, 32]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <Star scale={0.22} material={<meshStandardMaterial color='limegreen' ref={starMatRef}/>} position={[0, -0.03, 0]}/>
      <animated.group scale={wrapperScale}>
        <mesh
          name='wrapper'
          position={[0, 0, 0]}
          onPointerEnter={(e) => { handleFinishPointerEnter(e) }}
          onPointerLeave={(e) => { handleFinishPointerLeave(e) }}
          onPointerDown={(e) => { handleFinishPointerUp(e) }}
          ref={wrapper}
        >
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
          depthWrite={false}
          color='limegreen'
        />
      </mesh>
      </animated.group>
    </group> }
    { showFinishMoves && <mesh name='finish-moves-pointer' ref={finishMovesPointerRef} scale={[0.15, 0.4, 0.15]} position={[finishMovesPointerPositionX, 0, 4]} rotation={[0, 0, -Math.PI/2]}>
      <coneGeometry args={[1, 1, 3]}/>
      <meshStandardMaterial color='limegreen'/>
    </mesh>}
  </group>
}