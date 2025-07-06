import { useMemo, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { backdoLaunchAtom, clientAtom, gamePhaseAtom, hasTurnAtom, legalTilesAtom, pauseGameAtom, selectionAtom, showFinishMovesAtom, teamsAtom, tilesAtom, turnAtom } from "../GlobalState";
import { useParams } from "wouter";
import { getLegalTiles } from "../helpers/legalTiles";
import * as THREE from 'three';
import BackdoToken from "../moveTokens/BackdoToken";
import MoToken from "../moveTokens/MoToken";
import YootToken from "../moveTokens/YootToken";
import GulToken from "../moveTokens/GulToken";
import GeToken from "../moveTokens/GeToken";
import DoToken from "../moveTokens/DoToken";
import { animated, useSpring } from "@react-spring/three";
import { useAnimationPlaying } from "../hooks/useAnimationPlaying";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile=null,
  mesh,
  legalTileInfo, // If the key is not in the object, it's undefined
  pathNum,
  interactive=false
}) {

  const [selection, setSelection] = useAtom(selectionAtom);
  const setLegalTiles = useSetAtom(legalTilesAtom)
  const hasTurn = useAtomValue(hasTurnAtom)
  const tiles = useAtomValue(tilesAtom)
  const teams = useAtomValue(teamsAtom)
  const client = useAtomValue(clientAtom)
  const turn = useAtomValue(turnAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const paused = useAtomValue(pauseGameAtom)
  const backdoLaunch = useAtomValue(backdoLaunchAtom)
  const animationPlaying = useAnimationPlaying()
  const params = useParams()

  const group = useRef()
  const wrapperMat = useRef();
  const wrapper = useRef();

  function handlePointerEnter(event) {
    event.stopPropagation();
    // Doesn't change in Chrome
    // Browser runs on compatibility mode in prod
    document.body.style.cursor = "pointer";
  }

  function handlePointerLeave(event) {
    event.stopPropagation();
    document.body.style.cursor = "default";
  }

  function handlePointerDown(event) {
    event.stopPropagation();
    const team = client.team
    let pieces = tiles[tile]
    if (gamePhase === "game" && hasTurn && !animationPlaying && !paused) {
      if (selection === null) {
        if (pieces.length > 0 && pieces[0].team === team) {
          let history = tiles[tile][0].history
          let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history, backdoLaunch)
          if (!(Object.keys(legalTiles).length === 0)) {
            // update client
            setSelection({ tile, pieces })
            setLegalTiles(legalTiles)

            // update other clients
            socket.emit("select", { roomId: params.id.toUpperCase(), selection: { tile, pieces }, legalTiles })
          }
        }
      } else if (selection.tile !== tile && legalTileInfo) {
        // Server clears legalTiles and selection
        // When they're called separately, the order of operation is not kept
        socket.emit("move", { roomId: params.id.toUpperCase(), tile, playerName: client.name });
        
        const audio = new Audio('sounds/effects/star-move.mp3');
        audio.volume = 1;
        audio.play();
      } else {
        // update client
        setSelection(null)
        setLegalTiles({})
          
        // update other clients
        socket.emit("select", { roomId: params.id.toUpperCase(), selection: null, legalTiles: {} });
      }
    }
  }

  function hasValidMove(team) {
    const moves = teams[team].moves
    for (const move in moves) {
      if (parseInt(move) !== 0 && moves[move] > 0) {
        return true;
      }
    }
    return false;
  }

  const hasMovablePiece = selection === null 
  && tiles[tile].length > 0 
  && tiles[tile][0].team === client.team 
  && hasTurn && hasValidMove(client.team)
  && !animationPlaying
  
  const { wrapperScale } = useSpring({
    wrapperScale: ((selection != null && legalTileInfo) || hasMovablePiece) ? 1 : 0, // want the animation to start again when status changes
  })

  const baseWrapperScale = 1.3
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (hasMovablePiece) {
      if (Math.floor(state.clock.elapsedTime) % 2 == 0) {
        wrapperMat.current.opacity = 0.3
        if (tiles[tile][0].team === 0) {
          wrapperMat.current.color = new THREE.Color('#EA5E5E')
        } else {
          wrapperMat.current.color = new THREE.Color('turquoise')
        }
      } else {
        wrapperMat.current.opacity = 0.3
        wrapperMat.current.color = new THREE.Color('grey')
      }
      wrapper.current.scale.x = Math.cos(time * 3) * 0.1 + baseWrapperScale;
      wrapper.current.scale.y = Math.cos(time * 3) * 0.1 + baseWrapperScale;
      wrapper.current.scale.z = Math.cos(time * 3) * 0.1 + baseWrapperScale;
    } else if (selection != null && legalTileInfo) {
      if (turn.team === 0) {
        wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.02 + 0.03, 0.8, 0.5);
      } else {
        wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.06 + 0.55, 1, 0.3);
      }
      wrapperMat.current.opacity = 0.3;
      wrapper.current.scale.x = Math.cos(time * 3) * 0.1 + baseWrapperScale;
      wrapper.current.scale.y = Math.cos(time * 3) * 0.1 + baseWrapperScale;
      wrapper.current.scale.z = Math.cos(time * 3) * 0.1 + baseWrapperScale;
    } else {
      wrapperMat.current.opacity = 0;
    }
  })

  function PathNumHelper({pathNum}) {
    function shiftPosition({ tile }) {
      const positionTopRight = [1, 2.3, 0]
      const positionTopLeft = [-1, 2.3, 0]
      const positionBottomRight = [1, 2.3, 2]
      const positionBottomLeft = [-1, 2.3, 2]
      if (tile === 0 || tile === 1 || tile === 2 || tile === 3 || tile === 4) {
        return positionBottomRight
      } else if (tile === 5 || tile === 6 || tile === 7 || tile === 8 || tile === 9) {
        return positionTopRight
      } else if (tile === 10 || tile === 11 || tile === 12 || tile === 13 || tile === 14) {
        return positionTopRight
      } else if (tile === 15 || tile === 16 || tile === 17 || tile === 18 || tile === 19) {
        return positionTopRight
      } else if (tile === 20 || tile === 21 || tile === 22 || tile === 23 || tile === 24) {
        return positionTopRight
      } else if (tile === 25 || tile === 26 || tile === 27 || tile === 28) {
        return positionTopRight
      }
    }
    const Move = ({ position }) => {
      return <>
        { pathNum === -1 && <BackdoToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
        { pathNum === 1 && <DoToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
        { pathNum === 2 && <GeToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
        { pathNum === 3 && <GulToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
        { pathNum === 4 && <YootToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
        { pathNum === 5 && <MoToken position={position} scale={0.8} rotation={[0, Math.PI/2, 0]}/>}
      </>
    }

    return <>
      <Move position={shiftPosition({tile})}/>
    </>
  }

  function Pointer({ position, rotation, scale, team }) {
    const pointer = useRef()
    useFrame((state) => {
      const time = state.clock.elapsedTime
      if (pointer.current) {
        pointer.current.rotation.y = time
      }
    })
    return <group position={position} rotation={rotation} scale={scale}>
      <mesh ref={pointer}>
        <coneGeometry args={[1, 1, 3]}/>
        <meshStandardMaterial color={ team === 0 ? 'red' : 'turquoise' }/>
      </mesh>
    </group>
  }

  return <group position={position} rotation={rotation} scale={scale}>
    <group ref={group}>
      <animated.group scale={wrapperScale}>
        <mesh
          name='wrapper'
          onPointerEnter={(e) => { interactive && handlePointerEnter(e) }}
          onPointerLeave={(e) => { interactive && handlePointerLeave(e) }}
          onPointerDown={(e) => { interactive && handlePointerDown(e) }}
          ref={wrapper}
        >
          <sphereGeometry args={[0.8, 32, 16]} />
          <meshStandardMaterial
            transparent
            opacity={0}
            ref={wrapperMat}
            depthWrite={false}
          />
        </mesh>
      </animated.group>
      {mesh}
      {/* path num */}
      { pathNum && <PathNumHelper pathNum={pathNum}/> }
      { (pathNum || hasMovablePiece) && <Pointer 
      team={turn.team} 
      position={[0, 2, -0.3]}
      rotation={[Math.PI/2, 0, 0]}
      scale={[0.2, 0.4, 0.2]}/> }
    </group>
  </group>
}