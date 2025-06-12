import { Text3D, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three'
import { animated, useSpring } from "@react-spring/three"
import { copyURLToClipboard } from "../helpers/helpers"
import axios from 'axios'
import layout from "../layout"

export default function ShareLinkButton({ rotation, position, device='landscapeDesktop' }) {

  const shareLinkTextMaterialRef = useRef()
  const shareLinkBoxMaterialRef = useRef()
  function handleShareLinkPointerEnter(e) {
    e.stopPropagation()
    shareLinkTextMaterialRef.current.color = new THREE.Color('green')
    shareLinkBoxMaterialRef.current.color = new THREE.Color('green')
    document.body.style.cursor = "pointer";
  }
  function handleShareLinkPointerLeave(e) {
    e.stopPropagation()
    shareLinkTextMaterialRef.current.color = new THREE.Color('yellow')
    shareLinkBoxMaterialRef.current.color = new THREE.Color('yellow')
    document.body.style.cursor = "default";
  }
  const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
  const [springs, apiCopyLink] = useSpring(() => ({        
    from: {
      opacity: 0, 
    }
  }))
  async function handleShareLinkPointerUp(e) {
    e.stopPropagation()
    copyURLToClipboard()
    apiCopyLink.start({
      from: {
        opacity: 1
      },
      to: [
        {
          opacity: 1
        },
        { 
          opacity: 0,
          delay: 500,
          config: {
            tension: 170,
            friction: 26
          }
        }
      ]
    })

    const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
      eventName: 'buttonClick',
      timestamp: new Date(),
      payload: {
        'button': 'shareLink'
      }
    })
    console.log('[RocketsWin] post log response', response)
  }

  return <group name='share-link-button' rotation={rotation} position={position}>
    <mesh>
      <boxGeometry args={layout[device].endSceneActionButtons.shareLinkButton.outerBox.args}/>
      <meshStandardMaterial ref={shareLinkBoxMaterialRef} color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={layout[device].endSceneActionButtons.shareLinkButton.innerBox.args}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh
      name='share-link-button-wrapper'
      onPointerEnter={(e) => handleShareLinkPointerEnter(e)}
      onPointerLeave={(e) => handleShareLinkPointerLeave(e)}
      onPointerUp={(e) => handleShareLinkPointerUp(e)}
    >
      <boxGeometry args={layout[device].endSceneActionButtons.shareLinkButton.wrapper.args}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={layout[device].endSceneActionButtons.shareLinkButton.text.fontSize}
      height={0.03} 
      position={layout[device].endSceneActionButtons.shareLinkButton.text.position}
    >
      SHARE LINK
      <meshStandardMaterial ref={shareLinkTextMaterialRef} color='yellow'/>
    </Text3D>
    <Text3D 
      name='copied-tooltip'
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].endSceneActionButtons.shareLinkButton.copiedText.position}
      size={layout[device].endSceneActionButtons.shareLinkButton.copiedText.fontSize}
      height={0.01}
    >
      copied!
      <AnimatedMeshDistortMaterial
        speed={5}
        distort={0}
        color='limegreen'
        transparent
        opacity={springs.opacity}
      />
    </Text3D>
  </group>
}