import { Text3D } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three';

export default function DiscordButton({ rotation, position }) {

  const discordTextMaterialRef = useRef()
  const discordBoxMaterialRef = useRef()
  function handleDiscordPointerEnter(e) {
    e.stopPropagation()
    discordTextMaterialRef.current.color = new THREE.Color('green')
    discordBoxMaterialRef.current.color = new THREE.Color('green')
    document.body.style.cursor = "pointer";
  }
  function handleDiscordPointerLeave(e) {
    e.stopPropagation()
    discordTextMaterialRef.current.color = new THREE.Color('yellow')
    discordBoxMaterialRef.current.color = new THREE.Color('yellow')
    document.body.style.cursor = "default";
  }
  async function handleDiscordPointerUp(e) {
    e.stopPropagation()
    
    // open discord link
    window.open('https://discord.gg/2nTCGhYG', "_blank", "noreferrer");

    const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
      eventName: 'buttonClick',
      timestamp: new Date(),
      payload: {
        'button': 'restartGame'
      }
    })
    console.log('[RestartGame][RocketsWin] post log response', response)
  }

  return <group name='discord-button' rotation={rotation} position={position}>
    <mesh>
      <boxGeometry args={[3.2, 1, 0.01]}/>
      <meshStandardMaterial ref={discordBoxMaterialRef} color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={[3.1, 0.9, 0.02]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh
      name='discord-button-wrapper'
      onPointerEnter={(e) => handleDiscordPointerEnter(e)}
      onPointerLeave={(e) => handleDiscordPointerLeave(e)}
      onPointerUp={(e) => handleDiscordPointerUp(e)}
    >
      <boxGeometry args={[3.2, 1.0, 0.02]}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[0, 0, 0]}
      size={0.5}
      height={0.03} 
      position={[-1.3, -0.25, 0]} // camera is shifted up (y-axis)
    >
      DISCORD
      <meshStandardMaterial ref={discordTextMaterialRef} color='yellow'/>
    </Text3D>
  </group>
}