import { Float, MeshDistortMaterial, Text3D, useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import YootButtonModel from './meshes/YootButtonModel';
import { useFrame, useLoader } from '@react-three/fiber';
import Cursor from './meshes/Cursor';
import Mars from './meshes/Mars';
import Star from './meshes/Star';
import layout from './layout';
import Rocket from './meshes/Rocket';
import Pointer from './meshes/Pointer';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';
import Ufo from './meshes/Ufo';
import YootSet from './meshes/YootSet';
import GulToken from './moveTokens/GulToken';
import GeToken from './moveTokens/GeToken';
import Board from './Board';
import YootDisplay from './YootDisplay';
import { useFireworksShader } from './shader/fireworks/FireworksShader';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useShootingStarShader } from './shader/shootingStar/ShootingStarShader';
import YootNew from './YootNew';

export default function HowToPlay({ 
  device, 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1,
  closeButton=false,
  setShowRulebook=null,
  tabOrientation='bottom'
}) {
  
  const [page, setPage] = useState(0)

  const [pageTimeout, setPageTimeout] = useState(null)
  useEffect(() => {
    clearTimeout(pageTimeout)
    if (page === 0) { // Overview
      const page1Timeout = setTimeout(() => {
        setPage(1)
      }, 23000)
      setPageTimeout(page1Timeout)
    } else if (page === 1) { // Throw the dice
      const page2Timeout = setTimeout(() => {
        setPage(2)
      }, 10700)
      setPageTimeout(page2Timeout)
    } else if (page === 2) { // Catch enemies
      const page3Timeout = setTimeout(() => {
        setPage(3)
      }, 8500)
      setPageTimeout(page3Timeout)
    } else if (page === 3) { // Piggyback
      const page4Timeout = setTimeout(() => {
        setPage(4)
      }, 5700)
      setPageTimeout(page4Timeout)
    } else if (page === 4) { // Score
      const page5Timeout = setTimeout(() => {
        setPage(5)
      }, 9000)
      setPageTimeout(page5Timeout)
    } else if (page === 5) { // Read the Yut
      const page6Timeout = setTimeout(() => {
        setPage(6)
      }, 11500)
      setPageTimeout(page6Timeout)
    } else if (page === 6) { // Shortcut
      const page7Timeout = setTimeout(() => {
        setPage(0)
      }, 12000)
      setPageTimeout(page7Timeout)
    }
  }, [page])
  
  function ThrowTheYutPage() {

    const [yootButtonTurnedOn, setYootButtonTurnedOn] = useState(true)
    const [animation, setAnimation] = useState(null)
    const [yutPosition, setYutPosition] = useState(layout[device].howToPlay.throwingTheDicePage.yut.initialYutPosition)
    const [yutRotation, setYutRotation] = useState(layout[device].howToPlay.throwingTheDicePage.yut.initialYutRotation)

    useEffect(() => {
      const animationTimeout = setTimeout(() => {
        setYootButtonTurnedOn(false)
        setYutPosition(layout[device].howToPlay.throwingTheDicePage.yut.animationYutPosition)
        setYutRotation(layout[device].howToPlay.throwingTheDicePage.yut.animationYutRotation)
        setAnimation(17)
      }, 2000)

      return () => {
        clearTimeout(animationTimeout)
      }
    }, [])

    const springsText = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 1.2,
          config: {
            tension: 180,
            friction: 15
          },
          delay: 6500
        }
      ],
    })

    const yutNewGroup = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime
      if (!animation) {
        yutNewGroup.current.position.y = Math.sin(time * 2) * 0.8 + 0.2
        yutNewGroup.current.rotation.y = Math.sin(time * 2) * 0.03
      } else {
        yutNewGroup.current.position.y = 0
        yutNewGroup.current.rotation.y = 0
      }
    })

    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
    const springsSide0 = useSpring({
      from: {
        // opacity: 1
        opacity: 1,
        scale: 0
      },
      to: [
        {
          // opacity: 1,
          scale: 1,
          config: {
            tension: 180,
            friction: 15
          },
          delay: 5000
        }
      ],
    })
    const springsSide1 = useSpring({
      from: {
        // opacity: 1
        opacity: 1,
        scale: 0
      },
      to: [
        {
          // opacity: 1,
          scale: 1,
          config: {
            tension: 180,
            friction: 15
          },
          delay: 5500
        }
      ],
    })
    const springsSide2 = useSpring({
      from: {
        // opacity: 1
        opacity: 1,
        scale: 0
      },
      to: [
        {
          // opacity: 1,
          scale: 1,
          config: {
            tension: 180,
            friction: 15
          },
          delay: 6000
        }
      ],
    })

    return <group name='throw-the-yut-page' scale={layout[device].howToPlay.throwingTheDicePage.scale}>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.throwingTheDicePage.text.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.text.rotation}
        size={layout[device].howToPlay.throwingTheDicePage.text.size}
        height={layout[device].howToPlay.throwingTheDicePage.text.height}
      >
        {`THROW THE YUT TO DETERMINE HOW MANY\nSTARS TO JUMP. EACH FLAT SIDE IS ONE STAR.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      <animated.group
        position={layout[device].howToPlay.throwingTheDicePage.moveText.position}
        scale={springsText.scale}
      >
        <Text3D
          rotation={[-Math.PI/2,0,0]}
          font="fonts/Luckiest Guy_Regular.json" 
          size={layout[device].howToPlay.throwingTheDicePage.moveText.size} 
          height={0.01}
        >
          {layout[device].howToPlay.throwingTheDicePage.moveText.text}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GulToken 
          scale={layout[device].howToPlay.throwingTheDicePage.gulToken.scale} 
          position={layout[device].howToPlay.throwingTheDicePage.gulToken.position} 
          rotation={layout[device].howToPlay.throwingTheDicePage.gulToken.rotation}
        />
      </animated.group>
      <group ref={yutNewGroup}>
        <YootNew animation={animation} scale={0.4} position={yutPosition} rotation={yutRotation}/>
      </group>
      <animated.group name='side-0-highlight' position={[-0.3, 0.6, -0.8]} scale={springsSide0.scale}>
        <mesh scale={[1.1, 0.01, 0.3]} rotation={[0, -Math.PI/128, -Math.PI/32]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <AnimatedMeshDistortMaterial distort={0.1} color='limegreen' transparent opacity={springsSide0.opacity}/>
        </mesh>
      </animated.group>
      <animated.group name='side-1-highlight' position={[5.6, 0.6, -1.2]} scale={springsSide1.scale}>
        <mesh scale={[1.1, 0.01, 0.3]} rotation={[0, Math.PI/4 - Math.PI/32 - Math.PI/64, -Math.PI/32]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <AnimatedMeshDistortMaterial distort={0.1} color='limegreen' transparent opacity={springsSide1.opacity}/>
        </mesh>
      </animated.group>
      <animated.group name='side-2-highlight' position={[3.9, 0.6, 1.1]} scale={springsSide2.scale}>
        <mesh scale={[1.1, 0.01, 0.3]} rotation={[0, -Math.PI/8 + Math.PI/16, -Math.PI/32]}>
          <cylinderGeometry args={[1, 1, 1]}/>
          <AnimatedMeshDistortMaterial distort={0.1} color='limegreen' transparent opacity={springsSide2.opacity}/>
        </mesh>
      </animated.group>
      <YootButtonModel
        position={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.yootButtonModel.rotation}
        turnedOn={yootButtonTurnedOn}
      />
      <Cursor
        position={layout[device].howToPlay.throwingTheDicePage.cursor.position}
        rotation={layout[device].howToPlay.throwingTheDicePage.cursor.rotation}
        scale={layout[device].howToPlay.throwingTheDicePage.cursor.scale}
      />
    </group>
  }

  function ScorePage() {

    const [CreateFirework] = useFireworksShader();
    const fireworkTextures = [
      useLoader(TextureLoader, 'textures/particles/3.png'),
      useLoader(TextureLoader, 'textures/particles/5.png'),
      useLoader(TextureLoader, 'textures/particles/6.png'),
      useLoader(TextureLoader, 'textures/particles/8.png'),
    ]

    useEffect(() => {
      // When 'welcome home!' displays
      const fireworkTimeout0 = setTimeout(() => {
        // firework 1 - left
        const count = Math.round(500 + Math.random() * 400);
        let position, size, radius
        if (device === 'portrait') {
          position = new THREE.Vector3(3,2,-6)
          size = 0.08 + Math.random() * 0.1
          radius = 0.9 + Math.random() * 0.1
        } else {
          position = new THREE.Vector3(2,2,-4)
          size = 0.25 + Math.random() * 0.1
          radius = 0.6 + Math.random() * 0.1
        }

        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const color = new THREE.Color();
        const hue = 140/360
        color.setHSL(hue, 1, 0.6)
        
        CreateFirework({ count, position, size, texture, radius, color });
      }, 4500) 
      const fireworkTimeout1 = setTimeout(() => {
        // firework 1 - left
        const count = Math.round(500 + Math.random() * 400);
        let position, size, radius
        if (device === 'portrait') {
          position = new THREE.Vector3(1,2,-5.5)
          size = 0.08 + Math.random() * 0.1
          radius = 0.9 + Math.random() * 0.1
        } else {
          position = new THREE.Vector3(2.5,2,-3)
          size = 0.25 + Math.random() * 0.1
          radius = 0.6 + Math.random() * 0.1
        }

        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const color = new THREE.Color();
        const hue = 140/360
        color.setHSL(hue, 1, 0.6)
        
        CreateFirework({ count, position, size, texture, radius, color });
      }, 4700) // When 'welcome home!' displays
      const fireworkTimeout2 = setTimeout(() => {
        // firework 1 - left
        const count = Math.round(500 + Math.random() * 400);
        let position, size, radius
        if (device === 'portrait') {
          position = new THREE.Vector3(-0.5,2,-5.1)
          size = 0.08 + Math.random() * 0.1
          radius = 0.9 + Math.random() * 0.1
        } else {
          position = new THREE.Vector3(1,2,-3)
          size = 0.25 + Math.random() * 0.1
          radius = 0.6 + Math.random() * 0.1
        }

        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const color = new THREE.Color();
        const hue = 140/360
        color.setHSL(hue, 1, 0.6)
        
        CreateFirework({ count, position, size, texture, radius, color });
      }, 4900) // When 'welcome home!' displays
      const fireworkTimeout3 = setTimeout(() => {
        // firework 1 - left
        const count = Math.round(500 + Math.random() * 400);
        let position, size, radius
        if (device === 'portrait') {
          position = new THREE.Vector3(-2,2,-4.6)
          size = 0.08 + Math.random() * 0.1
          radius = 0.9 + Math.random() * 0.1
        } else {
          position = new THREE.Vector3(-0.5,2,-2.3)
          size = 0.25 + Math.random() * 0.1
          radius = 0.6 + Math.random() * 0.1
        }

        const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
        const color = new THREE.Color();
        const hue = 140/360
        color.setHSL(hue, 1, 0.6)
        
        CreateFirework({ count, position, size, texture, radius, color });
      }, 5100) // When 'welcome home!' displays
      return () => {
        clearTimeout(fireworkTimeout0)
        clearTimeout(fireworkTimeout1)
        clearTimeout(fireworkTimeout2)
        clearTimeout(fireworkTimeout3)
      }
    }, [])
    const TILE_RADIUS = 5
    const homeTokenShift = [-5, 0, 0]
    const springs = useSpring({
      from: {
        piggybackTokenPosition: [
          -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
          1.5,
          Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
        ],
        movingTokenPosition: [
          -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
          1.5,
          Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
        ],
        movingTokenScale: 1.4,
        piggybackTokenScale: 1.4,
        welcomeHomeAlertScale: 0,
        scoredIndicator0Scale: 0,
        scoredIndicator1Scale: 0,
      },
      to: [
        {
          movingTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          welcomeHomeAlertScale: 1
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5 + homeTokenShift[0],
            1.5 + homeTokenShift[1],
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 + homeTokenShift[2],
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5 + homeTokenShift[0],
            1.5 + homeTokenShift[1],
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 + homeTokenShift[2],
          ],
          movingTokenScale: 0,
          piggybackTokenScale: 0,
          welcomeHomeAlertScale: 0,
          delay: 2200
        },
        {
          scoredIndicator0Scale: 0.4,
          scoredIndicator1Scale: 0.4,
        }
      ],
      config: {
        tension: 170,
        friction: 26
      }
    })

    function WelcomeHomeAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.3
      const width = 2.4
      const starScale = 0.12
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.8}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.45,0,-0.1]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}
        lineHeight={0.8}>
          {`WELCOME\n    HOME!`}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    return <group name='score-page'>
      <group 
      name='board'
      position={layout[device].howToPlay.scoringPage.board.position}
      scale={layout[device].howToPlay.scoringPage.board.scale}>
        <Board
        constellations={false}
        omit
        showTiles={[0, 15, 16, 17, 18, 19, 29]}
        showArrows={false}
        />
        {/* Piggyback token */}
        <animated.group scale={springs.piggybackTokenScale} position={springs.piggybackTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
        {/* Moving token */}
        <animated.group scale={springs.movingTokenScale} position={springs.movingTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
      </group>
      <group name='rocket-home' 
      position={layout[device].howToPlay.scoringPage.rocketHome.position} 
      scale={layout[device].howToPlay.scoringPage.rocketHome.scale}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='red' transparent opacity={0.1}/>
        </mesh>
        <Rocket position={[-0.6,0,-0.5]}/>
        <Rocket position={[0.4,0,-0.5]}/>
        {/* Moving token */}
        {/* Add hologram Rocket */}
        <animated.group name='scored-indicator-0' position={[-0.5, 0, 0.5]} scale={springs.scoredIndicator0Scale}>
          <Star color='red'/>
        </animated.group>
        <animated.group name='scored-indicator-1' position={[0.5, 0, 0.5]} scale={springs.scoredIndicator1Scale}>
          <Star color='red'/>
        </animated.group>
      </group>
      <WelcomeHomeAlert position={[4.8,1,-1]} scale={springs.welcomeHomeAlertScale}/>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.scoringPage.text.position}
        rotation={layout[device].howToPlay.scoringPage.text.rotation}
        size={layout[device].howToPlay.scoringPage.text.size}
        height={layout[device].howToPlay.scoringPage.text.height}
        lineHeight={layout[device].howToPlay.scoringPage.text.lineHeight}
      >
        {`SCORE THE TOKEN BY BRINGING IT TO THE\nFINISH STAR. IT HAS TO PASS EARTH.`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function CatchEnemiesPage() {
    const springs = useSpring({
      from: {
        rocketScale: 1.5,
        legalTileScale: 0.4,
        pointerOpacity: 0,
        rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[0],
        ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[0],
        ufoScale: 1.5,
        moveTextScale: 1,
        bonusAlertScale: 0,
        yootButtonScale: 0,
        moveTokenScale: 1,
        moveToken1Scale: 0,
        catchTokenHomeScale: 0
      },
      to: [
        {
          moveToken1Scale: 1,
          rocketScale: 2.1,
          pointerOpacity: 1,
          ufoScale: 2,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocketPos: layout[device].howToPlay.catchingPiecesPage.rocketPos[3],
          moveTokenScale: 0,
          moveToken1Scale: 0,
          legalTileScale: 0.4,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          ufoPos: layout[device].howToPlay.catchingPiecesPage.ufoPos[1],
          ufoScale: 0,
          config: {
            tension: 100,
            friction: 26
          }
        },
        {
          catchTokenHomeScale: 1,
          moveTextScale: 0,
          bonusAlertScale: 1,
          yootButtonScale: layout[device].howToPlay.catchingPiecesPage.yootButtonModel.scale,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position, scale }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = 0; i < 4; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 3) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star
                tile={i}
                scale={springs.legalTileScale}
                device={device}
              />
              <Pointer color='red' position={layout[device].howToPlay.catchingPiecesPage.pointer.position} scale={2} opacity={springs.pointerOpacity}/>
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              tile={i}
              key={i}
              scale={layout[device].howToPlay.star.scale}
              device={device}
            />
          )
        }
      }
  
      return <animated.group position={position} scale={scale}>
        { tiles }
        <animated.group name='rocket' position={springs.rocketPos} scale={springs.rocketScale} >
          <Rocket onBoard/>
        </animated.group>
        <animated.group name='ufo' position={springs.ufoPos} scale={springs.ufoScale} >
          <Ufo onBoard/>
        </animated.group>
          <GulToken position={[5,0,4]} rotation={[0, Math.PI/2, 0]} scale={springs.moveToken1Scale}/>
      </animated.group>;
    }

    function BonusAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.3
      const width = 1.9
      const starScale = 0.1
      const starColor = 'limegreen'
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.1,0,-0.15]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}
        lineHeight={0.8}>
          {`BONUS\n TURN!`}
          <meshStandardMaterial color={starColor}/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color={starColor}
          />
        </group>
      </animated.group>
    }

    // ufo is flipped over, moved to a corner and scaled to 0. show sparkle
    return <group name='catch-enemies-page'>
      <FirstCornerTiles 
      position={layout[device].howToPlay.catchingPiecesPage.firstCornerTiles.position} 
      scale={layout[device].howToPlay.catchingPiecesPage.firstCornerTiles.scale}/>
      <group name='ufo-home' 
      position={layout[device].howToPlay.catchingPiecesPage.ufoHome.position} 
      scale={layout[device].howToPlay.catchingPiecesPage.ufoHome.scale}>
        <mesh name='base' position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='turquoise' transparent opacity={0.05}/>
        </mesh>
        <Ufo position={[-0.5,0,-0.4]}/>
        <Ufo position={[0.5,0,-0.4]}/>
        <Ufo position={[-0.5,0,0.4]}/>
        <animated.group scale={springs.catchTokenHomeScale}>
          <Ufo position={[0.5,0,0.4]}/>
        </animated.group>
      </group>
      <YootButtonModel 
      scale={springs.yootButtonScale} 
      rotation={[Math.PI/16, Math.PI/2, 0]} 
      position={layout[device].howToPlay.catchingPiecesPage.yootButtonModel.position} 
      turnedOn={true}/>
      <BonusAlert 
      position={layout[device].howToPlay.catchingPiecesPage.bonusAlert.position} 
      scale={springs.bonusAlertScale}/>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.catchingPiecesPage.text.position}
        rotation={layout[device].howToPlay.catchingPiecesPage.text.rotation}
        size={layout[device].howToPlay.catchingPiecesPage.text.size}
        height={layout[device].howToPlay.catchingPiecesPage.text.height}
        lineHeight={layout[device].howToPlay.catchingPiecesPage.text.lineHeight}
      >
        {`KICK ENEMIES BACK HOME BY LANDING ON\nTHEIR STAR. YOU GET A BONUS THROW TOO!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  function PiggybackPage() {    
    const springs = useSpring({
      from: {
        rocket0Scale: 1.2,
        rocket1Scale: 1.2,
        legalTile0Scale: 0.4,
        legalTile1Scale: 0.4,
        pointer0Opacity: 0,
        pointer1Opacity: 0,
        rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[0],
        rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[0],
        moveText0Scale: 1,
        moveText1Scale: 0,
        yootButtonScale: 0,
        moveTokenScale: 0,
        moveToken1Scale: 0,
        gulTokenScale: 1,
        geTokenScale: 1
      },
      to: [
        {
          rocket0Scale: 1.6,
          rocket1Scale: 1.6,
          legalTile0Scale: 0.6,
          pointer0Opacity: 1,
          moveTokenScale: 1,
        },
        {
          delay: 200,
          config: {
            tension: 0,
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[1],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[2],
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[3],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[1],
          legalTile0Scale: 0.4,
          gulTokenScale: 0,
          moveTokenScale: 0,
          moveToken1Scale: 1,
          legalTile1Scale: 0.7,
          pointer1Opacity: 1,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[4],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[2],
          delay: 200,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          rocket0Pos: layout[device].howToPlay.combiningPiecesPage.rocket0Pos[5],
          rocket1Pos: layout[device].howToPlay.combiningPiecesPage.rocket1Pos[3],
          moveToken1Scale: 0,
          legalTile1Scale: 0.4,
          geTokenScale: 0,
          config: {
            tension: 170,
            friction: 26
          }
        },
        {
          delay: 5000,
        },
      ],
      loop: true,
      delay: 500
    })

    function FirstCornerTiles({ position, scale }) {
      let tiles = [];

      //circle
      const NUM_STARS = 20
      const TILE_RADIUS = 5;
      for (let i = -1; i < 5; i++) {
        let position = [
          -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
          0,
          Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        ];
        if (i === 2) {
          tiles.push(
            <group 
              position={position}
              key={i}
            >
              <Star scale={springs.legalTile0Scale}/>
            </group>
          )
        } else if (i === 4) {
          tiles.push(
            <group
              position={position}
              key={i}
            >
              <Mars
                scale={springs.legalTile1Scale}
              />
            </group>
          )
        } else {            
          tiles.push(
            <Star
              position={position}
              scale={layout[device].howToPlay.star.scale}
              key={i}
            />
          )
        }
      }
  
      return <group position={position} scale={scale}>
        { tiles }
        <animated.group name='rocket-0' position={springs.rocket0Pos} scale={springs.rocket0Scale} >
          <Rocket onBoard/>
        </animated.group>
        <animated.group name='rocket-1' position={springs.rocket1Pos} scale={springs.rocket1Scale} >
          <Rocket onBoard/>
        </animated.group>
        <animated.group>
          <GulToken scale={springs.moveTokenScale} position={[4,0,5]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
        <animated.group >
          <GeToken scale={springs.moveToken1Scale} position={[6,0,0]} rotation={[0, Math.PI/2, 0]}/>
        </animated.group>
      </group>;
    }

    return <group>
      <FirstCornerTiles 
      position={layout[device].howToPlay.combiningPiecesPage.firstCornerTiles.position}
      scale={1.3}/>
      <animated.group>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText0.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText0.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText0.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText0.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText0.lineHeight}
        >
          {`JUMPS:`}
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken0.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken0.rotation}
          scale={springs.geTokenScale}
        />
        <GulToken 
          position={layout[device].howToPlay.combiningPiecesPage.gulToken.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.gulToken.rotation}
          scale={springs.gulTokenScale}
        />
      </animated.group>
      <animated.group scale={springs.moveText1Scale}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json" 
          position={layout[device].howToPlay.combiningPiecesPage.moveText1.position}
          rotation={layout[device].howToPlay.combiningPiecesPage.moveText1.rotation}
          size={layout[device].howToPlay.combiningPiecesPage.moveText1.size} 
          height={layout[device].howToPlay.combiningPiecesPage.moveText1.height}
          lineHeight={layout[device].howToPlay.combiningPiecesPage.moveText1.lineHeight}
        >
          MOVES:
          <meshStandardMaterial color={ "limegreen" }/>
        </Text3D>
        <GeToken 
          position={layout[device].howToPlay.combiningPiecesPage.geToken1.position} 
          rotation={layout[device].howToPlay.combiningPiecesPage.geToken1.rotation}
        />
      </animated.group>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].howToPlay.combiningPiecesPage.text.position}
        rotation={layout[device].howToPlay.combiningPiecesPage.text.rotation}
        size={layout[device].howToPlay.combiningPiecesPage.text.size}
        height={layout[device].howToPlay.combiningPiecesPage.text.height}
        lineHeight={layout[device].howToPlay.combiningPiecesPage.text.lineHeight}
      >
        {'LAND ON YOUR OWN TOKEN TO PIGGYBACK\nTHEM. THEY WILL MOVE TOGETHER ON THEIR\nNEXT JUMP.'}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }
  
  function ShortcutPage() {
    // #region Springs
    const arrowFriction = 10
    const arrowTension = 180
    const arrowDelay = 100
    const springsArrow0 = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 1.5,
          config: {
            tension: arrowTension,
            friction: arrowFriction
          },
          delay: arrowDelay
        }
      ],
    })
    const springsArrow1 = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 1.5,
          config: {
            tension: arrowTension,
            friction: arrowFriction
          },
          delay: arrowDelay + 100
        }
      ],
    })
    const springsArrow2 = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 1.5,
          config: {
            tension: arrowTension,
            friction: arrowFriction
          },
          delay: arrowDelay + 200
        }
      ],
    })
    const springsArrow3 = useSpring({
      from: {
        scale: 0
      },
      to: [
        {
          scale: 1.5,
          config: {
            tension: arrowTension,
            friction: arrowFriction
          },
          delay: arrowDelay + 300
        }
      ],
    })
    const life = 500
    const startDelay = 600
    const numDotSpringsMiddle = 19
    const dotSpringsMiddle = []
    const frictionWobbly = 15
    for (let i = 0; i < numDotSpringsMiddle; i++) {
      dotSpringsMiddle.push(useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: 0.1,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
            delay: startDelay + i * 100
          },
          {
            scale: 0,
            config: {
              tension: 170,
              friction: 26
            },
            delay: life
          }
        ],
      }))
    }
    const dotSpringsCorner = []
    const numDotSpringsCorner = 16
    for (let i = 0; i < numDotSpringsCorner; i++) {
      dotSpringsCorner.push(useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: 0.1,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
            delay: startDelay + 100 * numDotSpringsMiddle + i * 100
          },
          {
            scale: 0,
            config: {
              tension: 170,
              friction: 26
            },
            delay: life
          }
        ],
      }))
    }
    const dotSpringsVertical = []
    const numDotSpringsVertical = 25
    for (let i = 0; i < numDotSpringsVertical; i++) {
      dotSpringsVertical.push(useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: 0.1,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
            delay: startDelay + 100 * numDotSpringsMiddle + 100 * numDotSpringsCorner + i * 100
          },
          {
            scale: 0,
            config: {
              tension: 170,
              friction: 26
            },
            delay: life
          }
        ],
      }))
    }
    const dotSpringsMiddleHalf = []
    const numDotSpringsMiddleHalf = 7
    for (let i = 0; i < numDotSpringsMiddleHalf; i++) {
      dotSpringsMiddleHalf.push(useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: 0.1,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
            delay: startDelay + 100 * numDotSpringsMiddle + 100 * numDotSpringsCorner + 100 * numDotSpringsVertical + i * 100
          },
          {
            scale: 0,
            config: {
              tension: 170,
              friction: 26
            },
            delay: life
          }
        ],
      }))
    }
    const dotSpringsVerticalHalf = []
    const numDotSpringsVerticalHalf = 10
    for (let i = 0; i < numDotSpringsVerticalHalf; i++) {
      dotSpringsVerticalHalf.push(useSpring({
        from: {
          scale: 0
        },
        to: [
          {
            scale: 0.1,
            config: {
              tension: 180,
              friction: frictionWobbly
            },
            // Extra 100 to highlight moving from the Moon
            delay: startDelay + 100 * numDotSpringsMiddle + 100 * numDotSpringsCorner + 100 * numDotSpringsVertical + 100 * numDotSpringsMiddleHalf + i * 100 + 300
          },
          {
            scale: 0,
            config: {
              tension: 170,
              friction: 26
            },
            delay: life
          }
        ],
      }))
    }
    // #endregion

    return <group name='shortcut-page'>
      <animated.group name='text'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.shortcutsPage.text.position} 
          rotation={layout[device].howToPlay.shortcutsPage.text.rotation}
          size={layout[device].howToPlay.shortcutsPage.text.size}
          height={layout[device].howToPlay.shortcutsPage.text.height}
          lineHeight={layout[device].howToPlay.shortcutsPage.text.lineHeight}
        >
          {`TAKE A SHORTCUT BY STARTING A JUMP\nFROM A PLANET. YOU CANNOT BEND IN\nTHE MIDDLE OF A JUMP.`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <group 
      position={layout[device].howToPlay.shortcutsPage.board.position} 
      scale={layout[device].howToPlay.shortcutsPage.board.scale}>
        <Board showArrows={false} starColor='#44442B' highlightShortcuts/>
        <group name='mars-left' position={[-0.4, 0.5, 0.2]}>
          <animated.mesh scale={springsArrow0.scale} position={[4, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <coneGeometry args={[0.15, 0.4, 32]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        </group>
        {dotSpringsMiddle.map((value, index) => {
          return <animated.mesh scale={value.scale} position={[3 - 0.4*index, 0.5, 0.2]}>
            <sphereGeometry args={[1, 32, 16]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        })}
        {dotSpringsCorner.map((value, index) => {
          return <animated.mesh scale={value.scale} position={[5 * Math.cos(Math.PI + ((index) / dotSpringsCorner.length) * (Math.PI/2 - Math.PI/32)), 0.5, 0.2 - 5 * Math.sin(Math.PI + ((index) / dotSpringsCorner.length) * (Math.PI/2 - Math.PI/32))]}>
            <sphereGeometry args={[1, 32, 16]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        })}
        {dotSpringsVertical.map((value, index) => {
          return <animated.mesh scale={value.scale} position={[0, 0.5, -4.5 + 0.4*index]}>
            <sphereGeometry args={[1, 32, 16]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        })}
        {dotSpringsMiddleHalf.map((value, index) => {
          return <animated.mesh scale={value.scale} position={[3.5 - 0.4*index, 0.5, 0.2]}>
            <sphereGeometry args={[1, 32, 16]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        })}
        {dotSpringsVerticalHalf.map((value, index) => {
          return <animated.mesh scale={value.scale} position={[0, 0.5, 0.7 + 0.4*index]}>
            <sphereGeometry args={[1, 32, 16]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        })}
        <group name='moon-left' position={[-5.45, 0.5, 0.2]}>
          <animated.mesh scale={springsArrow1.scale} position={[4, 0, 0]} rotation={[Math.PI/2, 0, Math.PI/2]}>
            <coneGeometry args={[0.15, 0.4, 32]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        </group>
        <group name='saturn-bottom' position={[-4, 0.5, -3.3]}>
          <animated.mesh scale={springsArrow2.scale} position={[4, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.15, 0.4, 32]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        </group>
        <group name='moon-bottom' position={[-4, 0.5, 1.8]}>
          <animated.mesh scale={springsArrow3.scale} position={[4, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.15, 0.4, 32]}/>
            <meshBasicMaterial color='#ffff33'/>
          </animated.mesh>
        </group>
      </group>
    </group>
  }

  function ReadTheYutPage() {
    return <group>
      <animated.group name='text'>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.text.position}
          rotation={layout[device].howToPlay.readingTheDicePage.text.rotation}
          size={layout[device].howToPlay.readingTheDicePage.text.size}
          height={layout[device].howToPlay.readingTheDicePage.text.height}
        >
          {'EACH FLAT SIDE IS 1 STAR. IF YOU THROW A\nYUT OR MO, YOU GET ANOTHER TURN!'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </animated.group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.do.position} 
      scale={layout[device].howToPlay.readingTheDicePage.do.scale}>     
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line0.height}
        >
          {'DO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.do.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.do.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.do.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.do.text.line1.height}
        >
          {'1 STAR'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="do" 
          scale={layout[device].howToPlay.readingTheDicePage.do.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.do.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.ge.position} 
      scale={layout[device].howToPlay.readingTheDicePage.ge.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line0.height}
        >
          {'GE'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.ge.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.ge.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.ge.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.ge.text.line1.height}
        >
          {'2 STARS'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="ge" 
          scale={layout[device].howToPlay.readingTheDicePage.ge.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.ge.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.gul.position} 
      scale={layout[device].howToPlay.readingTheDicePage.gul.scale}>        
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line0.height}
        >
          {'GUL'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.gul.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.gul.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.gul.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.gul.text.line1.height}
        >
          {'3 STARS'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="gul" 
        scale={layout[device].howToPlay.readingTheDicePage.gul.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.gul.yootSet.position}/>
        </Float>
      </group>
      <group
      position={layout[device].howToPlay.readingTheDicePage.yoot.position} 
      scale={layout[device].howToPlay.readingTheDicePage.yoot.scale}>            
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line0.height}
        >
          {'YUT'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line1.height}
        >
          {'4 STARS'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.yoot.text.line2.height}
        >
          {'BONUS TURN'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>   
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="yoot" 
          scale={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.yoot.yootSet.position}/>
        </Float>
      </group>
      <group       
      position={layout[device].howToPlay.readingTheDicePage.mo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.mo.scale}>   
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line0.height}
        >
          {'MO'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line1.height}
        >
          {'5 STARS'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.mo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.mo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.mo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.mo.text.line2.height}
        >
          {'BONUS TURN'}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>      
        <Float rotationIntensity={0.1}>
        <YootSet 
        points="mo" 
        scale={layout[device].howToPlay.readingTheDicePage.mo.yootSet.scale} 
        position={layout[device].howToPlay.readingTheDicePage.mo.yootSet.position}/>
        </Float>
      </group>
      <group 
      position={layout[device].howToPlay.readingTheDicePage.backdo.position} 
      scale={layout[device].howToPlay.readingTheDicePage.backdo.scale}>       
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line0.height}
        >
          {'backdo'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>         
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line1.height}
        >
          {'-1 STAR'}
          <meshStandardMaterial color='yellow'/>
        </Text3D>      
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.position}
          rotation={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.rotation}
          size={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.size}
          height={layout[device].howToPlay.readingTheDicePage.backdo.text.line2.height}
        >
          {'BACKWARD'}
          <meshStandardMaterial color='red'/>
        </Text3D>
        <Float rotationIntensity={0.1}>
          <YootSet 
          points="backdo" 
          scale={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.scale} 
          position={layout[device].howToPlay.readingTheDicePage.backdo.yootSet.position}/>
        </Float>
      </group>
    </group>
  }

  function Tabs({ position=[0,0,0], scale=1, orientation='bottom' }) {
    const [overviewHover, setOverviewHover] = useState(false)
    const [throwTheYutHover, setThrowTheYutHover] = useState(false)
    const [catchEnemiesHover, setCatchEnemiesHover] = useState(false)
    const [piggybackHover, setPiggybackHover] = useState(false)
    const [scoreHover, setScoreHover] = useState(false)
    const [readTheDiceHover, setReadTheDiceHover] = useState(false)
    const [shortcutHover, setShortcutHover] = useState(false)

    function handleOverviewClick() {
      setPage(0)
    }
    function handleOverviewPointerEnter() {
      setOverviewHover(true)
    }
    function handleOverviewPointerLeave() {
      setOverviewHover(false)
    }
    function handleThrowTheYutClick() {
      setPage(1)
    }
    function handleThrowTheYutPointerEnter() {
      setThrowTheYutHover(true)
    }
    function handleThrowTheYutPointerLeave() {
      setThrowTheYutHover(false)
    }
    function handleCatchEnemiesClick() {
      setPage(2)
    }
    function handleCatchEnemiesPointerEnter() {
      setCatchEnemiesHover(true)
    }
    function handleCatchEnemiesPointerLeave() {
      setCatchEnemiesHover(false)
    }
    function handlePiggybackClick() {
      setPage(3)
    }
    function handlePiggybackPointerEnter() {
      setPiggybackHover(true)
    }
    function handlePiggybackPointerLeave() {
      setPiggybackHover(false)
    }
    function handleScoreClick() {
      setPage(4)
    }
    function handleScorePointerEnter() {
      setScoreHover(true)
    }
    function handleScorePointerLeave() {
      setScoreHover(false)
    }
    function handleReadTheDiceClick() {
      setPage(5)
    }
    function handleReadTheDicePointerEnter() {
      setReadTheDiceHover(true)
    }
    function handleReadTheDicePointerLeave() {
      setReadTheDiceHover(false)
    }
    function handleShortcutClick() {
      setPage(6)
    }
    function handleShortcutPointerEnter() {
      setShortcutHover(true)
    }
    function handleShortcutPointerLeave() {
      setShortcutHover(false)
    }

    if (orientation === 'bottom') {
      return <group name='tabs' position={position} scale={scale}>
        <group name='tab-0' position={[0,0,0]} scale={0.8}>
          <mesh position={[1.55, -0.1, -0.2]}>
            <boxGeometry args={[3.4, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.55, -0.1, -0.2]}>
            <boxGeometry args={[3.5, 0.04, 0.85]}/>
            <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-0-wrapper' 
            position={[1.55, -0.1, -0.2]}
            onClick={handleOverviewClick}
            onPointerEnter={handleOverviewPointerEnter}
            onPointerLeave={handleOverviewPointerLeave}
          >
            <boxGeometry args={[3.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            1. OVERVIEW
            <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-1' position={[2.9,0,0]} scale={0.8}>
          <mesh position={[2.3, -0.1, -0.2]}>
            <boxGeometry args={[4.9, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.3, -0.1, -0.2]}>
            <boxGeometry args={[5, 0.04, 0.85]}/>
            <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-1-wrapper' 
            position={[2.3, -0.1, -0.2]}
            onClick={handleThrowTheYutClick}
            onPointerEnter={handleThrowTheYutPointerEnter}
            onPointerLeave={handleThrowTheYutPointerLeave}
          >
            <boxGeometry args={[5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            2. THROW THE YUT
            <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-2' position={[7,0,0]} scale={0.8}>
          <mesh position={[2.15, -0.1, -0.2]}>
            <boxGeometry args={[4.6, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.15, -0.1, -0.2]}>
            <boxGeometry args={[4.7, 0.04, 0.85]}/>
            <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-2-wrapper' 
            position={[2.15, -0.1, -0.2]}
            onClick={handleCatchEnemiesClick}
            onPointerEnter={handleCatchEnemiesPointerEnter}
            onPointerLeave={handleCatchEnemiesPointerLeave}
          >
            <boxGeometry args={[4.7, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            3. CATCH ENEMIES
            <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-3' position={[0,0,0.8]} scale={0.8}>
          <mesh position={[1.75, -0.1, -0.2]}>
            <boxGeometry args={[3.8, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.75, -0.1, -0.2]}>
            <boxGeometry args={[3.9, 0.04, 0.85]}/>
            <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-3-wrapper' 
            position={[1.7, -0.1, -0.2]}
            onClick={handlePiggybackClick}
            onPointerEnter={handlePiggybackPointerEnter}
            onPointerLeave={handlePiggybackPointerLeave}
          >
            <boxGeometry args={[3.8, 0.1, 0.7]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            4. PIGGYBACK
            <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-4' position={[3.2,0,0.8]} scale={0.8}>
          <mesh position={[1.1, -0.1, -0.2]}>
            <boxGeometry args={[2.45, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.1, -0.1, -0.2]}>
            <boxGeometry args={[2.55, 0.04, 0.85]}/>
            <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-4-wrapper' 
            position={[1.1, -0.1, -0.2]} 
            onClick={handleScoreClick}
            onPointerEnter={handleScorePointerEnter}
            onPointerLeave={handleScorePointerLeave}
          >
            <boxGeometry args={[2.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            5. SCORE
            <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-5' position={[5.35,0,0.8]} scale={0.8}>
          <mesh position={[2.05, -0.1, -0.2]}>
            <boxGeometry args={[4.4, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.05, -0.1, -0.2]}>
            <boxGeometry args={[4.5, 0.04, 0.85]}/>
            <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-5-wrapper' 
            position={[2.05, -0.1, -0.2]}
            onClick={handleReadTheDiceClick}
            onPointerEnter={handleReadTheDicePointerEnter}
            onPointerLeave={handleReadTheDicePointerLeave}
          >
            <boxGeometry args={[4.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            6. READ THE YUT
            <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-6' position={[0,0,1.6]} scale={0.8}>
          <mesh position={[1.6, -0.1, -0.2]}>
            <boxGeometry args={[3.5, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.6, -0.1, -0.2]}>
            <boxGeometry args={[3.6, 0.04, 0.85]}/>
            <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-6-wrapper' 
            position={[1.6, -0.1, -0.2]}
            onClick={handleShortcutClick}
            onPointerEnter={handleShortcutPointerEnter}
            onPointerLeave={handleShortcutPointerLeave}
          >
            <boxGeometry args={[3.6, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            7. SHORTCUT
            <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
      </group>
    } else {
      return <group name='tabs' position={position} scale={scale}>
        <group name='tab-0' position={[0,0,0]} scale={0.8}>
          <mesh position={[1.55, -0.1, -0.2]}>
            <boxGeometry args={[3.4, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.55, -0.1, -0.2]}>
            <boxGeometry args={[3.5, 0.04, 0.85]}/>
            <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-0-wrapper' 
            position={[1.55, -0.1, -0.2]}
            onClick={handleOverviewClick}
            onPointerEnter={handleOverviewPointerEnter}
            onPointerLeave={handleOverviewPointerLeave}
          >
            <boxGeometry args={[3.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            1. OVERVIEW
            <meshStandardMaterial color={overviewHover || page === 0 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-1' position={[0,0,0.8]} scale={0.8}>
          <mesh position={[2.3, -0.1, -0.2]}>
            <boxGeometry args={[4.9, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.3, -0.1, -0.2]}>
            <boxGeometry args={[5, 0.04, 0.85]}/>
            <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-1-wrapper' 
            position={[2.3, -0.1, -0.2]}
            onClick={handleThrowTheYutClick}
            onPointerEnter={handleThrowTheYutPointerEnter}
            onPointerLeave={handleThrowTheYutPointerLeave}
          >
            <boxGeometry args={[5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            2. THROW THE YUT
            <meshStandardMaterial color={throwTheYutHover || page === 1 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-2' position={[0,0,1.6]} scale={0.8}>
          <mesh position={[2.15, -0.1, -0.2]}>
            <boxGeometry args={[4.6, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.15, -0.1, -0.2]}>
            <boxGeometry args={[4.7, 0.04, 0.85]}/>
            <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-2-wrapper' 
            position={[2.15, -0.1, -0.2]}
            onClick={handleCatchEnemiesClick}
            onPointerEnter={handleCatchEnemiesPointerEnter}
            onPointerLeave={handleCatchEnemiesPointerLeave}
          >
            <boxGeometry args={[4.7, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            3. CATCH ENEMIES
            <meshStandardMaterial color={catchEnemiesHover || page === 2 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-3' position={[0,0,2.4]} scale={0.8}>
          <mesh position={[1.75, -0.1, -0.2]}>
            <boxGeometry args={[3.8, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.75, -0.1, -0.2]}>
            <boxGeometry args={[3.9, 0.04, 0.85]}/>
            <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-3-wrapper' 
            position={[1.7, -0.1, -0.2]}
            onClick={handlePiggybackClick}
            onPointerEnter={handlePiggybackPointerEnter}
            onPointerLeave={handlePiggybackPointerLeave}
          >
            <boxGeometry args={[3.8, 0.1, 0.7]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            4. PIGGYBACK
            <meshStandardMaterial color={piggybackHover || page === 3 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-4' position={[0,0,3.2]} scale={0.8}>
          <mesh position={[1.1, -0.1, -0.2]}>
            <boxGeometry args={[2.45, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.1, -0.1, -0.2]}>
            <boxGeometry args={[2.55, 0.04, 0.85]}/>
            <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-4-wrapper' 
            position={[1.1, -0.1, -0.2]} 
            onClick={handleScoreClick}
            onPointerEnter={handleScorePointerEnter}
            onPointerLeave={handleScorePointerLeave}
          >
            <boxGeometry args={[2.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            5. SCORE
            <meshStandardMaterial color={scoreHover || page === 4 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-5' position={[0,0,4]} scale={0.8}>
          <mesh position={[2.05, -0.1, -0.2]}>
            <boxGeometry args={[4.4, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[2.05, -0.1, -0.2]}>
            <boxGeometry args={[4.5, 0.04, 0.85]}/>
            <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-5-wrapper' 
            position={[2.05, -0.1, -0.2]}
            onClick={handleReadTheDiceClick}
            onPointerEnter={handleReadTheDicePointerEnter}
            onPointerLeave={handleReadTheDicePointerLeave}
          >
            <boxGeometry args={[4.5, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            6. READ THE YUT
            <meshStandardMaterial color={readTheDiceHover || page === 5 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
        <group name='tab-6' position={[0,0,4.8]} scale={0.8}>
          <mesh position={[1.6, -0.1, -0.2]}>
            <boxGeometry args={[3.5, 0.05, 0.75]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh position={[1.6, -0.1, -0.2]}>
            <boxGeometry args={[3.6, 0.04, 0.85]}/>
            <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
          </mesh>
          <mesh 
            name='tab-6-wrapper' 
            position={[1.6, -0.1, -0.2]}
            onClick={handleShortcutClick}
            onPointerEnter={handleShortcutPointerEnter}
            onPointerLeave={handleShortcutPointerLeave}
          >
            <boxGeometry args={[3.6, 0.1, 0.85]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
          >
            7. SHORTCUT
            <meshStandardMaterial color={shortcutHover || page === 6 ? 'green' : 'yellow'}/>
          </Text3D>
        </group>
      </group>
    }
  }

  function Pagination({ position, scale }) {

    function handlePageLeft() {
      setPage(page => {
        if (page === 0) {
          return 6
        } else {
          return page-1
        }
      })
    }

    function handlePageRight() {
      setPage(page => {
        if (page === 6) {
          return 0
        } else {
          return page+1
        }
      })
    }
    
    function handlePage0() {
      setPage(0)
    }
    function handlePage1() {
      setPage(1)
    }
    function handlePage2() {
      setPage(2)
    }
    function handlePage3() {
      setPage(3)
    }
    function handlePage4() {
      setPage(4)
    }
    function handlePage5() {
      setPage(5)
    }
    function handlePage6() {
      setPage(6)
    }

    const space = layout[device].howToPlay.pagination.elementSpace
    const startX = layout[device].howToPlay.pagination.startX
    return <group name='pagination' position={position} scale={scale}>
      <mesh position={[startX, 0, 6]} rotation={[0, 0, Math.PI/2]} onPointerUp={handlePageLeft}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, layout[device].howToPlay.pagination.arrowHeight, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
      <mesh position={[startX + space*1, 0, 6]} onPointerUp={handlePage0}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 0 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*2, 0, 6]} onPointerUp={handlePage1}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 1 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*3, 0, 6]} onPointerUp={handlePage2}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 2 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*4, 0, 6]} onPointerUp={handlePage3}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 3 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*5, 0, 6]} onPointerUp={handlePage4}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 4 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*6, 0, 6]} onPointerUp={handlePage5}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 5 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*7, 0, 6]} onPointerUp={handlePage6}>
        <sphereGeometry args={[layout[device].howToPlay.pagination.pageRadius, 32, 16]}/>
        <meshStandardMaterial color={ page === 6 ? "green" : "yellow" }/>
      </mesh>
      <mesh position={[startX + space*8, 0, 6]} rotation={[0, 0, -Math.PI/2]} onPointerUp={handlePageRight}>
        <coneGeometry args={[layout[device].howToPlay.pagination.arrowRadius, layout[device].howToPlay.pagination.arrowHeight, 3]}/>
        <meshStandardMaterial color="yellow"/>
      </mesh>
    </group>
  }

  function CloseButton({position, scale}) {
    const rulebookCloseButtonWrapper = useRef();
    const [rulebookCloseButtonHover, setRulebookCloseButtonHover] = useState(false);
    function handleRulebookCloseButtonPointerEnter() {
      setRulebookCloseButtonHover(true)
    }
    function handleRulebookCloseButtonPointerLeave() {
      setRulebookCloseButtonHover(false)
    }
    function handleRulebookCloseButtonPointerClick() {
      setShowRulebook(false)
    }

    return <group 
      name='rulebook-close-button' 
      position={position}
      scale={scale}
    >
      <mesh rotation={[Math.PI/2, 0, Math.PI/4]}>
        <capsuleGeometry args={[0.06, 0.35, 4, 32]}/>
        <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
      </mesh>
      <mesh rotation={[Math.PI/2, 0, -Math.PI/4]}>
        <capsuleGeometry args={[0.06, 0.35, 4, 32]}/>
        <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
      </mesh>
      <group name='rulebook-close-button'>
        <mesh>
          <boxGeometry args={[0.6, 0.02, 0.6]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh>
          <boxGeometry args={[0.7, 0.01, 0.7]}/>
          <meshStandardMaterial color={ rulebookCloseButtonHover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh 
          name='rulebook-close-button-wrapper' 
          ref={rulebookCloseButtonWrapper}
          onPointerEnter={handleRulebookCloseButtonPointerEnter}
          onPointerLeave={handleRulebookCloseButtonPointerLeave}
          onClick={handleRulebookCloseButtonPointerClick}
        >
          <boxGeometry args={[0.7, 0.02, 0.7]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
      </group>
    </group>
  }

  function Overview() {
    const TILE_RADIUS = 5
    const scorePositionShift = [-4.5, 0, 1]
    const springs = useSpring({
      from: {
        catchTokenPosition: [
          -Math.cos(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          1.5,
          Math.sin(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
        ],
        catchTokenScale: 1.5,
        piggybackTokenPosition: [-4.1,1,-3.1],
        movingTokenPosition: [-4.3,0,6.5],
        movingTokenScale: 1,
        catchAlertScale: 0,
        catchTokenHomeScale: 0,
        piggybackAlertScale: 0,
        piggybackTokenScale: 1.5,
        welcomeHomeAlertScale: 0,
        scoredIndicator0Scale: 0,
        scoredIndicator1Scale: 0,
      },
      to: [
        {
          movingTokenPosition: [
            -Math.cos(((5) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            2.5,
            Math.sin(((5) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          movingTokenScale: 1.4,
        },
        {
          movingTokenPosition: [
            -Math.cos(((6) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((6) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((7) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((7) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((8) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((8) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((9) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((9) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((10) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((10) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((11) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((11) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((12) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          catchAlertScale: 0.7,
        },
        {
          catchTokenPosition: [4.5, 0, 5.5],
          catchTokenScale: 0,
          delay: 500
        },
        {
          catchTokenHomeScale: 1,
        },
        {
          movingTokenPosition: [
            -Math.cos(((13) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((13) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          catchAlertScale: 0
        },
        {
          movingTokenPosition: [
            -Math.cos(((14) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((14) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((15) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((15) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((16) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((16) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((17) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((17) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackAlertScale: 0.7
        },
        {
          movingTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((18) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenScale: 1.4,
          delay: 500
        },
        {
          movingTokenPosition: [
            -Math.cos(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((19) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackAlertScale: 0
        },
        {
          movingTokenPosition: [
            -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((20) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((21) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((22) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((23) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((24) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS,
          ],
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5,
            1.5,
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5,
          ],
          welcomeHomeAlertScale: 1
        },
        {
          movingTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 0.5 + scorePositionShift[0],
            1.5 + scorePositionShift[1],
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 + scorePositionShift[2],
          ],
          piggybackTokenPosition: [
            -Math.cos(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS - 0.5 + scorePositionShift[0],
            1.5 + scorePositionShift[1],
            Math.sin(((25) * (Math.PI * 2)) / 20) * TILE_RADIUS + 1.5 + scorePositionShift[2],
          ],
          movingTokenScale: 0,
          piggybackTokenScale: 0,
          welcomeHomeAlertScale: 0,
          delay: 500
        },
        {
          scoredIndicator0Scale: 0.4,
          scoredIndicator1Scale: 0.4,
        }
      ],
      delay: 1000,
      config: {
        tension: 170,
        friction: 26
      }
    })

    function CatchAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1
      const width = 2
      const starScale = 0.1
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.29,0,0.25]}
        rotation={[-Math.PI/2,0,0]}
        size={0.6}
        height={0.01}>
          CATCH!
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    function PiggybackAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1
      const width = 2.5
      const starScale = 0.1
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.3}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.8,0,0.2]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}>
          PIGGYBACK!
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    function WelcomeHomeAlert({ position, scale }) {
      
      const borderMesh0Ref = useRef();
      const borderMesh1Ref = useRef();
      const borderMesh2Ref = useRef();
      const borderMesh3Ref = useRef();
      const borderMesh4Ref = useRef();
      const borderMesh5Ref = useRef();
      const borderMesh6Ref = useRef();
      const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
      ]

      const height = 1.3
      const width = 2.4
      const starScale = 0.12
      useFrame((state) => {
        const time = state.clock.elapsedTime 
        for (let i = 0; i < borderMeshRefs.length; i++) {      
          if (borderMeshRefs[i].current) {
            borderMeshRefs[i].current.position.x = Math.cos(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
            borderMeshRefs[i].current.position.y = 0.05
            borderMeshRefs[i].current.position.z = Math.sin(time / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
          }
        }
      })

      return <animated.group position={position} scale={scale}>
        <mesh scale={[width, 0.01, height]}>
          <cylinderGeometry args={[1, 1, 1, 32]}/>
          <meshStandardMaterial color='black' transparent opacity={0.8}/>
        </mesh>
        <Text3D
        name='main-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.45,0,-0.1]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.5}
        height={layout[device].game.whoGoesFirst.title.height}
        lineHeight={0.8}>
          {`WELCOME\n    HOME!`}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <group ref={borderMesh0Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh1Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh2Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh3Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh4Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh5Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
        <group ref={borderMesh6Ref}>
          <Star 
            scale={starScale}
            color='limegreen'
          />
        </group>
      </animated.group>
    }

    return <group>
      <CatchAlert position={[7.5, 1, -5]} scale={springs.catchAlertScale}/>
      <PiggybackAlert position={[-1.5, 1, -5]} scale={springs.piggybackAlertScale}/>
      <WelcomeHomeAlert position={[2.8,1,2]} scale={springs.welcomeHomeAlertScale}/>
      <group name='board' position={[2.8, 0, -0.5]} scale={0.9}>
        <Board constellations={false} showStart/>
        {/* Catch token */}
        <animated.group position={springs.catchTokenPosition} scale={springs.catchTokenScale}>
          <Ufo onBoard/>
        </animated.group>
        {/* Piggyback token */}
        <animated.group scale={springs.piggybackTokenScale} position={springs.piggybackTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
        {/* Moving token */}
        <animated.group scale={springs.movingTokenScale} position={springs.movingTokenPosition}>
          <Rocket onBoard/>
        </animated.group>
      </group>
      <group name='ufo-home' position={[7, 0, 5]}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='turquoise' transparent opacity={0.05}/>
        </mesh>
        <Ufo position={[-0.5,0,-0.4]}/>
        <Ufo position={[0.5,0,-0.4]}/>
        <Ufo position={[-0.5,0,0.4]}/>
        <animated.group scale={springs.catchTokenHomeScale}>
          <Ufo position={[0.5,0,0.4]}/>
        </animated.group>
        {/* Add hologram Ufo */}
      </group>
      <group name='rocket-home' position={[-1.5, 0, 5]}>
        <mesh position={[0, -0.5, -0.2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.01, 32]}/>
          <meshStandardMaterial color='red' transparent opacity={0.1}/>
        </mesh>
        <Rocket position={[-0.6,0,-0.5]}/>
        <Rocket position={[0.4,0,-0.5]}/>
        {/* Moving token */}
        {/* Add hologram Rocket */}
        <animated.group name='scored-indicator-0' position={[-0.5, 0, 0.5]} scale={springs.scoredIndicator0Scale}>
          <Star color='red'/>
        </animated.group>
        <animated.group name='scored-indicator-1' position={[0.5, 0, 0.5]} scale={springs.scoredIndicator1Scale}>
          <Star color='red'/>
        </animated.group>
      </group>
      <group name='yoot-display' position={[4.2, 0, 1.4]}>
        <Text3D 
        name='goal'
        font="fonts/Luckiest Guy_Regular.json"
        position={[1,0,-0.5]}
        rotation={layout[device].game.whoGoesFirst.title.rotation}
        size={0.3}
        height={layout[device].game.whoGoesFirst.title.height}>
          {`YUT\n(DICE)`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <YootDisplay rotation={[0, Math.PI/2, 0]} scale={0.15}/>
      </group>
      <Text3D 
      name='goal'
      font="fonts/Luckiest Guy_Regular.json"
      position={[-2.5, 0, 7.5]}
      rotation={layout[device].game.whoGoesFirst.title.rotation}
      size={0.4}
      height={layout[device].game.whoGoesFirst.title.height}>
        {`TWO TEAMS MOVE THEIR SHIPS FROM START\nTO FINISH. FINISH 4 SHIPS FIRST TO WIN!`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    </group>
  }

  const pages = [<Overview/>, <ThrowTheYutPage/>, <CatchEnemiesPage/>, <PiggybackPage/>, <ScorePage/>, <ReadTheYutPage/>, <ShortcutPage/>]

  return <group position={position} rotation={rotation} scale={scale}>
    {pages[page]}
    { device === 'portrait' && <Pagination 
      position={layout[device].howToPlay.pagination.position}
      scale={layout[device].howToPlay.pagination.scale}
    /> }
    { device === 'landscapeDesktop' && tabOrientation === 'bottom' && <Tabs position={[-2.3, 0, 10]} orientation={tabOrientation} scale={1}/> }
    { device === 'landscapeDesktop' && tabOrientation === 'right' && <Tabs position={[9.2, 0, -2]} orientation={tabOrientation} scale={0.9}/> }
    { closeButton && <CloseButton
      position={layout[device].game.rulebook.closeButton.position} 
      scale={layout[device].game.rulebook.closeButton.scale
    }/> }
  </group>
}