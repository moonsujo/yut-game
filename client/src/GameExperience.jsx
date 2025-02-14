import Game from "./Game"
import StarsPatterns2Shader from "./shader/starsPatterns2/StarsPatterns2Shader"
import MilkyWay from "./shader/MilkyWay"
import Alert from "./Alert"
import * as THREE from 'three';

export default function GameExperience() {
  return <>
    <Game/>
    <Alert position={[0,2,0.5]} rotation={[0,0,0]}/>
  </>
}