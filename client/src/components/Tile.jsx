import { useRef } from "react";
import { useAtom } from "jotai";
import { socket } from "../SocketManager";
import React from "react";
import { useFrame } from "@react-three/fiber";
import { animationPlayingAtom, clientAtom, gamePhaseAtom, hasTurnAtom, selectionAtom, teamsAtom, tilesAtom, turnAtom, yootThrownAtom } from "../GlobalState";
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

export default function Tile({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  tile=null,
  mesh,
  legalTileInfo, // If key is not in the object, it's undefined
  pathNum,
  interactive=false
}) {

  const [selection] = useAtom(selectionAtom);
  const [hasTurn] = useAtom(hasTurnAtom)
  const [tiles] = useAtom(tilesAtom)
  const [teams] = useAtom(teamsAtom)
  const [client] = useAtom(clientAtom)
  const [turn] = useAtom(turnAtom)
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [animationPlaying] = useAtom(animationPlayingAtom)
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
    if (gamePhase === "game" && hasTurn && !animationPlaying) {
      if (selection === null) {
        if (pieces.length > 0 && pieces[0].team === team) {
          let history = tiles[tile][0].history
          let legalTiles = getLegalTiles(tile, teams[team].moves, teams[team].pieces, history)
          if (!(Object.keys(legalTiles).length === 0)) {
            socket.emit("select", { roomId: params.id, selection: { tile, pieces }, legalTiles })
          }
        }
      } else if (selection.tile !== tile && legalTileInfo) {
        // Server clears legalTiles and selection
        // When they're called separately, the order of operation is not kept
        socket.emit("move", { roomId: params.id, tile });
      } else {
        socket.emit("select", { roomId: params.id, selection: null, legalTiles: {} });

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
      wrapper.current.scale.x = Math.cos(time) * 0.1 + 1.1;
      wrapper.current.scale.y = Math.cos(time) * 0.1 + 1.1;
      wrapper.current.scale.z = Math.cos(time) * 0.1 + 1.1;
    } else if (selection != null && legalTileInfo) {
      if (turn.team === 0) {
        wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.02 + 0.03, 0.8, 0.5);
      } else {
        wrapperMat.current.color.setHSL(Math.cos(time * 3) * 0.06 + 0.55, 1, 0.3);
      }
      wrapperMat.current.opacity = 0.3;
      wrapper.current.scale.x = Math.cos(time) * 0.1 + 1.1;
      wrapper.current.scale.y = Math.cos(time) * 0.1 + 1.1;
      wrapper.current.scale.z = Math.cos(time) * 0.1 + 1.1;
    } else {
      wrapperMat.current.opacity = 0;
    }
  })

  function PathNumHelper({pathNum}) {
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
      <Move position={[1,2.3,0]}/>
    </>
  }

  return <group position={position} rotation={rotation} scale={scale}>
    <group ref={group}>
      <animated.mesh
        name='wrapper'
        onPointerEnter={(e) => { interactive && handlePointerEnter(e) }}
        onPointerLeave={(e) => { interactive && handlePointerLeave(e) }}
        onPointerDown={(e) => { interactive && handlePointerDown(e) }}
        ref={wrapper}
        scale={wrapperScale}
      >
        <sphereGeometry args={[0.8, 32, 16]} />
        <meshStandardMaterial
          transparent
          opacity={0}
          ref={wrapperMat}
          depthWrite={false}
        />
      </animated.mesh>
      {mesh}
      {/* path num */}
      { pathNum && <PathNumHelper pathNum={pathNum}/> }
    </group>
  </group>
}