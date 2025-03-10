import { animated, useSpring } from '@react-spring/three'
import { Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export default function FinishMarkerSelectable() {
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
    }, 200)
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
    }, 400)
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
    }, 600)
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
    }, 800)
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
    }, 1000)
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
    }, 1200)
  }, [])

  const finishTextRef = useRef()
  let time = 0
  useFrame((state, delta) => {
    time += delta
    finishTextRef.current.scale.x = 1 + Math.sin(time*3) * 0.05
    finishTextRef.current.scale.y = 1 + Math.sin(time*3) * 0.05
    finishTextRef.current.scale.z = 1 + Math.sin(time*3) * 0.05
  })
  
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
  </group>
}