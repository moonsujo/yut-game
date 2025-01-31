import GameCamera from "./GameCamera";
import Lobby from "./Lobby";
import Moon from "./meshes/Moon";
import MilkyWay from "./shader/MilkyWay";
import * as THREE from 'three';
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader";

// just to separate shader from stopping when Lobby re-renders
export default function LobbyExperience() {
  return <group>
    <Lobby/>
  </group>
}