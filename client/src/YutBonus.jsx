import YootMesh from "./meshes/YootMesh"
import { Float, Text3D } from "@react-three/drei"
import YootRhino from "./meshes/YootRhino"
import SparkleYutShader from "./shader/sparkleYut/SparkleYutShader"
import { useSpring, animated } from "@react-spring/three"
import { useEffect, useState } from "react"
import YootMeshUnrotated from "./meshes/YutMeshUnrotated"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { clientAtom, hasTurnAtom, pauseGameAtom, showBonusAtom, throwCountAtom, turnAtom, yootAnimationPlayingAtom } from "./GlobalState"
import { useAnimationPlaying } from "./hooks/useAnimationPlaying"
import { socket } from "./SocketManager"
import { useParams } from "wouter"

export default function YutBonus({ position, scale }) {
  
  const [showBonus, setShowBonus] = useAtom(showBonusAtom)
  const animationPlaying = useAnimationPlaying()
  const params = useParams()

  const { yutBonusScale } = useSpring({
    yutBonusScale: (showBonus && !animationPlaying) ? 0.9 : 0,
  })

  const yutSprings = useSpring({
    from: {
      yut0Position: [0, 0.2, 0],
      yut0Rotation: [0, 0, 0],
      // yut0Rotation: quaternion0,
      yut1Position: [0.4, 0, -0.2],
      yut1Rotation: [Math.PI/2+Math.PI/16, Math.PI/2+Math.PI/8, Math.PI/16],
      yut2Position: [0.8, 0.2, -0.1],
      yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/8, Math.PI/16],
      yut3Position: [1.1, -0.3, -0.1],
      yut3Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/4, Math.PI/8],
    },
    to: [
      {
        yut0Position: [0.1, 0, 0],
        yut0Rotation: [0, 0, -Math.PI/4],
        // yut0Rotation: quaternion1,
        yut1Position: [0.5, 0, -0.3],
        yut1Rotation: [Math.PI/2+Math.PI/8, Math.PI/2+Math.PI/8,  Math.PI/16],
        yut2Position: [0.6, 0.3, 0],
        yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI * 5 / 6, 0],
        yut3Position: [0.7, -0.2, -0.15],
        yut3Rotation: [Math.PI/2+Math.PI/16, Math.PI/2-Math.PI/12, Math.PI/8],
      },
      // Return to 0 (first position)
      {
        yut0Position: [0, 0.2, 0],
        yut0Rotation: [0, 0, 0],
        // yut0Rotation: quaternion0,
        yut1Position: [0.4, 0, -0.2],
        yut1Rotation: [Math.PI/2+Math.PI/16, Math.PI/2+Math.PI/8, Math.PI/16],
        yut2Position: [0.8, 0.2, -0.1],
        yut2Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/8, Math.PI/16],
        yut3Position: [1.1, -0.3, -0.1],
        yut3Rotation: [Math.PI/2+Math.PI/8, Math.PI/2-Math.PI/4, Math.PI/8],
      },
    ],
    loop: true,
    reset: true // Need this to loop
  })

  function Label() {
    
    const [hover, setHover] = useState(false)
    function handlePointerEnter(e) {
      e.stopPropagation()
      setHover(true)
      document.body.style.cursor = 'pointer'
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setHover(false)
      document.body.style.cursor = 'default'
    }
    function handlePointerUp(e) {
      e.stopPropagation()
      document.body.style.cursor = 'default'
      if (showBonus) {
        socket.emit('throwYut', { roomId: params.id.toUpperCase() })
        setShowBonus(false)
      }

      const audio = new Audio('sounds/effects/yut-bonus.mp3');
      audio.volume = 1;
      audio.play();
    }

    return <group>
      <group name='label' position={[0.55, 0.5, 0.8]}> 
        <mesh scale={[0.9, 0.01, 0.3]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ hover ? 'green' : '#EE9E26' }/>
        </mesh>
        <mesh scale={[0.85, 0.02, 0.25]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.5, 0.025, 0.13]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.24}
          height={0.01}
        >
          BONUS
          <meshStandardMaterial color={ hover ? 'green' : '#EE9E26' }/>
        </Text3D>
      </group>
      <mesh 
        position={[0.5, 0, 0]} 
        onPointerEnter={e=>handlePointerEnter(e)} 
        onPointerLeave={e=>handlePointerLeave(e)} 
        onPointerUp={e=>handlePointerUp(e)}
      >
        <sphereGeometry args={[1, 32, 16]}/>
        <meshStandardMaterial color='white' transparent opacity={0}/>
      </mesh>
    </group>
  }

  return <animated.group name='yut-bonus-animation-wrapper' scale={yutBonusScale} position={position}>
    <Float rotationIntensity={0.2} speed={7} floatIntensity={3} floatingRange={[-0.1, 0.1]}>
      <group name='yut-bonus' scale={scale}>
        <YootMeshUnrotated scale={0.2} position={yutSprings.yut0Position} rotation={yutSprings.yut0Rotation}/>
        <YootMesh scale={0.2} position={yutSprings.yut1Position} rotation={yutSprings.yut1Rotation}/>
        <YootMesh scale={0.2} position={yutSprings.yut2Position} rotation={yutSprings.yut2Rotation}/>
        <YootRhino scale={0.2} position={yutSprings.yut3Position} rotation={yutSprings.yut3Rotation}/>
        <SparkleYutShader texturePath={'./textures/particles/8.png'}/>
        <Label/>
      </group>
    </Float>
  </animated.group>
}