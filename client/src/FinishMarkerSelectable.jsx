import { animated, useSpring } from '@react-spring/three'
import { Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { clientAtom, hasTurnAtom, pauseGameAtom, showFinishMovesAtom } from './GlobalState'
import { useAtomValue } from 'jotai'
import { MeshStandardMaterial } from 'three'
import { socket } from './SocketManager'
import { useParams } from 'wouter'

// legalTileInfo: moves to finish with
export default function FinishMarkerSelectable({ legalTileInfo, selection }) {

  const showFinishMoves = useAtomValue(showFinishMovesAtom)
  const hasTurn = useAtomValue(hasTurnAtom)
  const paused = useAtomValue(pauseGameAtom)
  const client = useAtomValue(clientAtom)
  const params = useParams()
  // #region springs
  const frictionWobbly = 15
  const startDelay = 100
  const life = 500
  const [finishDotSpring0, finishDotSpring0Api] = useSpring(() => ({
    from: {
      scale: 1
    }
  }))
  const [finishDotSpring1, finishDotSpring1Api] = useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  const [finishDotSpring2, finishDotSpring2Api] =  useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  const [finishDotSpring3, finishDotSpring3Api] =  useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  const [finishDotSpring4, finishDotSpring4Api] =  useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  const [finishDotSpring5, finishDotSpring5Api] =  useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  const [arrowSpring, arrowSpringApi] =  useSpring(() => ({
    from: {
      scale: 1
    },
  }))
  // #endregion

  useEffect(() => {
    finishDotSpring0Api.start({
      from: {
        scale: 1,
      },
      to: [
        {
          scale: 1.5,
          config: {
            tension: 180,
            friction: frictionWobbly
          },
        },
        {
          scale: 1,
          config: {
            tension: 170,
            friction: 26,
          },
        }
      ],
      loop: true,
    })
    setTimeout(() => {
      finishDotSpring1Api.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true,
      })
    }, 100)
    setTimeout(() => {
      finishDotSpring2Api.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true,
      })
    }, 200)
    setTimeout(() => {
      finishDotSpring3Api.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true
      })
    }, 300)
    setTimeout(() => {
      finishDotSpring4Api.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true
      })
    }, 400)
    setTimeout(() => {
      finishDotSpring5Api.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true
      })
    }, 500)
    setTimeout(() => {
      arrowSpringApi.start({
        from: {
          scale: 1
        },
        to: [
          {
            scale: 1.5,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
          },
          {
            scale: 1,
            config: {
              tension: 170,
              friction: 26
            },
          }
        ],
        loop: true
      })
    }, 600)
  }, [])

  const finishTextRef = useRef()
  let time = 0
  useFrame((state, delta) => {
    time += delta
    if (legalTileInfo.length > 0 && !showFinishMoves) {
      finishTextRef.current.scale.x = 1 + Math.sin(time*3) * 0.05
      finishTextRef.current.scale.y = 1 + Math.sin(time*3) * 0.05
      finishTextRef.current.scale.z = 1 + Math.sin(time*3) * 0.05
    }
  })

  function MoveToken({moveInfo, position}) {

    const [hover, setHover] = useState(false);
    const primaryMaterial = new MeshStandardMaterial({ color: 'limegreen' })
    // console.log(primaryMaterial.color.r) // 0.03190
    // console.log(primaryMaterial.color.g) // 0.6105

    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (!hover) {
        // primaryMaterial.color.g = 0.3105 + Math.cos(time * 5) * 0.3 + 0.1
        primaryMaterial.color.setHSL(Math.cos(time * 5) * 0.25 + 0.3, Math.cos(time * 5) * 0.06 + 1, Math.cos(time * 5) * 0.06 + 0.3);
      } else {
        primaryMaterial.color.r = 0.7
        primaryMaterial.color.g = 1
        primaryMaterial.color.b = 1
      }
    })

    function scorePointerEnter(event) {
      event.stopPropagation();
      if (hasTurn) {
        document.body.style.cursor = "pointer";
        setHover(true)
      }
    }
  
    function scorePointerOut(event) {
      event.stopPropagation();
      if (hasTurn) {
        document.body.style.cursor = "default";
        setHover(false)
      }
    }

    return <group position={position} scale={0.6}>
      <mesh rotation={[0, 0, 0]} material={primaryMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 0.1]}/>
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.11]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <Text3D 
      font="/fonts/Luckiest Guy_Regular.json" 
      height={0.01} 
      size={0.5} 
      position={[-0.17, 0.05, 0.23]}
      rotation={[-Math.PI/2, 0, 0]}
      material={primaryMaterial}>
        {`${moveInfo.move}`}
      </Text3D>
      <mesh 
        name='wrapper' 
        position={[0,0,0]} 
        rotation={[0, 0, 0]}
        onPointerEnter={scorePointerEnter}
        onPointerLeave={scorePointerOut}
        onPointerDown={() => {
          if (hasTurn && !paused) {
            socket.emit('score', { roomId: params.id.toUpperCase(), selectedMove: moveInfo, playerName: client.name });
            setHover(false)
          }
        }}
      >
        <cylinderGeometry args={[0.5, 0.5, 0.15]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
    </group> 
  }

  function MultipleMoveButtonSet({ position, scale, moves }) {
    return <group 
      position={position}
      scale={scale}
    >
      { moves.map((value, index) => ( // must use parentheses instead of brackets
        <MoveToken
          moveInfo={value} 
          position={[
            0.4 + index * 0.65, 
            0, 
            0
          ]} 
          key={index}
        />
      ))}
    </group>
  }
  
  const finishMarkerRadius = 3.5
  return <group name='finish-marker-selectable'>
    <group name='dots-selectable'>
      <animated.mesh name='dots-selectable-0'
        position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (24/32))+0.19, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (24/32)), 
        ]}
        scale={finishDotSpring0.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='dots-selectable-1'
        position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (25/32))+0.17, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (25/32))-0.04, 
        ]}
        scale={finishDotSpring1.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='dots-selectable-2' 
        position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (26/32))+0.13, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (26/32))-0.05, 
        ]}
        scale={finishDotSpring2.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='dots-selectable-3' position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (27/32))+0.08, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (27/32))-0.02, 
        ]}
        scale={finishDotSpring3.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='dots-selectable-4' position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (28/32))+0.02, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (28/32))+0.03, 
        ]}
        scale={finishDotSpring4.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='dots-selectable-5' position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (29/32))-0.05, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (29/32))+0.1, 
        ]}
        scale={finishDotSpring5.scale}>
        <sphereGeometry args={[0.04, 32, 16]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
      <animated.mesh name='arrow' rotation={[0, Math.PI * 2 * 4/32, 0]}
        position={[
        finishMarkerRadius * Math.cos(Math.PI * 1 + Math.PI/2 * (30/32))-0.1, 
        0, 
        -finishMarkerRadius * Math.sin(Math.PI * 1 + Math.PI/2 * (30/32))+0.2, 
        ]}
        scale={arrowSpring.scale}>
        <cylinderGeometry args={[0, 0.1, 0.01, 3]}/>
        <meshStandardMaterial color='limegreen'/>
      </animated.mesh>
    </group>
    <Text3D name='text-selectable'
      font="/fonts/Luckiest Guy_Regular.json"
      position={[-1.6,0,4.1]}
      rotation={[-Math.PI/2, 0, 0]}
      size={0.25}
      height={0.01}
      ref={finishTextRef}
    >
      FINISH
      <meshStandardMaterial color='limegreen'/>
    </Text3D>
    { legalTileInfo.length > 1 && showFinishMoves && <group>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[0.7,0,3.6]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
        lineHeight={0.8}
      >
        {`SELECT A MOVE`}
        <meshStandardMaterial color='limegreen'/>
      </Text3D> 
      <MultipleMoveButtonSet moves={legalTileInfo} position={[0.6, 0, 4.0]}/>
    </group> }
  </group>
}