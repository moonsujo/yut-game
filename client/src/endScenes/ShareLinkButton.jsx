import { Text3D, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from 'three'
import { animated, useSpring } from "@react-spring/three"
import { copyURLToClipboard } from "../helpers/helpers"
import axios from 'axios'

export default function ShareLinkButton({ rotation, position }) {

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
      <boxGeometry args={[4.2, 1.0, 0.01]}/>
      <meshStandardMaterial ref={shareLinkBoxMaterialRef} color='yellow'/>
    </mesh>
    <mesh>
      <boxGeometry args={[4.1, 0.9, 0.02]}/>
      <meshStandardMaterial color='black'/>
    </mesh>
    <mesh
      name='share-link-button-wrapper'
      onPointerEnter={(e) => handleShareLinkPointerEnter(e)}
      onPointerLeave={(e) => handleShareLinkPointerLeave(e)}
      onPointerUp={(e) => handleShareLinkPointerUp(e)}
    >
      <boxGeometry args={[4.2, 1.0, 0.02]}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[0, 0, 0]}
      size={0.5}
      height={0.03} 
      position={[-1.8, -0.25, 0]} // camera is shifted up (y-axis)
    >
      SHARE LINK
      <meshStandardMaterial ref={shareLinkTextMaterialRef} color='yellow'/>
    </Text3D>
    <Text3D 
      name='copied-tooltip'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-4.3,0,-0.4]}
      rotation={[0, 0, 0]}
      size={0.4}
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