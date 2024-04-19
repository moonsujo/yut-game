// js
import React, { useRef, useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import layout from "./layout.js";

// meshes
import Yoots from "./Yoots.jsx";
import Star from "./meshes/Star.jsx";
import Neptune from "./meshes/Neptune.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import Moon from "./meshes/Moon.jsx";

// custom components
import Chatbox from "./Chatbox.jsx";
import Rulebook2 from "./Rulebook2.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import Piece from "./components/Piece.jsx";

// three js
import { Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Html,
  Text3D,
  OrthographicCamera,
  OrbitControls,
  Text,
  PresentationControls
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Stars from './particles/Stars'
// import { Perf } from 'r3f-perf'


// server
import JoinTeamModal from "./JoinTeamModal.jsx";
import { getCurrentPlayerSocketId } from "./helpers/helpers.js";
import UfosWin from "./UfosWin.jsx";
import RocketsWin from "./RocketsWin.jsx";
import Celebration from "./particles/MeteorsBackup.jsx";
import { Perf } from "r3f-perf";
import CurvedArrow from "./meshes/CurvedArrow.jsx";
import LetsPlayButton from "./LetsPlayButton.jsx";
import Meteors from "./particles/MeteorsBackup.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
import BoomText from "./BoomText.jsx";
import Game from "./Game.jsx";
import mediaValues from "./mediaValues";
import { disconnectAtom, gamePhaseAtom } from "./GlobalState.jsx";

export default function Experience() {

  const [disconnect] = useAtom(disconnectAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)

  return <group>
    {/* add game */}
    { (gamePhase === "lobby" || gamePhase === "pregame" || gamePhase === "game") && <>
      <Game/>
      <Stars count={7000} size={5}/>
      <MilkyWay 
        rotation={[-Math.PI/2, 0, -35.0]} 
        position={[0, -3, 0]} 
        scale={5}
        brightness={0.5}
        colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
        colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
        colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
      />
    </> }
  </group>
}