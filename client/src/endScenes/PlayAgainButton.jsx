import { Text3D } from "@react-three/drei"
import { useAtomValue } from "jotai";
import { useRef } from "react"
import * as THREE from 'three';
import { useParams } from "wouter";
import { clientAtom } from "../GlobalState";
import { socket } from "../SocketManager";
import axios from "axios";

export default function PlayAgainButton({ rotation, position }) {
  
  const playAgainTextMaterialRef = useRef()
  const playAgainBoxMaterialRef = useRef()
  function handlePlayAgainPointerEnter(e) {
    e.stopPropagation()
    playAgainTextMaterialRef.current.color = new THREE.Color('green')
    playAgainBoxMaterialRef.current.color = new THREE.Color('green')
    document.body.style.cursor = "pointer";
  }
  function handlePlayAgainPointerLeave(e) {
    e.stopPropagation()
    playAgainTextMaterialRef.current.color = new THREE.Color('yellow')
    playAgainBoxMaterialRef.current.color = new THREE.Color('yellow')
    document.body.style.cursor = "default";
  }
  const params = useParams();
  const client = useAtomValue(clientAtom)
  async function handlePlayAgainPointerUp(e) {
    e.stopPropagation()

    socket.emit('reset', { roomId: params.id.toUpperCase(), clientId: client._id })
    const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
      eventName: 'buttonClick',
      timestamp: new Date(),
      payload: {
        'button': 'restartGame'
      }
    })
    console.log('[RestartGame][RocketsWin] post log response', response)
  }

  return <group name='run-it-back-button' rotation={rotation} position={position}>
    <mesh>
      <boxGeometry args={[4.2, 1.0, 0.01]}/>
      <meshStandardMaterial ref={playAgainBoxMaterialRef} color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={[4.1, 0.9, 0.02]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh
      name='play-again-button-wrapper'
      onPointerEnter={(e) => handlePlayAgainPointerEnter(e)}
      onPointerLeave={(e) => handlePlayAgainPointerLeave(e)}
      onPointerUp={(e) => handlePlayAgainPointerUp(e)}
    >
      <boxGeometry args={[4.2, 1.0, 0.02]}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={0.5}
      height={0.03} 
      position={[-1.85, -0.25, 0]} // camera is shifted up (y-axis)
    >
      PLAY AGAIN
      <meshStandardMaterial ref={playAgainTextMaterialRef} color='yellow' />
    </Text3D>
  </group>
}