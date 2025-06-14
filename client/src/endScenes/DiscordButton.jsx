import { Image, Text3D } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three';
import layout from "../layout";
import DiscordLogo from "../meshes/DiscordLogo";
import axios from "axios";

export default function DiscordButton({ rotation, position, device='landscapeDesktop' }) {

  // in mobile, stretch it out
  // don't display room id

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

  return <group name='discord-button' position={position} rotation={rotation}>
    <mesh>
      <boxGeometry args={layout[device].endSceneActionButtons.discordButton.outerBox.args}/>
      <meshStandardMaterial ref={discordBoxMaterialRef} color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={layout[device].endSceneActionButtons.discordButton.innerBox.args}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh
      name='discord-button-wrapper'
      onPointerEnter={(e) => handleDiscordPointerEnter(e)}
      onPointerLeave={(e) => handleDiscordPointerLeave(e)}
      onPointerUp={(e) => handleDiscordPointerUp(e)}
    >
      <boxGeometry args={layout[device].endSceneActionButtons.discordButton.wrapper.args}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={layout[device].endSceneActionButtons.discordButton.text.fontSize}
      height={0.03} 
      position={layout[device].endSceneActionButtons.discordButton.text.position}
    >
      DISCORD
      <meshStandardMaterial ref={discordTextMaterialRef} color='yellow'/>
    </Text3D>
    <DiscordLogo 
    position={layout[device].endSceneActionButtons.discordButton.logo.position} 
    scale={layout[device].endSceneActionButtons.discordButton.logo.scale} 
    color='#545FD2'/>
  </group>
}